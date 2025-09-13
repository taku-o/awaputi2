import { StorageManager } from '../StorageUtils';
import type { PlayerState, SettingsState } from '../../types/StoreTypes';

// ローカルストレージのモック
const localStorageMock = ((): {
  getItem: jest.Mock;
  setItem: jest.Mock;
  removeItem: jest.Mock;
  clear: jest.Mock;
  length: number;
  key: jest.Mock;
  getStore: () => Record<string, string>;
} => {
  const store: Record<string, string> = {};

  const mock = {
    getItem: jest.fn((key: string) => {
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      // storeの中身をクリアするが、オブジェクト自体は保持
      for (const key in store) {
        delete store[key];
      }
    }),
    get length(): number {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
    // ストア全体を取得（テスト用）
    getStore: (): Record<string, string> => store
  };

  return mock;
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// モックデータ
const mockPlayerData: PlayerState = {
  userId: 'test-user-001',
  username: 'TestPlayer',
  level: 5,
  experience: 1200,
  experienceToNextLevel: 800,
  ap: 100,
  tap: 50,
  totalScore: 10000,
  highScore: 2500,
  gamesPlayed: 10,
  totalBubblesPopped: 500,
  createdAt: '2024-01-01T00:00:00.000Z',
  lastPlayedAt: '2024-09-13T12:00:00.000Z',
};

const mockSettings: SettingsState = {
  audio: {
    masterVolume: 80,
    bgmVolume: 70,
    sfxVolume: 90,
    isMuted: false,
  },
  graphics: {
    quality: 'high',
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
    keyBindings: {
      pause: 'Escape',
      confirm: 'Enter',
    },
  },
};

describe('StorageManager', () => {
  // テストの前後でローカルストレージをクリア
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    // モックの実装をリセット
    (localStorageMock.setItem as jest.Mock).mockImplementation((key: string, value: string) => {
      localStorageMock.getStore()[key] = value;
    });
    (localStorageMock.getItem as jest.Mock).mockImplementation((key: string) => {
      return localStorageMock.getStore()[key] || null;
    });
    (localStorageMock.removeItem as jest.Mock).mockImplementation((key: string) => {
      delete localStorageMock.getStore()[key];
    });
  });

  afterEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('プレイヤーデータの保存と読み込み', () => {
    test('プレイヤーデータを正しく保存できる', () => {
      StorageManager.savePlayerData(mockPlayerData);

      const savedData = localStorage.getItem('bubblepop:player');
      expect(savedData).not.toBeNull();
      const parsed = JSON.parse(savedData!);
      expect(parsed).toEqual(mockPlayerData);
    });

    test('プレイヤーデータを正しく読み込める', () => {
      localStorage.setItem('bubblepop:player', JSON.stringify(mockPlayerData));

      const loadedData = StorageManager.loadPlayerData();
      expect(loadedData).toEqual(mockPlayerData);
    });

    test('プレイヤーデータが存在しない場合はnullを返す', () => {
      const loadedData = StorageManager.loadPlayerData();
      expect(loadedData).toBeNull();
    });

    test('保存時にバージョン情報も保存される', () => {
      StorageManager.savePlayerData(mockPlayerData);

      const version = localStorage.getItem('bubblepop:version');
      expect(version).toBe('1.0.0');
    });

    test('保存に失敗した場合はエラーをスローする', () => {
      // localStorageのsetItemをモックしてエラーを発生させる
      (localStorageMock.setItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Storage full');
      });

      expect(() => {
        StorageManager.savePlayerData(mockPlayerData);
      }).toThrow('プレイヤーデータの保存に失敗しました');
    });
  });

  describe('設定データの保存と読み込み', () => {
    test('設定データを正しく保存できる', () => {
      StorageManager.saveSettings(mockSettings);

      const savedData = localStorage.getItem('bubblepop:settings');
      expect(savedData).not.toBeNull();
      const parsed = JSON.parse(savedData!);
      expect(parsed).toEqual(mockSettings);
    });

    test('設定データを正しく読み込める', () => {
      localStorage.setItem('bubblepop:settings', JSON.stringify(mockSettings));

      const loadedData = StorageManager.loadSettings();
      expect(loadedData).toEqual(mockSettings);
    });

    test('設定データが存在しない場合はnullを返す', () => {
      const loadedData = StorageManager.loadSettings();
      expect(loadedData).toBeNull();
    });

    test('保存時にバージョン情報も保存される', () => {
      StorageManager.saveSettings(mockSettings);

      const version = localStorage.getItem('bubblepop:version');
      expect(version).toBe('1.0.0');
    });

    test('保存に失敗した場合はエラーをスローする', () => {
      (localStorageMock.setItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Storage full');
      });

      expect(() => {
        StorageManager.saveSettings(mockSettings);
      }).toThrow('設定の保存に失敗しました');
    });
  });

  describe('データのクリア', () => {
    test('すべてのデータをクリアできる', () => {
      // データを保存
      localStorage.setItem('bubblepop:player', JSON.stringify(mockPlayerData));
      localStorage.setItem('bubblepop:settings', JSON.stringify(mockSettings));
      localStorage.setItem('bubblepop:version', '1.0.0');
      localStorage.setItem('other:data', 'should remain');

      // クリア実行
      StorageManager.clearAllData();

      // BubblePopのデータがクリアされていることを確認
      expect(localStorage.getItem('bubblepop:player')).toBeNull();
      expect(localStorage.getItem('bubblepop:settings')).toBeNull();
      expect(localStorage.getItem('bubblepop:version')).toBeNull();

      // 他のデータは残っていることを確認
      expect(localStorage.getItem('other:data')).toBe('should remain');
    });

    test('クリアに失敗した場合はエラーをスローする', () => {
      (localStorageMock.removeItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Remove failed');
      });

      expect(() => {
        StorageManager.clearAllData();
      }).toThrow('データのクリアに失敗しました');
    });
  });

  describe('バージョン管理', () => {
    test('バージョン情報を取得できる', () => {
      localStorage.setItem('bubblepop:version', '1.0.0');

      const version = StorageManager.getVersion();
      expect(version).toBe('1.0.0');
    });

    test('バージョン情報が存在しない場合はnullを返す', () => {
      const version = StorageManager.getVersion();
      expect(version).toBeNull();
    });
  });

  describe('一括保存と読み込み', () => {
    test('すべてのデータを一括で保存できる', () => {
      StorageManager.saveAll(mockPlayerData, mockSettings);

      const playerData = localStorage.getItem('bubblepop:player');
      const settings = localStorage.getItem('bubblepop:settings');
      const version = localStorage.getItem('bubblepop:version');

      expect(playerData).not.toBeNull();
      expect(settings).not.toBeNull();
      expect(version).toBe('1.0.0');

      expect(JSON.parse(playerData!)).toEqual(mockPlayerData);
      expect(JSON.parse(settings!)).toEqual(mockSettings);
    });

    test('一括保存に失敗した場合はエラーをスローする', () => {
      let callCount = 0;
      (localStorageMock.setItem as jest.Mock).mockImplementation(() => {
        callCount++;
        if (callCount === 2) {
          throw new Error('Storage full');
        }
      });

      expect(() => {
        StorageManager.saveAll(mockPlayerData, mockSettings);
      }).toThrow('データの一括保存に失敗しました');

      // 元の実装に戻す
      (localStorageMock.setItem as jest.Mock).mockImplementation((key: string, value: string) => {
        localStorageMock.getStore()[key] = value;
      });
    });

    test('すべてのデータを一括で読み込める', () => {
      localStorageMock.setItem('bubblepop:player', JSON.stringify(mockPlayerData));
      localStorageMock.setItem('bubblepop:settings', JSON.stringify(mockSettings));
      localStorageMock.setItem('bubblepop:version', '1.0.0');

      const data = StorageManager.loadAll();

      expect(data).not.toBeNull();
      expect(data!.version).toBe('1.0.0');
      expect(data!.playerData).toEqual(mockPlayerData);
      expect(data!.settings).toEqual(mockSettings);
      expect(data!.lastSaved).toBeDefined();
    });

    test('一部のデータが存在しない場合はnullを返す', () => {
      localStorage.setItem('bubblepop:player', JSON.stringify(mockPlayerData));
      // settingsは設定しない

      const data = StorageManager.loadAll();
      expect(data).toBeNull();
    });

    test('データが全く存在しない場合はnullを返す', () => {
      const data = StorageManager.loadAll();
      expect(data).toBeNull();
    });
  });

  describe('ストレージ利用可能性チェック', () => {
    test('ストレージが利用可能な場合はtrueを返す', () => {
      const isAvailable = StorageManager.isStorageAvailable();
      expect(isAvailable).toBe(true);
    });

    test('ストレージが利用不可能な場合はfalseを返す', () => {
      (localStorageMock.setItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Storage not available');
      });

      const isAvailable = StorageManager.isStorageAvailable();
      expect(isAvailable).toBe(false);
    });
  });

  describe('ストレージサイズ計算', () => {
    test('BubblePop関連データのサイズを計算できる', () => {
      localStorageMock.setItem('bubblepop:player', JSON.stringify(mockPlayerData));
      localStorageMock.setItem('bubblepop:settings', JSON.stringify(mockSettings));
      localStorageMock.setItem('bubblepop:version', '1.0.0');
      localStorageMock.setItem('other:data', 'should not be counted');

      // getStorageSize内のfor...inループ用にモックを設定
      const store = localStorageMock.getStore();
      const mockLocalStorage = {
        ...localStorageMock,
        getItem: localStorageMock.getItem
      };

      // for...inループで列挙可能にする
      for (const key in store) {
        Object.defineProperty(mockLocalStorage, key, {
          value: store[key],
          enumerable: true,
          configurable: true
        });
      }

      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
        configurable: true
      });

      const size = StorageManager.getStorageSize();

      // サイズが0より大きいことを確認
      expect(size).toBeGreaterThan(0);

      // BubblePopデータのみがカウントされることを確認
      const expectedSize =
        'bubblepop:player'.length + JSON.stringify(mockPlayerData).length +
        'bubblepop:settings'.length + JSON.stringify(mockSettings).length +
        'bubblepop:version'.length + '1.0.0'.length;

      expect(size).toBe(expectedSize);

      // localStorageを元に戻す
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });
    });

    test('BubblePopデータが存在しない場合は0を返す', () => {
      localStorage.setItem('other:data', 'should not be counted');

      const size = StorageManager.getStorageSize();
      expect(size).toBe(0);
    });
  });

  describe('データの整合性', () => {
    test('保存したデータと読み込んだデータが一致する', () => {
      // プレイヤーデータ
      StorageManager.savePlayerData(mockPlayerData);
      const loadedPlayerData = StorageManager.loadPlayerData();
      expect(loadedPlayerData).toEqual(mockPlayerData);

      // 設定データ
      StorageManager.saveSettings(mockSettings);
      const loadedSettings = StorageManager.loadSettings();
      expect(loadedSettings).toEqual(mockSettings);
    });

    test('複数回の保存と読み込みでデータが壊れない', () => {
      // 1回目
      StorageManager.savePlayerData(mockPlayerData);
      let loaded = StorageManager.loadPlayerData();
      expect(loaded).toEqual(mockPlayerData);

      // 2回目（データを変更）
      const modifiedData = { ...mockPlayerData, level: 10, experience: 2500 };
      StorageManager.savePlayerData(modifiedData);
      loaded = StorageManager.loadPlayerData();
      expect(loaded).toEqual(modifiedData);

      // 3回目（元に戻す）
      StorageManager.savePlayerData(mockPlayerData);
      loaded = StorageManager.loadPlayerData();
      expect(loaded).toEqual(mockPlayerData);
    });
  });

  describe('エラーログ出力', () => {
    test('保存エラー時にコンソールエラーが出力される', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      (localStorageMock.setItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      expect(() => {
        StorageManager.savePlayerData(mockPlayerData);
      }).toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to save player data:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    test('クリアエラー時にコンソールエラーが出力される', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      (localStorageMock.removeItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      expect(() => {
        StorageManager.clearAllData();
      }).toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to clear data:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });
});