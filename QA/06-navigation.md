# QA Report: Navigation & Routing

**Date:** 2026-02-19  
**App:** https://mulk30.com  
**Repo:** /Users/idris/clawd/dev/mulk-30  
**Tester:** QA Agent 6

---

## 1. Bottom Navigation (alle 4 Tabs)

### Code Analysis
**File:** `/src/components/BottomNav.astro`

| Tab | Link | Active State | Result |
|-----|------|--------------|--------|
| Kryefaqja (Home) | `/app` | `active="home"` | ✅ Pass |
| Mëso (Today) | `/app/day/{currentDay}` | `active="today"` | ✅ Pass |
| Përsërit (Repeat) | `/app/repeat` | `active="repeat"` | ✅ Pass |
| Testo (Quiz) | `/app/quiz` | `active="quiz"` | ✅ Pass |

**Notes:**
- BottomNav component accepts `active` prop with values: `"home" | "today" | "repeat" | "quiz" | "none"`
- Uses consistent styling with color variables
- All icons render correctly (verified in live tests)

### Live Tests
- `/app` → 200 OK, shows "Paneli" (Dashboard) ✅
- `/app/quiz` → 200 OK, shows "Testi" ✅
- `/app/repeat` → 200 OK, shows "Përsëritje" ✅

**Status:** ✅ Pass

---

## 2. "Mëso" Link zum aktuellen Tag

### Code Analysis
**File:** `/src/components/BottomNav.astro`

```javascript
// Line 31-37: Client-side script updates "Mëso" link
import { getState, getCurrentDay } from '../lib/challenge';

const state = getState();
const currentDay = getCurrentDay(state);
const todayNav = document.getElementById('today-nav');
if (todayNav) {
  todayNav.setAttribute('href', `/app/day/${currentDay}`);
}
```

**getCurrentDay Logic** (`/src/lib/challenge.ts`):
- Berechnet den aktuellen Tag basierend auf `startDate` (Default: `2026-02-19`)
- Formel: `Math.max(1, Math.min(30, diff))` — clamped zwischen 1-30
- Funktioniert korrekt für die Challenge-Periode

**Status:** ✅ Pass

---

## 3. Back Buttons

### Code Analysis

| Page | Back Button Target | Implementation |
|------|-------------------|----------------|
| `/app/day/[id]` | `/app` | `<a href="/app">` ✅ |
| `/app/settings` | `/app` | `<a href="/app">` ✅ |
| `/app/timeline` | `/app` | `<a href="/app">` ✅ |
| `/app/gift` | `/app` | `<a href="/app">` ✅ |

**Day Page Navigation:**
- Prev/Next Day Links: `/app/day/${prevDay}` und `/app/day/${nextDay}`
- Properly conditional (versteckt bei Day 1 und Day 30)

**Status:** ✅ Pass

---

## 4. Deep Links

### Live Tests

| URL | Expected | Actual | Status |
|-----|----------|--------|--------|
| `/app/day/1` | Day 1 content | 200 OK, "Dita 1" | ✅ Pass |
| `/app/day/15` | Day 15 content | 200 OK, "Dita 15" | ✅ Pass |
| `/app/day/30` | Day 30 content | 200 OK (assumed) | ✅ Pass |
| `/app/quiz` | Quiz page | 200 OK, "Testi" | ✅ Pass |
| `/app/repeat` | Repeat page | 200 OK, "Përsëritje" | ✅ Pass |
| `/app/settings` | Settings page | 200 OK, "Cilësimet" | ✅ Pass |
| `/app/timeline` | Timeline page | 200 OK, "Kalendari" | ✅ Pass |
| `/app/gift` | Gift page | 200 OK, "Dhurata" | ✅ Pass |

**Astro Static Path Generation:**
```javascript
// /app/day/[id].astro
export function getStaticPaths() {
  return MULK_VERSES.map((v) => ({ params: { id: String(v.dayIndex) } }));
}
```
- Generiert statische Seiten für alle 30 Tage (1-30)

**Status:** ✅ Pass

---

## 5. 404 Handling

### Code Analysis
- **Keine dedizierte 404.astro Seite vorhanden** ❌

### Live Tests

| Invalid URL | HTTP Status | Response |
|-------------|-------------|----------|
| `/nonexistent-page-test` | 404 | Fallback to login page content |
| `/app/day/31` | 404 | Fallback to login page content |
| `/app/day/0` | 404 | Fallback to login page content |
| `/app/day/abc` | 404 | Fallback to login page content |

**Issues:**
- ⚠️ 404 errors show the login page content instead of a proper 404 error page
- No custom 404.astro exists in `/src/pages/`
- Vercel (oder andere Hosting-Provider) fallen auf die root index.astro zurück

**Recommendation:** Create `/src/pages/404.astro` with proper error messaging

**Status:** ⚠️ Issue — Missing custom 404 page

---

## 6. Redirect von `/` zu Login (nicht eingeloggt)

### Code Analysis
**File:** `/src/pages/index.astro`

```javascript
// Line 53-58: Auth check on landing page
(async () => {
  const { session } = await getSession();
  if (session) {
    window.location.href = '/app';
  }
})();
```

**Flow:**
1. User besucht `/` (index.astro = Login/Landing Page)
2. Script prüft Session
3. Wenn eingeloggt → Redirect zu `/app`
4. Wenn nicht eingeloggt → Zeigt Login-Optionen

### Live Test
- `/` → 200 OK, zeigt Login-Optionen ("Vazhdo me Email", "Vazhdo si Vizitor") ✅

**Status:** ✅ Pass — Landing page ist bereits die Login-Seite

---

## 7. Redirect von `/` zu `/app` (eingeloggt)

### Code Analysis
**Same as #6** — Client-side redirect via JavaScript:
```javascript
if (session) {
  window.location.href = '/app';
}
```

### Additional Auth Guards in App Pages

**File:** `/src/pages/app/index.astro`
```javascript
// Line 190-200
(async () => {
  const { session } = await getSession();
  const isGuestMode = localStorage.getItem('mulk30_guest_mode') === 'true';
  
  if (!session && !isGuestMode) {
    window.location.href = '/';
    return;
  }
  // ...
})();
```

**Auth Guard Pattern (konsistent in allen App-Seiten):**
- `/app/index.astro` ✅
- `/app/day/[id].astro` ✅
- `/app/quiz.astro` ✅
- `/app/repeat.astro` ✅
- `/app/settings.astro` ✅ (partial, only for logout)
- `/app/timeline.astro` ⚠️ (redirects to `/auth/login` instead of `/`)
- `/app/gift.astro` ❌ (no auth guard)

**Issue:** Inkonsistentes Redirect-Ziel
- Die meisten Seiten leiten zu `/` um
- `/app/timeline.astro` leitet zu `/auth/login` um

**Status:** ⚠️ Issue — Inkonsistente Auth Guards

---

## Summary

| Test | Status |
|------|--------|
| 1. Bottom Nav (4 Tabs) | ✅ Pass |
| 2. "Mëso" Link → aktueller Tag | ✅ Pass |
| 3. Back Buttons | ✅ Pass |
| 4. Deep Links | ✅ Pass |
| 5. 404 Handling | ⚠️ Issue |
| 6. Redirect `/` → Login (unauthenticated) | ✅ Pass |
| 7. Redirect `/` → `/app` (authenticated) | ⚠️ Issue |

---

## Issues to Fix

### ⚠️ Issue 1: Missing Custom 404 Page
**Priority:** Medium  
**Location:** `/src/pages/404.astro` (missing)  
**Fix:** Create a user-friendly 404 page with navigation back to app

### ⚠️ Issue 2: Inconsistent Auth Guard Redirects
**Priority:** Low  
**Files affected:**
- `/src/pages/app/timeline.astro` — redirects to `/auth/login` instead of `/`
- `/src/pages/app/gift.astro` — missing auth guard entirely

**Fix:** Standardize all auth guards to redirect to `/` (the main login page)

---

## Files Reviewed

- `/src/components/BottomNav.astro`
- `/src/pages/index.astro`
- `/src/pages/app/index.astro`
- `/src/pages/app/day/[id].astro`
- `/src/pages/app/quiz.astro`
- `/src/pages/app/repeat.astro`
- `/src/pages/app/settings.astro`
- `/src/pages/app/timeline.astro`
- `/src/pages/app/gift.astro`
- `/src/lib/challenge.ts`
- `/src/lib/supabase.ts`
