import { create } from 'zustand';
import { SettingsState } from '../types/StoreTypes';

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
const defaultSettingsState: SettingsState = {
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
const useSettingsStore = create<SettingsStore>((set) => ({
  ...defaultSettingsState,
  
  updateAudioSettings: (audio): void => set((state) => ({
    audio: { ...state.audio, ...audio },
  })),
  
  updateGraphicsSettings: (graphics): void => set((state) => ({
    graphics: { ...state.graphics, ...graphics },
  })),
  
  updateGameplaySettings: (gameplay): void => set((state) => ({
    gameplay: { ...state.gameplay, ...gameplay },
  })),
  
  updateLanguage: (language): void => set({ language }),
  
  updateControlSettings: (controls): void => set((state) => ({
    controls: { ...state.controls, ...controls },
  })),
  
  loadSettings: (settings): void => set(settings),
  
  resetSettings: (): void => set(defaultSettingsState),
}));

export default useSettingsStore;