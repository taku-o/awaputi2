import { create } from 'zustand';
import type { SettingsState } from '../types/StoreTypes';

/**
 * 設定ストア
 */
export interface SettingsStore extends SettingsState {
  // Actions
  updateAudioSettings: (audio: Partial<SettingsState['audio']>) => void;
  updateGraphicsSettings: (graphics: Partial<SettingsState['graphics']>) => void;
  updateGameplaySettings: (gameplay: Partial<SettingsState['gameplay']>) => void;
  updateLanguage: (language: 'ja' | 'en') => void;
  updateControlSettings: (controls: Partial<SettingsState['controls']>) => void;
  loadSettings: (settings: SettingsState) => void;
  resetSettings: () => void;
}

// デフォルト値
export const defaultSettings: SettingsState = {
  audio: {
    masterVolume: 100,
    bgmVolume: 80,
    sfxVolume: 80,
    isMuted: false,
  },
  graphics: {
    quality: 'auto',
    particleEffects: true,
    screenShake: true,
    showDamageNumbers: true,
    reducedMotion: false,
  },
  gameplay: {
    difficulty: 'normal',
    autoSave: true,
    showTutorialHints: true,
    confirmPurchases: true,
  },
  language: 'ja',
  controls: {
    mouseButton: 'left',
    keyBindings: {},
  },
};

/**
 * 設定ストア
 */
export const useSettingsStore = create<SettingsStore>((set) => ({
  ...defaultSettings,
  
  updateAudioSettings: (audio): void => set((state) => ({
    ...state,
    audio: { ...state.audio, ...audio },
  })),
  
  updateGraphicsSettings: (graphics): void => set((state) => ({
    ...state,
    graphics: { ...state.graphics, ...graphics },
  })),
  
  updateGameplaySettings: (gameplay): void => set((state) => ({
    ...state,
    gameplay: { ...state.gameplay, ...gameplay },
  })),
  
  updateLanguage: (language): void => set((state) => ({
    ...state,
    language,
  })),
  
  updateControlSettings: (controls): void => set((state) => ({
    ...state,
    controls: { ...state.controls, ...controls },
  })),
  
  loadSettings: (settings): void => set(settings),
  
  resetSettings: (): void => {
    set(defaultSettings);
  },
}));

