# QA Report: Audio Playback

**Date:** 2026-02-19  
**Tester:** QA Agent 2  
**App URL:** https://mulk30.com  
**Repo:** /Users/idris/clawd/dev/mulk-30

---

## 1. Audio Files Accessibility

### Curl Test: All 30 Audio Files

| Ayah | Status | HTTP Code | Content-Type | Notes |
|------|--------|-----------|--------------|-------|
| 1-30 | ✅ Pass | 200 | audio/mpeg | All accessible |

**Details:**
```
ayah-1.mp3: 200 (196KB)
ayah-15.mp3: 200 (283KB)
ayah-30.mp3: 200 (344KB)
```

- **Server:** AmazonS3 via CloudFront
- **Caching:** `s-maxage=31536000` (1 year CDN cache)
- **ETag:** Present for cache validation

✅ **Pass: All 30 audio files are accessible with correct MIME type**

---

## 2. Play/Pause Functionality

### Day Page (`/app/day/[id]`)
| Feature | Status | Notes |
|---------|--------|-------|
| Play Button | ✅ Pass | Big play button (14x14) in action bar |
| Pause Button | ✅ Pass | Icon toggles to pause when playing |
| Icon Toggle | ✅ Pass | `play-icon` / `pause-icon` visibility toggled |
| Audio Element | ✅ Pass | Single HTMLAudioElement instance |

**Code Review:**
```javascript
// Lines 847-858 in [id].astro
function startAudio() {
  if (audioPlaying) return stopAudio();
  const audio = initAudio();
  audio.playbackRate = currentSpeed;
  audioPlaying = true;
  // ... icon toggle
  audio.play().catch(() => stopAudio());
}
```

### Repeat Page (`/app/repeat`)
| Feature | Status | Notes |
|---------|--------|-------|
| Play/Pause Toggle | ✅ Pass | Same pattern as day page |
| Playlist Navigation | ✅ Pass | Auto-advances to next ayah on `ended` |

✅ **Pass: Play/Pause works correctly on both pages**

---

## 3. Speed Control

### Available Speeds
| Speed | Status | Notes |
|-------|--------|-------|
| 0.75x | ✅ Pass | Slow speed |
| 1x | ✅ Pass | Default |
| 1.25x | ✅ Pass | Slightly faster |
| 1.5x | ✅ Pass | Fast |
| 2x | ✅ Pass | Double speed |

**Implementation:**
```javascript
// Line 584 in [id].astro
const speeds = [0.75, 1, 1.25, 1.5, 2];

// Speed applies IMMEDIATELY while playing (Lines 885-900)
speedIndex = (speedIndex + 1) % speeds.length;
currentSpeed = speeds[speedIndex];
audioElement.playbackRate = currentSpeed;
```

### Persistence
| Feature | Status | Notes |
|---------|--------|-------|
| Session Persistence | ⚠️ Issue | Speed resets on page reload in day page |
| Settings Integration | ✅ Pass | Repeat page loads from `localStorage` |

**Code Evidence (repeat.astro line 363):**
```javascript
const savedSpeed = parseFloat(localStorage.getItem('mulk30_audio_speed') || '1');
```

⚠️ **Minor Issue: Day page doesn't load saved speed from Settings on init**

✅ **Pass: All 5 speed options work correctly**

---

## 4. Progress Bar Update

### Audio Progress Bar
| Feature | Status | Notes |
|---------|--------|-------|
| Real-time Update | ✅ Pass | `timeupdate` event handler |
| Width Calculation | ✅ Pass | `(currentTime / duration) * 100%` |
| Visual Style | ✅ Pass | Gradient from #005086 to #318fb5 |

**Implementation:**
```javascript
// Line 753 in [id].astro
audioElement.addEventListener('timeupdate', () => {
  const bar = document.getElementById('audio-progress');
  if (bar && audioElement && audioElement.duration) {
    bar.style.width = `${(audioElement.currentTime / audioElement.duration) * 100}%`;
  }
});
```

### Session Progress Bar (Repeat Page)
| Feature | Status | Notes |
|---------|--------|-------|
| Queue Progress | ✅ Pass | Shows progress through playlist |
| Ayah Counter | ✅ Pass | "Ayah X / Y" display |

✅ **Pass: Progress bars update correctly in real-time**

---

## 5. Auto-Replay (Listen Mode)

### Auto-Continue Behavior
| Feature | Status | Notes |
|---------|--------|-------|
| Replay After End | ✅ Pass | Audio restarts automatically |
| Counter Increment | ✅ Pass | `listenCount++` on each completion |
| 10x Completion | ✅ Pass | Moves to "Read" mode after 10 listens |
| Debounce Guard | ✅ Pass | 1500ms debounce prevents double-firing |

**Implementation (Lines 788-816):**
```javascript
audio.addEventListener('ended', handleAudioEnded);

function handleAudioEnded() {
  // Guard against double-firing
  if (isProcessingEnded) return;
  if (now - lastEndedTime < 1500) return;
  
  progress = incrementStep(dayIndex, 'listen');
  
  if (progress.listenCount >= REQUIRED_COUNT) {
    switchMode('read');
  } else {
    // Auto-restart after 2000ms delay
    setTimeout(() => {
      audioElement.currentTime = 0;
      audioElement.play();
    }, 2000);
  }
}
```

### REQUIRED_COUNT
| Constant | Value | Status |
|----------|-------|--------|
| REQUIRED_COUNT | 10 | ✅ Correct |

✅ **Pass: Auto-replay works correctly with proper counter increment**

---

## 6. Audio on Repeat Page (Playlist)

### Playlist Features
| Feature | Status | Notes |
|---------|--------|-------|
| Presets | ✅ Pass | Full Surah, First/Second Half, First/Last 10 |
| Custom Range | ✅ Pass | Dropdown selectors for start/end |
| Queue Building | ✅ Pass | Builds array of ayahs to play |
| Auto-Advance | ✅ Pass | Moves to next ayah on `ended` |
| Session Close | ✅ Pass | Returns to selection screen when complete |

**Preset Options:**
- Surah e plotë (1-30)
- Gjysma e parë (1-15)
- Gjysma e dytë (16-30)
- 10 të parat (1-10)
- 10 të fundit (21-30)

### Duration Loading
| Feature | Status | Notes |
|---------|--------|-------|
| Pre-load Durations | ✅ Pass | `loadAllDurations()` called before play |
| Error Fallback | ✅ Pass | Defaults to 10s on load error |

```javascript
temp.addEventListener('error', () => {
  audioDurations.set(ayah, 10); // Fallback duration
  resolve();
});
```

✅ **Pass: Playlist functionality works correctly**

---

## 7. Error Handling (Missing Audio)

### Error Handlers Present
| Location | Handler | Status |
|----------|---------|--------|
| Day Page Audio | `error` event | ✅ Pass |
| Day Page Play | `.catch()` | ✅ Pass |
| Repeat Page Load | `error` event | ✅ Pass |
| Timestamps Load | `.catch()` | ✅ Pass |

**Day Page Error Handling:**
```javascript
// Line 755-758
audioElement.addEventListener('error', (e) => {
  console.error('Audio load failed:', e);
  audioPlaying = false;
  updatePlayPauseIcon();
});

// Line 855
audio.play().catch(() => stopAudio());
```

**Repeat Page Error Handling:**
```javascript
// Line 545
temp.addEventListener('error', () => {
  audioDurations.set(ayah, 10); // Graceful fallback
  resolve();
});
```

### 404 Test
| Test | Result | Notes |
|------|--------|-------|
| ayah-31.mp3 | 404 | Non-existent file correctly returns 404 |

✅ **Pass: Error handling is implemented for missing audio**

---

## 8. Additional Features Tested

### Word Highlighting (Karaoke)
| Feature | Status | Notes |
|---------|--------|-------|
| Timestamps JSON | ✅ Pass | `/timestamps.json` available |
| Precise Sync | ✅ Pass | Uses word-level timestamps when count matches |
| Fallback | ✅ Pass | Distributes evenly if timestamps missing |

### Word-by-Word Translation
| Feature | Status | Notes |
|---------|--------|-------|
| Tap Word | ✅ Pass | Shows Albanian translation tooltip |
| Data Source | ✅ Pass | Uses `word-by-word.json` |

### Translation Toggle
| Feature | Status | Notes |
|---------|--------|-------|
| Inline Toggle | ✅ Pass | Switches between transliteration and translation |

---

## Summary

| Category | Status | Notes |
|----------|--------|-------|
| 1. Audio Files (30x) | ✅ Pass | All accessible via CDN |
| 2. Play/Pause | ✅ Pass | Works on both pages |
| 3. Speed Control | ✅ Pass | All 5 speeds work |
| 4. Progress Bar | ✅ Pass | Real-time updates |
| 5. Auto-Replay | ✅ Pass | 10x listen then advance |
| 6. Repeat Page Playlist | ✅ Pass | Full functionality |
| 7. Error Handling | ✅ Pass | Graceful degradation |

### Issues Found

| Issue | Severity | Description |
|-------|----------|-------------|
| Speed not loaded on day page | ⚠️ Low | Day page doesn't read saved speed from Settings on init (repeat page does) |

### Recommendations

1. **Speed Persistence:** Add to day page init:
   ```javascript
   const savedSpeed = parseFloat(localStorage.getItem('mulk30_audio_speed') || '1');
   if (speeds.includes(savedSpeed)) {
     currentSpeed = savedSpeed;
     speedIndex = speeds.indexOf(savedSpeed);
     document.getElementById('speed-label').textContent = `${currentSpeed}x`;
   }
   ```

---

**Overall Result: ✅ PASS**

All critical audio functionality works correctly. One minor UX improvement recommended for speed persistence.
