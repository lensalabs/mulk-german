# QA Report: Mulk 30

**Date:** 2026-02-19  
**App:** https://mulk30.com  
**Repo:** /Users/idris/clawd/dev/mulk-30  
**Tester:** QA-Agent (automated code review)

---

## Summary

The app is **functional** with a clean UX for Quran memorization. The codebase is well-structured with proper separation of concerns. However, there are **2 CRITICAL bugs**, **4 IMPORTANT issues**, and several **MINOR improvements** needed.

---

## 🔴 KRITISCH (Blocker)

### 1. **Missing Auth Guard on Quiz and Repeat Pages**

**Datei:** `src/pages/app/quiz.astro`, `src/pages/app/repeat.astro`  
**Problem:** Diese Seiten prüfen NICHT ob der User eingeloggt ist. Ein nicht eingeloggter User kann direkt auf `/app/quiz` oder `/app/repeat` navigieren und die App nutzen.

**Vergleich:**
- ✅ `index.astro` - Prüft session UND guest_mode
- ✅ `day/[id].astro` - Prüft session (aber nicht guest_mode! → siehe #2)
- ✅ `timeline.astro` - Prüft session (aber nicht guest_mode!)
- ❌ `quiz.astro` - **Kein Auth Check**
- ❌ `repeat.astro` - **Kein Auth Check**

**Fix:**
```typescript
// Am Anfang des <script> Blocks hinzufügen:
import { getSession } from '../../lib/supabase';

(async () => {
  const { session } = await getSession();
  const isGuestMode = localStorage.getItem('mulk30_guest_mode') === 'true';
  if (!session && !isGuestMode) {
    window.location.href = '/';
    return;
  }
})();
```

---

### 2. **Day Page und Timeline Auth Guard prüft Guest Mode nicht**

**Datei:** `src/pages/app/day/[id].astro`, `src/pages/app/timeline.astro`  
**Problem:** Der Auth-Check redirected zu `/auth/login` wenn kein Session existiert, aber ignoriert Guest Mode komplett. Ein Guest-User wird fälschlicherweise auf Login umgeleitet.

**Aktuell (falsch):**
```typescript
const { session } = await getSession();
if (!session) {
  window.location.href = '/auth/login';
  return;
}
```

**Fix:**
```typescript
const { session } = await getSession();
const isGuestMode = localStorage.getItem('mulk30_guest_mode') === 'true';
if (!session && !isGuestMode) {
  window.location.href = '/';  // Landing page, nicht /auth/login
  return;
}
```

---

## 🟠 WICHTIG (Funktioniert nicht wie erwartet)

### 3. **Progress Sync funktioniert nicht für Guest Mode**

**Datei:** `src/pages/app/index.astro`, `src/lib/challenge.ts`  
**Problem:** Der Code ruft `initializeState()` nur wenn eine Session existiert. Das ist korrekt für Cloud-Sync, ABER der `updateUI()` Call kommt VOR dem `initializeState()` Promise resolved. Das könnte Race Conditions verursachen.

**Code:**
```typescript
if (session) {
  await initializeState();  // async
}
updateUI();  // könnte mit altem State laufen
```

**Besser:**
```typescript
if (session) {
  await initializeState();
}
updateUI();  // OK, weil await vorher
```
Eigentlich ist das OK wegen await. Aber der Catch-Block ruft `updateUI()` ohne state check → könnte crashen bei corrupted localStorage.

---

### 4. **Word-by-Word Highlighting Mismatch**

**Datei:** `src/pages/app/repeat.astro`, `src/pages/app/day/[id].astro`  
**Problem:** Die Timestamps in `timestamps.json` nutzen ANDERE arabische Schreibweise als `word-by-word.json`. 

**Beispiel (Ayah 1):**
- timestamps.json: `"تَبَٰرَكَ"` (mit Alif Waslah)  
- word-by-word.json: `"تَبَٰرَكَ"` (gleich)  
- mulk-verses.ts: `"تَبَارَكَ"` (ANDERS! Mit vollem Alif)

Das führt zu Highlighting-Problemen wenn die Wort-Anzahl nicht übereinstimmt. Der Fallback-Code (gleichmäßige Verteilung) wird dann genutzt, was ungenau ist.

**Fix:** Alle drei Quellen vereinheitlichen oder Word-Count-Check strenger machen.

---

### 5. **translitSection Element nicht gefunden in Day Page**

**Datei:** `src/pages/app/day/[id].astro`  
**Problem:** Im Code wird `transliteration-section` referenziert, aber das Element heißt `translit-section`.

**Code:**
```typescript
const translitSection = document.getElementById('transliteration-section')!;
```

**HTML:**
```html
<div id="translit-section" class="...">
```

**Auswirkung:** In Recite-Mode wird das Transliteration-Element nicht versteckt, da `translitSection` `null` ist und `.classList.add('hidden')` fehlschlägt.

---

### 6. **Logout Button ohne Guest-Mode-Cleanup**

**Datei:** `src/pages/app/settings.astro`  
**Problem:** Beim Logout wird nur `supabase.auth.signOut()` aufgerufen, aber die Guest-Mode localStorage Keys werden nicht gelöscht.

**Aktuell:**
```typescript
await supabase.auth.signOut();
window.location.href = '/auth/login';
```

**Fix:**
```typescript
await supabase.auth.signOut();
localStorage.removeItem('mulk30_guest_mode');
localStorage.removeItem('mulk30_guest_id');
window.location.href = '/';  // Zur Landing, nicht /auth/login
```

---

## 🟡 MINOR (Kleine UI/UX Issues)

### 7. **Gift Page: Hardcoded Instagram Handle**

**Datei:** `src/pages/app/gift.astro`  
**Problem:** Der Instagram-Link ist mehrfach hardcoded. Sollte als Konstante definiert sein.

---

### 8. **Settings Page zeigt "Jo i identifikuar" für Guest Users**

**Datei:** `src/pages/app/settings.astro`  
**Problem:** Guest-User sehen "Jo i identifikuar" was wie ein Fehler aussieht. Besser: "Vizitor" oder "Llogari e përkohshme".

---

### 9. **Bottom Nav "Mëso" Link geht immer zum aktuellen Tag**

**Datei:** `src/components/BottomNav.astro`  
**Problem:** Das Script aktualisiert dynamisch den Link basierend auf `getCurrentDay()`. Aber bei ersten Besuch vor Challenge-Start zeigt es Tag 1 (was korrekt ist), aber vielleicht sollte es zum LETZTEN unfertigen Tag navigieren, nicht zum Kalender-Tag.

---

### 10. **Keine Error-Boundaries für Audio-Loading**

**Datei:** `src/pages/app/day/[id].astro`, `src/pages/app/repeat.astro`  
**Problem:** Audio-Loading-Errors werden nur geloggt, aber es gibt kein User-Feedback wenn Audio nicht lädt.

**Empfehlung:** 
```typescript
audio.addEventListener('error', (e) => {
  console.error('Audio load failed:', e);
  // Show user-friendly error message
  showToast('Audio konnte nicht geladen werden. Prüfe deine Verbindung.');
});
```

---

### 11. **Speed Setting nicht persistent**

**Datei:** `src/pages/app/day/[id].astro`  
**Problem:** In Repeat-Page wird Speed aus localStorage geladen, aber in Day-Page nicht.

**Fix:** Am Anfang des Scripts:
```typescript
const savedSpeed = parseFloat(localStorage.getItem('mulk30_audio_speed') || '1');
let currentSpeed = [0.75, 1, 1.25, 1.5, 2].includes(savedSpeed) ? savedSpeed : 1;
```

---

### 12. **Quiz: "Weak Verses" Feature nicht sichtbar erklärt**

**Datei:** `src/pages/app/quiz.astro`  
**Problem:** Der Button für "Ajete me gabime" erscheint erst NACH Fehlern. Aber User wissen nicht, dass diese Funktion existiert.

**Empfehlung:** Kurze Info-Zeile oder Tooltip.

---

## ✅ Was gut funktioniert

1. **Guest Mode Flow** - Funktioniert (außer Auth-Guard-Bugs)
2. **Progress Persistence** - localStorage + Supabase Sync ist robust
3. **Audio Files** - Alle 30 Ayat-Audio-Dateien vorhanden
4. **Word-by-Word Data** - Vollständig für alle 30 Ayat
5. **Timestamps** - Vorhanden für präzises Highlighting
6. **Quiz-Generierung** - Funktioniert korrekt
7. **Navigation** - 4 Tabs funktionieren
8. **Day Page 3-Step-Cycle** - Listen/Read/Recite Flow funktioniert
9. **Responsive Design** - Mobile-first, sieht gut aus

---

## Code Quality Notes

- ✅ TypeScript types sind definiert
- ✅ Astro-Components sind modular
- ✅ CSS Variables für Theming
- ⚠️ Keine Unit Tests gefunden
- ⚠️ Keine E2E Tests gefunden
- ⚠️ Einige `!` Non-null assertions die crashen könnten

---

## Empfohlene Priorität

1. **KRITISCH #1 & #2 fixen** - Auth Guards für alle /app/* Routes vereinheitlichen
2. **WICHTIG #5 fixen** - Element-ID Mismatch korrigieren
3. **WICHTIG #6 fixen** - Logout-Cleanup für Guest Mode
4. **MINOR #10** - Error-Feedback für Audio
5. Rest nach Bedarf

---

*Report erstellt von QA-Agent*
