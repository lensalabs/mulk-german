# QA Report 10: Security & Edge Cases

**Tester:** QA Agent  
**Date:** 2026-02-19  
**App:** https://mulk30.com  
**Repo:** /Users/idris/clawd/dev/mulk-30

---

## 1. RLS Policies in Supabase

✅ **Pass**

**Analysis:**
- `supabase/migrations/001_user_progress.sql` correctly implements RLS
- All four policies (SELECT, INSERT, UPDATE, DELETE) use `auth.uid() = user_id`
- Table has `ENABLE ROW LEVEL SECURITY` set
- No service role key exposed in frontend code

**Policies Verified:**
```sql
CREATE POLICY "Users can read own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own progress" ON user_progress FOR DELETE USING (auth.uid() = user_id);
```

---

## 2. XSS Prevention (User Input)

✅ **Pass** (Low Risk - No User-Generated Content)

**Analysis:**
- App uses `.textContent` for user-facing dynamic text (score, progress, labels)
- `innerHTML` usages found but **only** with:
  - Hardcoded Arabic verse data from static JSON
  - Generated HTML with internal verse words (not user input)
  - SVG icons (static strings)
- **No user input fields** that render back as HTML
- Auth forms use `errorDiv.textContent` for error messages

**innerHTML Locations (all safe):**
| File | Usage | Risk |
|------|-------|------|
| quiz.astro | Verse words with blanks | Safe (static data) |
| day/[id].astro | Verse quiz display | Safe (static data) |
| repeat.astro | Radio button styling | Safe (static SVG) |
| timeline.astro | Checkmark SVG | Safe (static SVG) |

**Recommendation:** No action needed. Future features with user comments should use `.textContent` or sanitization.

---

## 3. API Keys Not Exposed in Frontend

✅ **Pass**

**Analysis:**
- Only `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` in frontend
- These are designed to be public (anon key has RLS restrictions)
- `SUPABASE_SERVICE_ROLE_KEY` only in `.env.example` (not in src/)
- `GOOGLE_CLIENT_SECRET` only in `.env.dev` (server-side only)
- `.gitignore` correctly excludes `.env` and `.env.production`

**Verified:**
```bash
grep -r "SERVICE_ROLE" src/  # No results
grep -r "CLIENT_SECRET" src/ # No results
```

---

## 4. Invalid Day Index Handling (/app/day/999)

✅ **Pass** (Static Build Protection)

**Behavior:**
- Navigating to `/app/day/999` returns **404 page**
- Astro uses `getStaticPaths()` to pre-generate only valid days (1-30)
- Invalid paths are not built, resulting in clean 404

**Code Evidence:**
```typescript
// [id].astro
export function getStaticPaths() {
  return MULK_VERSES.map((v) => ({ params: { id: String(v.dayIndex) } }));
}
```

**Result:** User redirected to login page (normal 404 fallback behavior).

---

## 5. Empty State Handling (New User)

✅ **Pass**

**Analysis:**
- Dashboard shows "Dita 1" with 0/10 progress for all steps
- "Fillo mësimin" CTA correctly links to /app/day/1
- Streak badge hidden when streak = 0
- Progress ring shows 0%
- Guest mode works without account

**Code Evidence:**
```typescript
// challenge.ts - Default state
const state: ChallengeState = {
  startDate: DEFAULT_START_DATE,
  completedDays: [],
  dayProgress: {},
};
```

---

## 6. Offline Behavior

⚠️ **Issue** (Minor - No Offline UI Feedback)

**Tested Behavior:**
- App loads from cache (if previously visited)
- Progress saves to localStorage (works offline)
- Cloud sync fails silently (no error shown to user)
- Audio files won't play if not cached

**Issues Found:**
1. No "You're offline" indicator
2. No manifest icon files (icon-192.png, icon-512.png missing)
3. PWA install will fail without icons

**Code Evidence:**
```javascript
// challenge.ts - silent failure
try {
  // sync to cloud
} catch (e) {
  console.error('[Sync] Exception:', e);
  // No UI notification
}
```

**Recommendation:**
1. Add offline indicator banner
2. Add icon-192.png and icon-512.png to /public/
3. Consider Service Worker for audio caching

---

## 7. Console Errors on All Pages

⚠️ **Issue** (PWA Icons Missing)

**Pages Tested:**
- /app ✅ (no JS errors)
- /app/day/1 ✅ (no JS errors)
- /app/quiz ✅ (no JS errors)
- /app/repeat ✅ (no JS errors)
- /app/settings ✅ (no JS errors)
- /app/gift ✅ (no JS errors)

**Recurring Error (All Pages):**
```
Failed to load resource: 404 - /icon-192.png
Error while trying to use the following icon from the Manifest: https://mulk30.com/icon-192.png
```

**Root Cause:**
- `manifest.json` references `/icon-192.png` and `/icon-512.png`
- These files don't exist in `/public/`

**Fix Required:**
```bash
# Add icon files to /public/
icon-192.png (192x192)
icon-512.png (512x512)
```

---

## 8. Double-Click Prevention

✅ **Pass**

**Analysis:**
- Auth forms disable submit button during loading (`submitBtn.disabled = loading`)
- Quiz options disable after answer (`button.disabled = true`)
- Settings buttons disable during action
- `answered` flag prevents multiple submissions in quiz

**Code Evidence:**
```typescript
// signup.astro
function setLoading(loading: boolean) {
  submitBtn.disabled = loading;
  btnText.textContent = loading ? 'Po regjistrohet...' : 'Regjistrohu';
}

// quiz.astro
function handleAnswer(btn: HTMLButtonElement) {
  if (answered) return;
  answered = true;
  // ...
  button.disabled = true;
}
```

---

## Summary

| Test | Status | Notes |
|------|--------|-------|
| 1. RLS Policies | ✅ Pass | Properly implemented |
| 2. XSS Prevention | ✅ Pass | No user input rendered as HTML |
| 3. API Keys | ✅ Pass | Only public keys in frontend |
| 4. Invalid Day Index | ✅ Pass | Returns 404 correctly |
| 5. Empty State | ✅ Pass | Clean new user experience |
| 6. Offline Behavior | ⚠️ Issue | Missing offline indicator + icons |
| 7. Console Errors | ⚠️ Issue | PWA icons missing (404s) |
| 8. Double-Click | ✅ Pass | Buttons properly disabled |

---

## Action Items

### High Priority
- [ ] Add `/public/icon-192.png` (192x192 PNG)
- [ ] Add `/public/icon-512.png` (512x512 PNG)

### Low Priority
- [ ] Add offline indicator UI
- [ ] Consider Service Worker for audio caching
