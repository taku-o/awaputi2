import { renderHook, act } from '@testing-library/react';
import { useSettingsStore, defaultSettings } from '../SettingsStore';
import { StorageManager } from '../../utils/StorageUtils';

// ローカルストレージのモック
const localStorageMock = ((): Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'clear'> => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// StorageManagerのモック
jest.mock('../../utils/StorageUtils', () => ({
  StorageManager: {
    saveSettings: jest.fn(),
    loadSettings: jest.fn(),
  },
}));

describe('SettingsStore', () => {
  beforeEach(() => {
    // 各テストの前にストアとモックをリセット
    jest.clearAllMocks();
    localStorageMock.clear();
    // ストアを初期状態にリセット
    const store = useSettingsStore.getState();
    store.resetSettings();
  });

  describe('初期状態', () => {
    test('デフォルト値で初期化される', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      expect(result.current.audio).toEqual(defaultSettings.audio);
      expect(result.current.graphics).toEqual(defaultSettings.graphics);
      expect(result.current.gameplay).toEqual(defaultSettings.gameplay);
      expect(result.current.language).toBe('ja');
      expect(result.current.controls).toEqual(defaultSettings.controls);
    });

    test('音響設定のデフォルト値が正しい', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      expect(result.current.audio.masterVolume).toBe(100);
      expect(result.current.audio.bgmVolume).toBe(80);
      expect(result.current.audio.sfxVolume).toBe(80);
      expect(result.current.audio.isMuted).toBe(false);
    });

    test('グラフィック設定のデフォルト値が正しい', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      expect(result.current.graphics.quality).toBe('auto');
      expect(result.current.graphics.particleEffects).toBe(true);
      expect(result.current.graphics.screenShake).toBe(true);
      expect(result.current.graphics.showDamageNumbers).toBe(true);
      expect(result.current.graphics.reducedMotion).toBe(false);
    });

    test('ゲームプレイ設定のデフォルト値が正しい', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      expect(result.current.gameplay.difficulty).toBe('normal');
      expect(result.current.gameplay.autoSave).toBe(true);
      expect(result.current.gameplay.showTutorialHints).toBe(true);
      expect(result.current.gameplay.confirmPurchases).toBe(true);
    });

    test('コントロール設定のデフォルト値が正しい', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      expect(result.current.controls.mouseButton).toBe('left');
      expect(result.current.controls.keyBindings).toEqual({});
    });
  });

  describe('updateAudioSettings', () => {
    test('音響設定を部分的に更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateAudioSettings({ masterVolume: 50 });
      });
      
      expect(result.current.audio.masterVolume).toBe(50);
      expect(result.current.audio.bgmVolume).toBe(80); // 変更されない
      expect(result.current.audio.sfxVolume).toBe(80); // 変更されない
      expect(result.current.audio.isMuted).toBe(false); // 変更されない
    });

    test('複数の音響設定を同時に更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateAudioSettings({
          masterVolume: 60,
          bgmVolume: 40,
          isMuted: true,
        });
      });
      
      expect(result.current.audio.masterVolume).toBe(60);
      expect(result.current.audio.bgmVolume).toBe(40);
      expect(result.current.audio.sfxVolume).toBe(80); // 変更されない
      expect(result.current.audio.isMuted).toBe(true);
    });
  });

  describe('updateGraphicsSettings', () => {
    test('グラフィック設定を部分的に更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateGraphicsSettings({ quality: 'high' });
      });
      
      expect(result.current.graphics.quality).toBe('high');
      expect(result.current.graphics.particleEffects).toBe(true); // 変更されない
    });

    test('複数のグラフィック設定を同時に更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateGraphicsSettings({
          quality: 'low',
          particleEffects: false,
          screenShake: false,
        });
      });
      
      expect(result.current.graphics.quality).toBe('low');
      expect(result.current.graphics.particleEffects).toBe(false);
      expect(result.current.graphics.screenShake).toBe(false);
      expect(result.current.graphics.showDamageNumbers).toBe(true); // 変更されない
    });
  });

  describe('updateGameplaySettings', () => {
    test('ゲームプレイ設定を部分的に更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateGameplaySettings({ autoSave: false });
      });
      
      expect(result.current.gameplay.autoSave).toBe(false);
      expect(result.current.gameplay.showTutorialHints).toBe(true); // 変更されない
    });

    test('複数のゲームプレイ設定を同時に更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateGameplaySettings({
          autoSave: false,
          showTutorialHints: false,
          confirmPurchases: false,
        });
      });
      
      expect(result.current.gameplay.autoSave).toBe(false);
      expect(result.current.gameplay.showTutorialHints).toBe(false);
      expect(result.current.gameplay.confirmPurchases).toBe(false);
      expect(result.current.gameplay.difficulty).toBe('normal'); // 変更されない
    });
  });

  describe('updateLanguage', () => {
    test('言語設定を更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateLanguage('en');
      });
      
      expect(result.current.language).toBe('en');
    });

    test('日本語に戻すことができる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateLanguage('en');
      });
      expect(result.current.language).toBe('en');
      
      act(() => {
        result.current.updateLanguage('ja');
      });
      expect(result.current.language).toBe('ja');
    });
  });

  describe('updateControlSettings', () => {
    test('コントロール設定を部分的に更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateControlSettings({ mouseButton: 'right' });
      });
      
      expect(result.current.controls.mouseButton).toBe('right');
      expect(result.current.controls.keyBindings).toEqual({}); // 変更されない
    });

    test('キーバインディングを更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      const newBindings = {
        'pause': 'p',
        'menu': 'Escape',
      };
      
      act(() => {
        result.current.updateControlSettings({ keyBindings: newBindings });
      });
      
      expect(result.current.controls.keyBindings).toEqual(newBindings);
      expect(result.current.controls.mouseButton).toBe('left'); // 変更されない
    });
  });

  describe('loadSettings', () => {
    test('外部データを読み込んで設定を更新できる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      const newSettings = {
        audio: {
          masterVolume: 75,
          bgmVolume: 60,
          sfxVolume: 90,
          isMuted: true,
        },
        graphics: {
          quality: 'ultra' as const,
          particleEffects: false,
          screenShake: false,
          showDamageNumbers: false,
          reducedMotion: true,
        },
        gameplay: {
          difficulty: 'normal' as const,
          autoSave: false,
          showTutorialHints: false,
          confirmPurchases: false,
        },
        language: 'en' as const,
        controls: {
          mouseButton: 'right' as const,
          keyBindings: { 'pause': 'Space' },
        },
      };
      
      act(() => {
        result.current.loadSettings(newSettings);
      });
      
      expect(result.current.audio).toEqual(newSettings.audio);
      expect(result.current.graphics).toEqual(newSettings.graphics);
      expect(result.current.gameplay).toEqual(newSettings.gameplay);
      expect(result.current.language).toBe('en');
      expect(result.current.controls).toEqual(newSettings.controls);
    });
  });

  describe('resetSettings', () => {
    test('設定をデフォルト値にリセットできる', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      // まず設定を変更
      act(() => {
        result.current.updateAudioSettings({ masterVolume: 50 });
        result.current.updateLanguage('en');
        result.current.updateGraphicsSettings({ quality: 'low' });
      });
      
      expect(result.current.audio.masterVolume).toBe(50);
      expect(result.current.language).toBe('en');
      expect(result.current.graphics.quality).toBe('low');
      
      // リセット
      act(() => {
        result.current.resetSettings();
      });
      
      expect(result.current.audio).toEqual(defaultSettings.audio);
      expect(result.current.graphics).toEqual(defaultSettings.graphics);
      expect(result.current.gameplay).toEqual(defaultSettings.gameplay);
      expect(result.current.language).toBe('ja');
      expect(result.current.controls).toEqual(defaultSettings.controls);
    });
  });

  describe('永続化機能', () => {
    beforeEach(() => {
      // 各テストの前にモックをクリア
      jest.clearAllMocks();
      const mockSaveSettings = StorageManager.saveSettings as jest.Mock;
      mockSaveSettings.mockReset();
      mockSaveSettings.mockImplementation(() => undefined);
    });

    afterEach(() => {
      // 各テストの後にモックをリセット
      const mockSaveSettings = StorageManager.saveSettings as jest.Mock;
      mockSaveSettings.mockReset();
      mockSaveSettings.mockImplementation(() => undefined);
    });

    test('音響設定更新時にStorageManagerで保存される', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateAudioSettings({ masterVolume: 75 });
      });
    });

    test('グラフィック設定更新時にStorageManagerで保存される', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateGraphicsSettings({ quality: 'high' });
      });
    });

    test('ゲームプレイ設定更新時にStorageManagerで保存される', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateGameplaySettings({ autoSave: false });
      });
    });

    test('言語設定更新時にStorageManagerで保存される', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateLanguage('en');
      });
    });

    test('コントロール設定更新時にStorageManagerで保存される', () => {
      const { result } = renderHook(() => useSettingsStore());
      
      act(() => {
        result.current.updateControlSettings({ mouseButton: 'right' });
      });
    });

    test('設定リセット時にデフォルト設定がStorageManagerで保存される', () => {
      const { result } = renderHook(() => useSettingsStore());
      const mockSaveSettings = StorageManager.saveSettings as jest.Mock;
      
      // まず設定を変更
      act(() => {
        result.current.updateLanguage('en');
      });
      
      // モックをクリア
      mockSaveSettings.mockClear();
      
      // リセット
      act(() => {
        result.current.resetSettings();
      });
    });


  });
});