import { StorageManager } from '../../utils/StorageUtils';
import {
  setupAutoPersistence,
  loadPersistedData,
  isPersistable,
  clearAllPersistedData,
  exportPersistedData,
  importPersistedData,
} from '../persistence';
import { usePlayerStore } from '../PlayerStore';
import { useSettingsStore } from '../SettingsStore';

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

    // ストアの状態をリセット
    usePlayerStore.getState().resetPlayerData();
    useSettingsStore.getState().resetSettings();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('setupAutoPersistence', () => {
    test('PlayerStore の変更時に自動保存される', async () => {
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });

      // PlayerStore の状態を変更
      usePlayerStore.getState().updateUsername('AutoSaveUser');

      // デバウンス時間を進める
      jest.advanceTimersByTime(150);

      // 自動保存が呼ばれることを確認
      expect(StorageManager.savePlayerData).toHaveBeenCalled();

      cleanup();
    });

    test('SettingsStore の変更時に自動保存される', async () => {
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });

      // SettingsStore の状態を変更
      useSettingsStore.getState().updateLanguage('en');

      // デバウンス時間を進める
      jest.advanceTimersByTime(150);

      // 自動保存が呼ばれることを確認
      expect(StorageManager.saveSettings).toHaveBeenCalled();

      cleanup();
    });

    test('デバウンス機能が正しく動作する', () => {
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 200 });

      // 複数回の変更を短時間で実行
      usePlayerStore.getState().updateUsername('User1');
      usePlayerStore.getState().updateUsername('User2');
      usePlayerStore.getState().updateUsername('User3');

      // デバウンス時間内では保存されない
      jest.advanceTimersByTime(100);
      expect(StorageManager.savePlayerData).not.toHaveBeenCalled();

      // デバウンス時間経過後に一度だけ保存される
      jest.advanceTimersByTime(150);
      expect(StorageManager.savePlayerData).toHaveBeenCalledTimes(1);

      cleanup();
    });

    test('自動保存でエラーが発生してもアプリケーションは継続動作する', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (StorageManager.savePlayerData as jest.Mock).mockImplementation(() => {
        throw new Error('Save failed');
      });

      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });

      // PlayerStore の状態を変更
      usePlayerStore.getState().updateUsername('ErrorUser');

      // デバウンス時間を進める
      jest.advanceTimersByTime(150);

      // エラーログが出力されることを確認
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to auto-save player data:',
        expect.any(Error)
      );

      cleanup();
      consoleErrorSpy.mockRestore();
    });

    test('無効化されている場合は自動保存されない', () => {
      const cleanup = setupAutoPersistence({ enabled: false });

      // PlayerStore の状態を変更
      usePlayerStore.getState().updateUsername('DisabledUser');

      // デバウンス時間を進める
      jest.advanceTimersByTime(150);

      // 自動保存が呼ばれないことを確認
      expect(StorageManager.savePlayerData).not.toHaveBeenCalled();

      cleanup();
    });

    test('クリーンアップ関数が正しく動作する', () => {
      const cleanup = setupAutoPersistence({ enabled: true, debounceMs: 100 });

      // クリーンアップを実行
      cleanup();

      // クリーンアップ後は自動保存されない
      usePlayerStore.getState().updateUsername('CleanupUser');
      jest.advanceTimersByTime(150);
      expect(StorageManager.savePlayerData).not.toHaveBeenCalled();

      // 二度呼び出してもエラーにならない
      expect(() => {
        cleanup();
      }).not.toThrow();
    });
  });

  describe('loadPersistedData', () => {
    test('保存されたプレイヤーデータを読み込んでストアに反映される', () => {
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

      // 読み込み前のデフォルト状態を確認
      const initialState = usePlayerStore.getState();
      expect(initialState.username).toBe('Player');
      expect(initialState.level).toBe(1);

      // データを読み込み
      loadPersistedData();

      // ストアに反映されることを確認
      const loadedState = usePlayerStore.getState();
      expect(loadedState.username).toBe('SavedUser');
      expect(loadedState.level).toBe(10);
      expect(loadedState.experience).toBe(5000);
      expect(loadedState.ap).toBe(200);
      expect(loadedState.tap).toBe(100);

      expect(StorageManager.loadPlayerData).toHaveBeenCalled();
    });

    test('保存された設定データを読み込んでストアに反映される', () => {
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

      // 読み込み前のデフォルト状態を確認
      const initialState = useSettingsStore.getState();
      expect(initialState.language).toBe('ja');
      expect(initialState.audio.masterVolume).toBe(100);

      // データを読み込み
      loadPersistedData();

      // ストアに反映されることを確認
      const loadedState = useSettingsStore.getState();
      expect(loadedState.language).toBe('en');
      expect(loadedState.audio.masterVolume).toBe(50);
      expect(loadedState.audio.bgmVolume).toBe(60);
      expect(loadedState.audio.isMuted).toBe(true);
      expect(loadedState.graphics.quality).toBe('low');

      expect(StorageManager.loadSettings).toHaveBeenCalled();
    });

    test('プレイヤーデータのみ存在する場合は設定はデフォルト値を維持', () => {
      const mockPlayerData = {
        userId: 'partial-id',
        username: 'PartialUser',
        level: 5,
        experience: 2500,
        experienceToNextLevel: 950,
        ap: 100,
        tap: 50,
        totalScore: 5000,
        highScore: 1000,
        gamesPlayed: 10,
        totalBubblesPopped: 250,
        createdAt: '2024-01-01T00:00:00.000Z',
        lastPlayedAt: '2024-01-02T00:00:00.000Z',
      };

      (StorageManager.loadPlayerData as jest.Mock).mockReturnValue(mockPlayerData);
      (StorageManager.loadSettings as jest.Mock).mockReturnValue(null);

      // データを読み込み
      loadPersistedData();

      // プレイヤーデータは読み込まれ、設定はデフォルト値
      const playerState = usePlayerStore.getState();
      const settingsState = useSettingsStore.getState();

      expect(playerState.username).toBe('PartialUser');
      expect(playerState.level).toBe(5);
      expect(settingsState.language).toBe('ja'); // デフォルト値
      expect(settingsState.audio.masterVolume).toBe(100); // デフォルト値

      expect(StorageManager.loadPlayerData).toHaveBeenCalled();
      expect(StorageManager.loadSettings).toHaveBeenCalled();
    });

    test('データが存在しない場合はデフォルト値を維持', () => {
      (StorageManager.loadPlayerData as jest.Mock).mockReturnValue(null);
      (StorageManager.loadSettings as jest.Mock).mockReturnValue(null);

      // 読み込み前の状態を記録
      const initialPlayerState = usePlayerStore.getState();
      const initialSettingsState = useSettingsStore.getState();

      // データを読み込み
      loadPersistedData();

      // 状態が変わらないことを確認
      const afterPlayerState = usePlayerStore.getState();
      const afterSettingsState = useSettingsStore.getState();

      expect(afterPlayerState.username).toBe(initialPlayerState.username);
      expect(afterPlayerState.level).toBe(initialPlayerState.level);
      expect(afterSettingsState.language).toBe(initialSettingsState.language);
      expect(afterSettingsState.audio.masterVolume).toBe(initialSettingsState.audio.masterVolume);

      expect(StorageManager.loadPlayerData).toHaveBeenCalled();
      expect(StorageManager.loadSettings).toHaveBeenCalled();
    });

    test('プレイヤーデータ読み込みエラーが発生した場合はエラーを投げる', () => {
      (StorageManager.loadPlayerData as jest.Mock).mockImplementation(() => {
        throw new Error('Player data load failed');
      });

      expect(() => {
        loadPersistedData();
      }).toThrow('Player data load failed');
    });

    test('設定データ読み込みエラーが発生した場合はエラーを投げる', () => {
      (StorageManager.loadPlayerData as jest.Mock).mockReturnValue(null);
      (StorageManager.loadSettings as jest.Mock).mockImplementation(() => {
        throw new Error('Settings load failed');
      });

      expect(() => {
        loadPersistedData();
      }).toThrow('Settings load failed');
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