import { create } from 'zustand';
import { PlayerState } from '../types/StoreTypes';

export interface PlayerStore extends PlayerState {
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
  addToStatistics: (stats: Partial<{
    totalScore: number;
    gamesPlayed: number;
    totalBubblesPopped: number;
  }>) => void;
  loadPlayerData: (data: PlayerState) => void;
  resetPlayerData: () => void;
}

const calculateExperienceToNextLevel = (level: number): number => {
  return level * 100 + (level - 1) * 50;
};

const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getDefaultPlayerState = (): PlayerState => {
  const now = new Date().toISOString();
  return {
    userId: generateUserId(),
    username: 'Player',
    level: 1,
    experience: 0,
    experienceToNextLevel: calculateExperienceToNextLevel(1),
    ap: 0,
    tap: 0,
    totalScore: 0,
    highScore: 0,
    gamesPlayed: 0,
    totalBubblesPopped: 0,
    createdAt: now,
    lastPlayedAt: now,
  };
};

const usePlayerStore = create<PlayerStore>((set) => ({
  ...getDefaultPlayerState(),

  updateUsername: (username: string): void => {
    if (!username || username.trim().length === 0) {
      throw new Error('Username cannot be empty');
    }
    if (username.length > 20) {
      throw new Error('Username cannot exceed 20 characters');
    }
    set((state) => ({ ...state, username: username.trim() }));
  },

  updateLevel: (level: number, experience: number): void => {
    if (level < 1 || level > 100) {
      throw new Error('Level must be between 1 and 100');
    }
    if (experience < 0) {
      throw new Error('Experience cannot be negative');
    }
    set((state) => ({
      ...state,
      level,
      experience,
      experienceToNextLevel: calculateExperienceToNextLevel(level),
    }));
  },

  updateAP: (ap: number): void => {
    if (ap < 0) {
      throw new Error('AP cannot be negative');
    }
    set((state) => ({ ...state, ap }));
  },

  updateTAP: (tap: number): void => {
    if (tap < 0) {
      throw new Error('TAP cannot be negative');
    }
    set((state) => ({ ...state, tap }));
  },

  updateStatistics: (stats): void => {
    set((state) => {
      const newState = {
        ...state,
        totalScore: stats.totalScore !== undefined ? stats.totalScore : state.totalScore,
        highScore: stats.highScore !== undefined ?
          Math.max(stats.highScore, state.highScore) : state.highScore,
        gamesPlayed: stats.gamesPlayed !== undefined ? stats.gamesPlayed : state.gamesPlayed,
        totalBubblesPopped: stats.totalBubblesPopped !== undefined ?
          stats.totalBubblesPopped : state.totalBubblesPopped,
        lastPlayedAt: new Date().toISOString(),
      };

      if (newState.totalScore < 0) {
        throw new Error('Total score cannot be negative');
      }
      if (newState.gamesPlayed < 0) {
        throw new Error('Games played cannot be negative');
      }
      if (newState.totalBubblesPopped < 0) {
        throw new Error('Total bubbles popped cannot be negative');
      }

      return newState;
    });
  },

  addToStatistics: (stats): void => {
    set((state) => {
      const newState = {
        ...state,
        totalScore: state.totalScore + (stats.totalScore ?? 0),
        gamesPlayed: state.gamesPlayed + (stats.gamesPlayed ?? 0),
        totalBubblesPopped: state.totalBubblesPopped + (stats.totalBubblesPopped ?? 0),
        lastPlayedAt: new Date().toISOString(),
      };

      if (stats.totalScore !== undefined && stats.totalScore < 0) {
        throw new Error('Score increment cannot be negative');
      }
      if (stats.gamesPlayed !== undefined && stats.gamesPlayed < 0) {
        throw new Error('Games played increment cannot be negative');
      }
      if (stats.totalBubblesPopped !== undefined && stats.totalBubblesPopped < 0) {
        throw new Error('Bubbles popped increment cannot be negative');
      }

      if (newState.totalScore < 0) {
        throw new Error('Total score cannot be negative');
      }
      if (newState.gamesPlayed < 0) {
        throw new Error('Games played cannot be negative');
      }
      if (newState.totalBubblesPopped < 0) {
        throw new Error('Total bubbles popped cannot be negative');
      }

      return newState;
    });
  },

  loadPlayerData: (data: PlayerState): void => {
    set(() => data);
  },

  resetPlayerData: (): void => {
    set(() => getDefaultPlayerState());
  },
}));


export { usePlayerStore };
export default usePlayerStore;