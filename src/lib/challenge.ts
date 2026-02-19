// Challenge state management with Supabase sync
// localStorage as cache, Supabase as source of truth

import { supabase } from './supabase';

export interface DayProgress {
  listenCount: number;
  readCount: number;
  reciteCount: number;
}

export interface ChallengeState {
  startDate: string;
  completedDays: number[];
  dayProgress: Record<number, DayProgress>;
}

const STORAGE_KEY = 'mulk30_challenge';
const DEFAULT_START_DATE = '2026-02-19';
const REQUIRED_COUNT = 10;

// ============ LOCAL STORAGE (Cache) ============

export function getState(): ChallengeState {
  if (typeof window === 'undefined') {
    return { startDate: DEFAULT_START_DATE, completedDays: [], dayProgress: {} };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const state: ChallengeState = {
      startDate: DEFAULT_START_DATE,
      completedDays: [],
      dayProgress: {},
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }
  
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.dayProgress) parsed.dayProgress = {};
    if (!parsed.completedDays) parsed.completedDays = [];
    if (!parsed.startDate) parsed.startDate = DEFAULT_START_DATE;
    return parsed;
  } catch (e) {
    console.error('Corrupted challenge state, resetting:', e);
    const state: ChallengeState = {
      startDate: DEFAULT_START_DATE,
      completedDays: [],
      dayProgress: {},
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }
}

export function saveState(state: ChallengeState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Sync to cloud in background
  syncToCloud(state);
}

// ============ SUPABASE SYNC ============

let syncTimeout: ReturnType<typeof setTimeout> | null = null;

async function syncToCloud(state: ChallengeState): Promise<void> {
  // Debounce: wait 1s before syncing to avoid hammering the API
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      // Try getSession first (more reliable than getUser for client-side)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.log('[Sync] No session, skipping cloud sync');
        return; // Not logged in, skip sync
      }
      
      console.log('[Sync] Saving progress for user:', session.user.id);
      
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: session.user.id,
          state: state,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
      
      if (error) {
        console.error('[Sync] Error saving to cloud:', error.message, error.details, error.hint);
      } else {
        console.log('[Sync] Progress saved to cloud successfully');
      }
    } catch (e) {
      console.error('[Sync] Exception:', e);
    }
  }, 1000);
}

export async function loadFromCloud(): Promise<ChallengeState | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      console.log('[Sync] No session, cannot load from cloud');
      return null;
    }
    
    console.log('[Sync] Loading progress for user:', session.user.id);
    
    const { data, error } = await supabase
      .from('user_progress')
      .select('state')
      .eq('user_id', session.user.id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No data yet, that's fine
        console.log('[Sync] No cloud data yet for this user');
        return null;
      }
      console.error('[Sync] Error loading from cloud:', error.message, error.details);
      return null;
    }
    
    console.log('[Sync] Loaded progress from cloud:', data?.state);
    return data?.state as ChallengeState || null;
  } catch (e) {
    console.error('[Sync] Exception loading:', e);
    return null;
  }
}

export async function initializeState(): Promise<ChallengeState> {
  const localState = getState();
  const cloudState = await loadFromCloud();
  
  if (cloudState) {
    // MERGE: Take the HIGHER progress from each source
    const mergedState = mergeStates(localState, cloudState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
    // Sync merged state back to cloud
    syncToCloud(mergedState);
    console.log('[Sync] Merged local + cloud progress');
    return mergedState;
  }
  
  // No cloud data, use localStorage (and sync it up)
  syncToCloud(localState);
  return localState;
}

// Merge two states, taking the HIGHER progress for each day
function mergeStates(local: ChallengeState, cloud: ChallengeState): ChallengeState {
  const merged: ChallengeState = {
    startDate: local.startDate || cloud.startDate || DEFAULT_START_DATE,
    completedDays: [...new Set([...local.completedDays, ...cloud.completedDays])].sort((a, b) => a - b),
    dayProgress: {},
  };
  
  // Get all day indices from both states
  const allDays = new Set([
    ...Object.keys(local.dayProgress || {}).map(Number),
    ...Object.keys(cloud.dayProgress || {}).map(Number),
  ]);
  
  for (const day of allDays) {
    const localProgress = local.dayProgress?.[day] || { listenCount: 0, readCount: 0, reciteCount: 0 };
    const cloudProgress = cloud.dayProgress?.[day] || { listenCount: 0, readCount: 0, reciteCount: 0 };
    
    merged.dayProgress[day] = {
      listenCount: Math.max(localProgress.listenCount, cloudProgress.listenCount),
      readCount: Math.max(localProgress.readCount, cloudProgress.readCount),
      reciteCount: Math.max(localProgress.reciteCount, cloudProgress.reciteCount),
    };
  }
  
  return merged;
}

// ============ PROGRESS TRACKING ============

export function getDayProgress(dayIndex: number): DayProgress {
  const state = getState();
  return state.dayProgress[dayIndex] || { listenCount: 0, readCount: 0, reciteCount: 0 };
}

export function incrementStep(dayIndex: number, step: 'listen' | 'read' | 'recite'): DayProgress {
  const state = getState();
  if (!state.dayProgress[dayIndex]) {
    state.dayProgress[dayIndex] = { listenCount: 0, readCount: 0, reciteCount: 0 };
  }
  const p = state.dayProgress[dayIndex];
  if (step === 'listen') p.listenCount++;
  else if (step === 'read') p.readCount++;
  else if (step === 'recite') p.reciteCount++;

  // Auto-complete day when all steps done
  if (p.listenCount >= REQUIRED_COUNT && p.readCount >= REQUIRED_COUNT && p.reciteCount >= REQUIRED_COUNT) {
    if (!state.completedDays.includes(dayIndex)) {
      state.completedDays.push(dayIndex);
      state.completedDays.sort((a, b) => a - b);
    }
  }
  saveState(state);
  return p;
}

export function getActiveStep(progress: DayProgress): 1 | 2 | 3 | 'done' {
  if (progress.listenCount < REQUIRED_COUNT) return 1;
  if (progress.readCount < REQUIRED_COUNT) return 2;
  if (progress.reciteCount < REQUIRED_COUNT) return 3;
  return 'done';
}

export function getCurrentDay(state: ChallengeState): number {
  const start = new Date(state.startDate);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(30, diff));
}

export function toggleDay(dayIndex: number): ChallengeState {
  const state = getState();
  const idx = state.completedDays.indexOf(dayIndex);
  if (idx >= 0) {
    state.completedDays.splice(idx, 1);
  } else {
    state.completedDays.push(dayIndex);
  }
  state.completedDays.sort((a, b) => a - b);
  saveState(state);
  return state;
}

export function isDayCompleted(dayIndex: number): boolean {
  return getState().completedDays.includes(dayIndex);
}

export function getStreak(state: ChallengeState): number {
  const currentDay = getCurrentDay(state);
  let streak = 0;
  let checkDay = state.completedDays.includes(currentDay) ? currentDay : currentDay - 1;
  while (checkDay >= 1 && state.completedDays.includes(checkDay)) {
    streak++;
    checkDay--;
  }
  return streak;
}

export function getProgress(state: ChallengeState): number {
  return Math.round((state.completedDays.length / 30) * 100);
}

export type DayStatus = 'completed' | 'today' | 'upcoming' | 'missed';

export function getDayStatus(dayIndex: number, state: ChallengeState): DayStatus {
  const currentDay = getCurrentDay(state);
  if (state.completedDays.includes(dayIndex)) return 'completed';
  if (dayIndex === currentDay) return 'today';
  if (dayIndex < currentDay) return 'missed';
  return 'upcoming';
}

export function setStartDate(date: string): void {
  const state = getState();
  state.startDate = date;
  saveState(state);
}

export { REQUIRED_COUNT };
