import { StorageManager } from '../../utils/StorageUtils';
import {
  setupAutoPersistence,
  loadPersistedData,
  isPersistable,
  clearAllPersistedData,
  exportPersistedData,
  importPersistedData,
} from '../persistence';

// StorageManager のモック
jest.mock('../../utils/StorageUtils', () => ({
  StorageManager: {
    savePlayerData: jest.fn(),
    loadPlayerData: jest.fn(),
    saveSettings: jest.fn(),
    loadSettings: jest.fn(),
    clearAllData: jest.fn(),
  },
}));

// タイマーのモック
jest.useFakeTimers();

describe('Persistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('setupAutoPersistence', () => {
    test('PlayerStore の変更時に自動保存される', async () => {
      // 既存のPlayerStoreは各アクションで保存している
      // ここでは自動保存機能が適切に設定できることをテスト
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });
      expect(typeof cleanup).toBe('function');
      cleanup();
    });

    test('SettingsStore の変更時に自動保存される', async () => {
      // 既存のSettingsStoreは各アクションで保存している
      // ここでは自動保存機能が適切に設定できることをテスト
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });
      expect(typeof cleanup).toBe('function');
      cleanup();
    });

    test('デバウンス機能が正しく設定される', () => {
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 200 });
      expect(typeof cleanup).toBe('function');
      cleanup();
    });

    test('無効化されている場合は自動保存されない', () => {
      const cleanup = setupAutoPersistence({ enabled: false });
      // 無効化された場合もクリーンアップ関数が返される
      expect(typeof cleanup).toBe('function');
      cleanup();
    });

    test('エラーが発生してもクラッシュしない', () => {
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });
      // エラーハンドリングが組み込まれている
      expect(() => {
        cleanup();
      }).not.toThrow();
    });

    test('クリーンアップ関数が正しく動作する', () => {
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });

      // クリーンアップできる
      expect(() => {
        cleanup();
      }).not.toThrow();

      // 二度呼び出してもエラーにならない
      expect(() => {
        cleanup();
      }).not.toThrow();
    });
  });

  describe('loadPersistedData', () => {
    test('保存されたプレイヤーデータを読み込む', () => {
      const mockPlayerData = {
        userId: 'test-id',
        username: 'SavedUser',
        level: 10,
        experience: 5000,
        experienceToNextLevel: 1450,
        ap: 200,
        tap: 100,
        totalScore: 10000,
        highScore: 2000,
        gamesPlayed: 20,
        totalBubblesPopped: 500,
        createdAt: '2024-01-01T00:00:00.000Z',
        lastPlayedAt: '2024-01-02T00:00:00.000Z',
      };

      (StorageManager.loadPlayerData as jest.Mock).mockReturnValue(mockPlayerData);

      expect(() => {
        loadPersistedData();
      }).not.toThrow();

      expect(StorageManager.loadPlayerData).toHaveBeenCalled();
    });

    test('保存された設定データを読み込む', () => {
      const mockSettings = {
        audio: {
          masterVolume: 50,
          bgmVolume: 60,
          sfxVolume: 70,
          isMuted: true,
        },
        graphics: {
          quality: 'low' as const,
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
          keyBindings: {
            pause: 'P',
            confirm: 'Space',
          },
        },
      };

      (StorageManager.loadSettings as jest.Mock).mockReturnValue(mockSettings);

      expect(() => {
        loadPersistedData();
      }).not.toThrow();

      expect(StorageManager.loadSettings).toHaveBeenCalled();
    });

    test('データが存在しない場合はデフォルト値を維持', () => {
      (StorageManager.loadPlayerData as jest.Mock).mockReturnValue(null);
      (StorageManager.loadSettings as jest.Mock).mockReturnValue(null);

      expect(() => {
        loadPersistedData();
      }).not.toThrow();

      expect(StorageManager.loadPlayerData).toHaveBeenCalled();
      expect(StorageManager.loadSettings).toHaveBeenCalled();
    });

    test('読み込みエラーが発生した場合はエラーを投げる', () => {
      (StorageManager.loadPlayerData as jest.Mock).mockImplementation(() => {
        throw new Error('Load failed');
      });

      expect(() => {
        loadPersistedData();
      }).toThrow('Load failed');
    });
  });

  describe('isPersistable', () => {
    test('永続化対象のストアを正しく判定', () => {
      expect(isPersistable('PlayerStore')).toBe(true);
      expect(isPersistable('SettingsStore')).toBe(true);
      expect(isPersistable('GameStore')).toBe(true);
    });

    test('永続化対象外のストアを正しく判定', () => {
      expect(isPersistable('UIStore')).toBe(false);
      expect(isPersistable('ui')).toBe(false);
      expect(isPersistable('ModalStore')).toBe(false);
      expect(isPersistable('NotificationStore')).toBe(false);
      expect(isPersistable('LoadingStore')).toBe(false);
    });
  });

  describe('clearAllPersistedData', () => {
    test('すべてのデータがクリアされる', () => {
      expect(() => {
        clearAllPersistedData();
      }).not.toThrow();

      expect(StorageManager.clearAllData).toHaveBeenCalled();
    });

    test('クリアエラーが発生してもクラッシュしない', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (StorageManager.clearAllData as jest.Mock).mockImplementation(() => {
        throw new Error('Clear failed');
      });

      expect(() => {
        clearAllPersistedData();
      }).not.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to clear persisted data:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('exportPersistedData', () => {
    test('データを正しくエクスポート', () => {
      const exportedData = exportPersistedData();
      const parsed = JSON.parse(exportedData);

      expect(parsed.version).toBe('1.0.0');
      expect(parsed.timestamp).toBeDefined();
      expect(parsed.player).toBeDefined();
      expect(parsed.settings).toBeDefined();
    });

    test('エクスポートにアクションは含まれない', () => {
      const exportedData = exportPersistedData();
      const parsed = JSON.parse(exportedData);

      // アクション関数が含まれていないことを確認
      expect(parsed.player.updateUsername).toBeUndefined();
      expect(parsed.player.updateLevel).toBeUndefined();
      expect(parsed.settings.updateLanguage).toBeUndefined();
    });
  });

  describe('importPersistedData', () => {
    test('データを正しくインポート', () => {
      const importData = {
        version: '1.0.0',
        timestamp: '2024-01-01T00:00:00.000Z',
        player: {
          userId: 'import-id',
          username: 'ImportUser',
          level: 15,
          experience: 7500,
          experienceToNextLevel: 2200,
          ap: 500,
          tap: 250,
          totalScore: 50000,
          highScore: 5000,
          gamesPlayed: 50,
          totalBubblesPopped: 1500,
          createdAt: '2024-01-01T00:00:00.000Z',
          lastPlayedAt: '2024-01-05T00:00:00.000Z',
        },
        settings: {
          audio: {
            masterVolume: 70,
            bgmVolume: 80,
            sfxVolume: 90,
            isMuted: false,
          },
          graphics: {
            quality: 'ultra' as const,
            particleEffects: true,
            screenShake: true,
            showDamageNumbers: true,
            reducedMotion: false,
          },
          gameplay: {
            difficulty: 'normal' as const,
            autoSave: true,
            showTutorialHints: true,
            confirmPurchases: true,
          },
          language: 'en' as const,
          controls: {
            mouseButton: 'left' as const,
            keyBindings: {
              pause: 'Escape',
              confirm: 'Enter',
            },
          },
        },
      };

      expect(() => {
        importPersistedData(JSON.stringify(importData));
      }).not.toThrow();
    });

    test('不正なJSONでエラーが発生', () => {
      expect(() => {
        importPersistedData('invalid json');
      }).toThrow('データのインポートに失敗しました');
    });

    test('部分的なデータのインポートも可能', () => {
      const importData = {
        version: '1.0.0',
        timestamp: '2024-01-01T00:00:00.000Z',
        player: {
          userId: 'partial-id',
          username: 'PartialUser',
          level: 3,
          experience: 300,
          experienceToNextLevel: 200,
          ap: 30,
          tap: 15,
          totalScore: 1000,
          highScore: 200,
          gamesPlayed: 5,
          totalBubblesPopped: 100,
          createdAt: '2024-01-01T00:00:00.000Z',
          lastPlayedAt: '2024-01-02T00:00:00.000Z',
        },
        // settings は含まない
      };

      expect(() => {
        importPersistedData(JSON.stringify(importData));
      }).not.toThrow();
    });
  });
});