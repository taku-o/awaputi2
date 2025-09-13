import { create } from 'zustand';
import type { SettingsState } from '../types/StoreTypes';
import { StorageManager } from '../utils/StorageUtils';

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
  
  updateAudioSettings: (audio): void => set((state) => {
    const newState = {
      ...state,
      audio: { ...state.audio, ...audio },
    };
    // 設定を永続化
    StorageManager.saveSettings(newState);
    return { audio: newState.audio };
  }),
  
  updateGraphicsSettings: (graphics): void => set((state) => {
    const newState = {
      ...state,
      graphics: { ...state.graphics, ...graphics },
    };
    // 設定を永続化
    StorageManager.saveSettings(newState);
    return { graphics: newState.graphics };
  }),
  
  updateGameplaySettings: (gameplay): void => set((state) => {
    const newState = {
      ...state,
      gameplay: { ...state.gameplay, ...gameplay },
    };
    // 設定を永続化
    StorageManager.saveSettings(newState);
    return { gameplay: newState.gameplay };
  }),
  
  updateLanguage: (language): void => set((state) => {
    const newState = { ...state, language };
    // 設定を永続化
    StorageManager.saveSettings(newState);
    return { language };
  }),
  
  updateControlSettings: (controls): void => set((state) => {
    const newState = {
      ...state,
      controls: { ...state.controls, ...controls },
    };
    // 設定を永続化
    StorageManager.saveSettings(newState);
    return { controls: newState.controls };
  }),
  
  loadSettings: (settings): void => set(settings),
  
  resetSettings: (): void => {
    // デフォルト設定を永続化
    StorageManager.saveSettings(defaultSettings);
    set(defaultSettings);
  },
}));

// ストア初期化時に設定を読み込み
((): void => {
  const savedSettings = StorageManager.loadSettings();
  if (savedSettings) {
    useSettingsStore.getState().loadSettings(savedSettings);
  }
})();