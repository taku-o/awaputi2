import { create } from 'zustand';
import { PlayerState } from '../types/StoreTypes';

/**
 * プレイヤーデータストア
 */
export interface PlayerStore extends PlayerState {
  // Actions
  updateUsername: (username: string) => void;
  updateLevel: (level: number, experience: number) => void;
  updateAP: (ap: number) => void;
  updateTAP: (tap: number) => void;
  updateStatistics: (stats: Partial<{
    totalScore: number;
    highScore: number;
    gamesPlayed: number;
    totalBubblesPopped: number;
  }>) => void;
  loadPlayerData: (data: PlayerState) => void;
  resetPlayerData: () => void;
}

// デフォルト値
const defaultPlayerState: PlayerState = {
  userId: '',
  username: '',
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  ap: 0,
  tap: 0,
  totalScore: 0,
  highScore: 0,
  gamesPlayed: 0,
  totalBubblesPopped: 0,
  createdAt: new Date().toISOString(),
  lastPlayedAt: new Date().toISOString(),
};

/**
 * プレイヤーデータストア
 */
const usePlayerStore = create<PlayerStore>((set) => ({
  ...defaultPlayerState,
  
  updateUsername: (username): void => set({ username }),
  
  updateLevel: (level, experience): void => set({
    level,
    experience,
    // TODO: 次のレベルまでの必要経験値を計算
    experienceToNextLevel: 100 * level,
  }),
  
  updateAP: (ap): void => set({ ap }),
  
  updateTAP: (tap): void => set({ tap }),
  
  updateStatistics: (stats): void => set((state) => ({
    ...state,
    ...stats,
  })),
  
  loadPlayerData: (data): void => set(data),
  
  resetPlayerData: (): void => set(defaultPlayerState),
}));

export default usePlayerStore;