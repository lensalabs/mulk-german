# QA Report: Code Audit - mulk-30

**Datum:** 2026-02-18  
**Agent:** QA Agent 1 - CODE AUDIT  
**Scope:** Alle Dateien in `/src/`

---

## Zusammenfassung

| Severity | Anzahl |
|----------|--------|
| 🔴 CRITICAL | 2 |
| 🟠 HIGH | 5 |
| 🟡 MEDIUM | 6 |
| 🟢 LOW | 8 |

---

## 🔴 CRITICAL BUGS

### CRITICAL-001: `supabase.auth.signOut()` auf Fake-Objekt aufgerufen

**Datei:** `src/pages/app/settings.astro`, Zeile ~232  
**Problem:** Die Datei ruft `supabase.auth.signOut()` auf, aber `supabase` in `src/lib/supabase.ts` ist ein Dummy-Objekt ohne `auth`-Property.

```javascript
// In settings.astro:
await supabase.auth.signOut();  // ❌ Wirft: Cannot read property 'signOut' of undefined
```

**Impact:** Logout-Button funktioniert nicht, wirft JavaScript-Error.

**Fix:**
```typescript
// src/lib/supabase.ts - ergänze auth property:
export const supabase = {
  auth: {
    signOut: async () => signOut(),
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ error: null }),
    insert: () => Promise.resolve({ error: null }),
  }),
};
```

---

### CRITICAL-002: Timestamps vs Word-by-Word Mismatch (15 Verse betroffen!)

**Dateien:** 
- `public/timestamps.json`
- `src/data/word-by-word.json`

**Problem:** Für 15 von 30 Versen stimmt die Wort-Anzahl NICHT überein. Das Word-Highlighting ist bei diesen Versen ungenau:

| Vers | Timestamps | Word-by-Word | Diff |
|------|------------|--------------|------|
| 2 | 10 | 11 | ❌ -1 |
| 5 | 13 | 12 | ❌ +1 |
| 7 | 7 | 8 | ❌ -1 |
| 9 | 20 | 18 | ❌ +2 |
| 11 | 7 | 5 | ❌ +2 |
| 15 | 13 | 14 | ❌ -1 |
| 16 | 10 | 11 | ❌ -1 |
| 17 | 11 | 12 | ❌ -1 |
| 19 | 16 | 15 | ❌ +1 |
| 20 | 18 | 15 | ❌ +3 |
| 21 | 11 | 12 | ❌ -1 |
| 22 | 9 | 12 | ❌ -3 |
| 23 | 11 | 12 | ❌ -1 |
| 27 | 14 | 13 | ❌ +1 |
| 30 | 12 | 10 | ❌ +2 |

**Impact:** Word-by-word Highlighting funktioniert bei 50% der Verse nicht korrekt. Der Code fällt auf ein unpräzises Fallback zurück.

**Aktuelle Logik (day/[id].astro, Zeile ~570-590):**
```javascript
const canUseTimestamps = timestampsReady && 
                         wordTimestamps.length > 0 && 
                         wordTimestamps.length === wordCount;

if (canUseTimestamps) {
  // Precise timestamps
} else {
  // Fallback: distribute words evenly (UNGENAU!)
}
```

**Fix:** Timestamps.json oder word-by-word.json müssen synchronisiert werden. Die Wort-Tokenisierung muss einheitlich sein.

---

## 🟠 HIGH ISSUES

### HIGH-001: Race Condition bei Audio Auto-Play

**Datei:** `src/pages/app/day/[id].astro`, Zeile ~505-530

**Problem:** `isProcessingEnded` Guard kann bei schnellem Doppel-Tap umgangen werden, wenn `ended` Event mehrfach feuert.

```javascript
audio.addEventListener('ended', handleAudioEnded);

function handleAudioEnded() {
  if (isProcessingEnded) return;
  isProcessingEnded = true;
  // ...
  setTimeout(() => {
    isProcessingEnded = false;  // Reset passiert während audio noch läuft
    if (audioPlaying && audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();  // Kann doppelt feuern
    }
  }, 300);
}
```

**Fix:** `removeEventListener` nach ended, dann neu hinzufügen:
```javascript
audio.addEventListener('ended', handleAudioEnded, { once: true });
```

---

### HIGH-002: localStorage ohne Error Handling

**Datei:** `src/lib/challenge.ts`, Zeile ~22-38

**Problem:** Keine try-catch um `JSON.parse()` - korrupte Daten crashen die App.

```javascript
export function getState(): ChallengeState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { /* ... */ }
  const parsed = JSON.parse(raw);  // ❌ Kann crashen bei korrupten Daten
}
```

**Fix:**
```javascript
try {
  const parsed = JSON.parse(raw);
  if (!parsed.dayProgress) parsed.dayProgress = {};
  return parsed;
} catch (e) {
  console.error('Corrupted state, resetting:', e);
  const state = { startDate: DEFAULT_START_DATE, completedDays: [], dayProgress: {} };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}
```

---

### HIGH-003: Incubator Supabase Dummy signOut() async/redirect-Timing

**Datei:** `src/lib/supabase.ts`, Zeile ~71-77

**Problem:** `signInAsGuest()` macht `window.location.href = '/app'` synchron nach async Operation - könnte zu Race Conditions führen.

```javascript
export const signInAsGuest = async () => {
  const user = { /* ... */ };
  setStoredUser(user);
  window.location.href = '/app';  // ❌ Kein await, kann vor localStorage passieren
};
```

**Fix:**
```javascript
export const signInAsGuest = async () => {
  const user = { /* ... */ };
  setStoredUser(user);
  // Warte minimal auf localStorage
  await new Promise(resolve => setTimeout(resolve, 10));
  window.location.href = '/app';
};
```

---

### HIGH-004: repeat.astro - Translation Toggle Scope-Problem

**Datei:** `src/pages/app/repeat.astro`, Zeile ~650+

**Problem:** `showingTranslation` Variable wird nicht bei jedem neuen Ayah zurückgesetzt. Wenn User Translation aktiviert hat und nächstes Ayah beginnt, bleibt UI-State inkonsistent.

**Code (Zeile ~380):**
```javascript
function playCurrentInQueue() {
  // showingTranslation wird NICHT hier zurückgesetzt!
  // ... aber UI-Elemente werden neu gerendert
}
```

Der Code SETZT es zwar zurück (Zeile ~396-398), aber der Check passiert VOR dem DOM-Update. Das kann zu Flackern führen.

**Fix:** Translation-State NACH DOM-Manipulation zurücksetzen oder besser strukturieren.

---

### HIGH-005: Audio Dateien könnten fehlen

**Datei:** `src/pages/app/day/[id].astro`

**Problem:** Keine Fehlerbehandlung wenn Audio-Datei nicht existiert.

```javascript
audioElement = new Audio(`/audio/ayah-${dayIndex}.mp3`);
// Kein error handler!
```

**Fix:**
```javascript
audioElement = new Audio(`/audio/ayah-${dayIndex}.mp3`);
audioElement.addEventListener('error', (e) => {
  console.error('Audio load failed:', e);
  // UI: "Audio nicht verfügbar"
});
```

---

## 🟡 MEDIUM ISSUES

### MEDIUM-001: Type Error - `window.__dayIndex` Casting

**Datei:** `src/pages/app/day/[id].astro`, Zeile ~335+

**Problem:** `(window as any).__dayIndex` ist ein TypeScript Anti-Pattern.

**Fix:** Typisierte Custom Window:
```typescript
declare global {
  interface Window { __dayIndex: number; }
}
```

---

### MEDIUM-002: mulk-verses.ts Arabic Text Unterschiede

**Datei:** `src/data/mulk-verses.ts` vs `src/data/word-by-word.json`

**Problem:** Der Arabic-Text in `mulk-verses.ts` verwendet andere Zeichen als `word-by-word.json` (unterschiedliche Unicode-Normalisierung).

Beispiel Vers 1:
- `mulk-verses.ts`: `تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ`
- `word-by-word.json`: `تَبَٰرَكَ` `ٱلَّذِى` `بِيَدِهِ` `ٱلْمُلْكُ`

**Impact:** Word-Matching zwischen Quellen funktioniert nicht 1:1.

---

### MEDIUM-003: Memory Leak - Audio Element wird nie disposed

**Datei:** `src/pages/app/day/[id].astro`

**Problem:** `audioElement` wird nie auf `null` gesetzt oder `src` geleert bei Page-Navigation.

**Fix:** Astro `beforeLeave` oder `unload` listener:
```javascript
window.addEventListener('beforeunload', () => {
  if (audioElement) {
    audioElement.pause();
    audioElement.src = '';
    audioElement = null;
  }
});
```

---

### MEDIUM-004: Quiz unendliche Schleife Risiko

**Datei:** `src/pages/app/quiz.astro`, Zeile ~340-350

**Problem:** Die While-Schleife für Option-Generierung hat zwar einen `attempts` Guard (gut!), aber der Guard fehlt in `day/[id].astro` Quiz:

```javascript
// day/[id].astro - Zeile ~620:
while (options.length < 4 && options.length < verseWords.length) {
  const w = verseWords[Math.floor(Math.random() * verseWords.length)];
  if (!options.includes(w)) options.push(w);
}
// ❌ Kein attempts-Guard!
```

**Impact:** Wenn ein Vers weniger als 4 unique Wörter hat UND Duplikate entstehen, Endlosschleife.

---

### MEDIUM-005: Fehlende Input Sanitization

**Datei:** `src/pages/auth/email.astro`

**Problem:** Email/Password werden direkt an `signIn()` übergeben ohne Trim:
```javascript
const email = formData.get('email') as string;
// Kein .trim()!
```

**Fix:**
```javascript
const email = (formData.get('email') as string).trim().toLowerCase();
const password = formData.get('password') as string;
```

---

### MEDIUM-006: Settings Speed Dropdown beschränkt

**Datei:** `src/pages/app/settings.astro`

**Problem:** Settings bietet nur 0.75x, 1x, 1.25x - aber Day-Page und Repeat-Page unterstützen auch 1.5x und 2x:

```html
<!-- settings.astro -->
<option value="0.75">0.75×</option>
<option value="1" selected>1×</option>
<option value="1.25">1.25×</option>
<!-- Fehlt: 1.5x und 2x -->
```

**Impact:** User können 1.5x/2x nur auf Day-Page setzen, aber nicht dauerhaft speichern.

---

## 🟢 LOW ISSUES

### LOW-001: Hardcoded Default Start Date

**Datei:** `src/lib/challenge.ts`, Zeile ~14

```javascript
const DEFAULT_START_DATE = '2026-02-19';
```

**Empfehlung:** In Config-Datei auslagern für leichtere Anpassung.

---

### LOW-002: Inkonsistente Tooltip-Positionierung

**Datei:** `src/pages/app/day/[id].astro`

Der Word-Tooltip kann bei RTL-Text am Rand abgeschnitten werden. Die `minLeft`/`maxLeft` Berechnung ist zwar vorhanden, aber `60px` ist zu klein für lange albanische Übersetzungen.

---

### LOW-003: Keine Loading-States für Timestamps

**Datei:** `src/pages/app/day/[id].astro`

```javascript
fetch('/timestamps.json').then(r => r.json()).then(data => { ... });
```

Kein Loading-Indikator während Timestamps laden. Bei langsamer Verbindung: Highlighting startet verzögert.

---

### LOW-004: CSS Animation Performance

**Datei:** `src/pages/app/day/[id].astro`

```css
.heartbeat { animation: heartbeat 1.2s ease-in-out 3; }
```

Die `heartbeat` Animation ist auf Homepage, nicht Day-Page. Unnötiger CSS in Day-Page bundle.

---

### LOW-005: Fehlende aria-labels

**Dateien:** Mehrere

Viele interaktive Elemente haben keine `aria-label` Attribute für Screen-Reader.

---

### LOW-006: console.log in Production

**Datei:** `src/pages/app/day/[id].astro`, Zeile ~434

```javascript
console.log(`[Day ${dayIndex}] Loaded ${wordTimestamps.length} timestamps`);
```

**Empfehlung:** Nur in Development loggen.

---

### LOW-007: Doppelte BottomNav in repeat.astro Player

**Datei:** `src/pages/app/repeat.astro`

Im Player-Overlay wird eine separate BottomNav inline definiert statt die Component zu nutzen. Code-Duplikation.

---

### LOW-008: Word-by-Word JSON Escape Issues

**Datei:** `src/data/word-by-word.json`

Einige Verse haben escaped Quotes in albanischen Übersetzungen:
```json
"albanian": "\"\"\"Kjo (është)\""
```

Sollte normales JSON-Escaping sein: `"\"Kjo (është)\""`

---

## Daten-Konsistenz Check

### ✅ mulk-verses.ts
- 30 Verse vorhanden: ✅
- Alle dayIndex 1-30 vorhanden: ✅
- Alle haben arabic, albanian, transliteration: ✅

### ⚠️ word-by-word.json
- 30 Verse vorhanden: ✅
- Wort-Anzahl konsistent: ❌ (siehe CRITICAL-002)
- Escaped Quotes: ⚠️ (siehe LOW-008)

### ⚠️ timestamps.json
- 30 Verse vorhanden: ✅
- Wort-Anzahl konsistent mit word-by-word: ❌ (15 Verse Mismatch)

### ✅ Audio Files
- `/public/audio/ayah-1.mp3` bis `ayah-30.mp3`: ✅ vorhanden

---

## Empfohlene Prioritäten

1. **SOFORT:** CRITICAL-001 fixen (Logout broken)
2. **SOFORT:** HIGH-002 fixen (localStorage crash prevention)
3. **VOR LAUNCH:** CRITICAL-002 - Timestamps synchronisieren
4. **VOR LAUNCH:** HIGH-001 - Audio Race Condition
5. **SPÄTER:** Medium/Low Issues

---

*QA Agent 1 - Code Audit abgeschlossen*
