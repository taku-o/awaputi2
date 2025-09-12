import { renderHook, act } from '@testing-library/react';
import { usePlayerStore } from '../PlayerStore';
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
    savePlayerData: jest.fn(),
    loadPlayerData: jest.fn(),
  },
}));

describe('PlayerStore', () => {
  beforeEach(() => {
    // 各テストの前にストアとモックをリセット
    jest.clearAllMocks();
    localStorageMock.clear();
    // ストアを初期状態にリセット
    const store = usePlayerStore.getState();
    store.resetPlayerData();
  });

  describe('初期状態', () => {
    test('デフォルト値で初期化される', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(result.current.username).toBe('Player');
      expect(result.current.level).toBe(1);
      expect(result.current.experience).toBe(0);
      expect(result.current.ap).toBe(0);
      expect(result.current.tap).toBe(0);
      expect(result.current.totalScore).toBe(0);
      expect(result.current.highScore).toBe(0);
      expect(result.current.gamesPlayed).toBe(0);
      expect(result.current.totalBubblesPopped).toBe(0);
      expect(result.current.userId).toBeTruthy();
      expect(result.current.createdAt).toBeTruthy();
      expect(result.current.lastPlayedAt).toBeTruthy();
    });

    test('experienceToNextLevelが正しく計算される', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      // レベル1の場合: 1 * 100 + 0 * 50 = 100
      expect(result.current.experienceToNextLevel).toBe(100);
    });
  });

  describe('updateUsername', () => {
    test('ユーザー名を正しく更新できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      act(() => {
        result.current.updateUsername('TestUser');
      });
      
      expect(result.current.username).toBe('TestUser');
      expect(StorageManager.savePlayerData).toHaveBeenCalled();
    });

    test('ユーザー名の前後の空白を削除する', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      act(() => {
        result.current.updateUsername('  TestUser  ');
      });
      
      expect(result.current.username).toBe('TestUser');
    });

    test('空のユーザー名でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateUsername('');
        });
      }).toThrow('Username cannot be empty');
    });

    test('20文字を超えるユーザー名でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateUsername('a'.repeat(21));
        });
      }).toThrow('Username cannot exceed 20 characters');
    });
  });

  describe('updateLevel', () => {
    test('レベルと経験値を正しく更新できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      act(() => {
        result.current.updateLevel(5, 1000);
      });
      
      expect(result.current.level).toBe(5);
      expect(result.current.experience).toBe(1000);
      // レベル5の場合: 5 * 100 + 4 * 50 = 700
      expect(result.current.experienceToNextLevel).toBe(700);
      expect(StorageManager.savePlayerData).toHaveBeenCalled();
    });

    test('レベルが1未満でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateLevel(0, 0);
        });
      }).toThrow('Level must be between 1 and 100');
    });

    test('レベルが100を超えるとエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateLevel(101, 0);
        });
      }).toThrow('Level must be between 1 and 100');
    });

    test('経験値が負の値でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateLevel(1, -1);
        });
      }).toThrow('Experience cannot be negative');
    });
  });

  describe('updateAP', () => {
    test('APを正しく更新できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      act(() => {
        result.current.updateAP(100);
      });
      
      expect(result.current.ap).toBe(100);
      expect(StorageManager.savePlayerData).toHaveBeenCalled();
    });

    test('APが負の値でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateAP(-1);
        });
      }).toThrow('AP cannot be negative');
    });
  });

  describe('updateTAP', () => {
    test('TAPを正しく更新できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      act(() => {
        result.current.updateTAP(50);
      });
      
      expect(result.current.tap).toBe(50);
      expect(StorageManager.savePlayerData).toHaveBeenCalled();
    });

    test('TAPが負の値でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateTAP(-1);
        });
      }).toThrow('TAP cannot be negative');
    });
  });

  describe('updateStatistics', () => {
    test('統計データを部分的に更新できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      act(() => {
        result.current.updateStatistics({
          totalScore: 1000,
          gamesPlayed: 5,
        });
      });
      
      expect(result.current.totalScore).toBe(1000);
      expect(result.current.gamesPlayed).toBe(5);
      expect(result.current.highScore).toBe(0); // 変更されない
      expect(result.current.totalBubblesPopped).toBe(0); // 変更されない
      expect(StorageManager.savePlayerData).toHaveBeenCalled();
    });

    test('highScoreを更新するとき、既存の値より大きい場合のみ更新される', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      // 初回: highScore = 100
      act(() => {
        result.current.updateStatistics({ highScore: 100 });
      });
      expect(result.current.highScore).toBe(100);
      
      // 2回目: 50 < 100 なので更新されない
      act(() => {
        result.current.updateStatistics({ highScore: 50 });
      });
      expect(result.current.highScore).toBe(100);
      
      // 3回目: 200 > 100 なので更新される
      act(() => {
        result.current.updateStatistics({ highScore: 200 });
      });
      expect(result.current.highScore).toBe(200);
    });

    test('lastPlayedAtが更新される', async () => {
      const { result } = renderHook(() => usePlayerStore());
      const beforeUpdate = result.current.lastPlayedAt;
      
      // 少し待機して時間を進める
      await new Promise(resolve => setTimeout(resolve, 10));
      
      act(() => {
        result.current.updateStatistics({ totalScore: 100 });
      });
      
      expect(result.current.lastPlayedAt).not.toBe(beforeUpdate);
    });

    test('totalScoreが負の値でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateStatistics({ totalScore: -1 });
        });
      }).toThrow('Total score cannot be negative');
    });

    test('gamesPlayedが負の値でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateStatistics({ gamesPlayed: -1 });
        });
      }).toThrow('Games played cannot be negative');
    });

    test('totalBubblesPoppedが負の値でエラーを投げる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.updateStatistics({ totalBubblesPopped: -1 });
        });
      }).toThrow('Total bubbles popped cannot be negative');
    });
  });

  describe('addToStatistics', () => {
    test('統計データを累計加算できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      // 初期状態を設定
      act(() => {
        result.current.updateStatistics({
          totalScore: 1000,
          gamesPlayed: 5,
          totalBubblesPopped: 100,
        });
      });
      
      // 累計加算
      act(() => {
        result.current.addToStatistics({
          totalScore: 500,
          gamesPlayed: 2,
          totalBubblesPopped: 50,
        });
      });
      
      expect(result.current.totalScore).toBe(1500);
      expect(result.current.gamesPlayed).toBe(7);
      expect(result.current.totalBubblesPopped).toBe(150);
      expect(StorageManager.savePlayerData).toHaveBeenCalled();
    });

    test('一部の統計データのみを累計加算できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      // 初期状態を設定
      act(() => {
        result.current.updateStatistics({
          totalScore: 1000,
          gamesPlayed: 5,
          totalBubblesPopped: 100,
        });
      });
      
      // totalScoreのみ加算
      act(() => {
        result.current.addToStatistics({
          totalScore: 300,
        });
      });
      
      expect(result.current.totalScore).toBe(1300);
      expect(result.current.gamesPlayed).toBe(5); // 変更されない
      expect(result.current.totalBubblesPopped).toBe(100); // 変更されない
    });

    test('ゼロの値で加算しても変化しない', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      // 初期状態を設定
      act(() => {
        result.current.updateStatistics({
          totalScore: 1000,
          gamesPlayed: 5,
          totalBubblesPopped: 100,
        });
      });
      
      // ゼロで加算
      act(() => {
        result.current.addToStatistics({
          totalScore: 0,
          gamesPlayed: 0,
          totalBubblesPopped: 0,
        });
      });
      
      expect(result.current.totalScore).toBe(1000);
      expect(result.current.gamesPlayed).toBe(5);
      expect(result.current.totalBubblesPopped).toBe(100);
    });

    test('負の値の増分でエラーを投げる（totalScore）', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.addToStatistics({ totalScore: -100 });
        });
      }).toThrow('Score increment cannot be negative');
    });

    test('負の値の増分でエラーを投げる（gamesPlayed）', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.addToStatistics({ gamesPlayed: -1 });
        });
      }).toThrow('Games played increment cannot be negative');
    });

    test('負の値の増分でエラーを投げる（totalBubblesPopped）', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      expect(() => {
        act(() => {
          result.current.addToStatistics({ totalBubblesPopped: -10 });
        });
      }).toThrow('Bubbles popped increment cannot be negative');
    });

    test('lastPlayedAtが更新される', async () => {
      const { result } = renderHook(() => usePlayerStore());
      const beforeUpdate = result.current.lastPlayedAt;
      
      // 少し待機して時間を進める
      await new Promise(resolve => setTimeout(resolve, 10));
      
      act(() => {
        result.current.addToStatistics({ totalScore: 100 });
      });
      
      expect(result.current.lastPlayedAt).not.toBe(beforeUpdate);
    });

    test('空のオブジェクトで呼び出しても安全に動作する', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      const initialScore = result.current.totalScore;
      const initialGames = result.current.gamesPlayed;
      const initialBubbles = result.current.totalBubblesPopped;
      
      act(() => {
        result.current.addToStatistics({});
      });
      
      expect(result.current.totalScore).toBe(initialScore);
      expect(result.current.gamesPlayed).toBe(initialGames);
      expect(result.current.totalBubblesPopped).toBe(initialBubbles);
    });
  });

  describe('loadPlayerData', () => {
    test('外部データを読み込んでストアを更新できる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      const testData = {
        userId: 'test_user_123',
        username: 'LoadedUser',
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
      
      act(() => {
        result.current.loadPlayerData(testData);
      });
      
      expect(result.current.userId).toBe('test_user_123');
      expect(result.current.username).toBe('LoadedUser');
      expect(result.current.level).toBe(10);
      expect(result.current.experience).toBe(5000);
      expect(result.current.ap).toBe(200);
      expect(result.current.tap).toBe(100);
      expect(StorageManager.savePlayerData).toHaveBeenCalledWith(testData);
    });
  });

  describe('resetPlayerData', () => {
    test('プレイヤーデータをデフォルト値にリセットできる', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      // まずデータを変更
      act(() => {
        result.current.updateUsername('TestUser');
        result.current.updateLevel(5, 1000);
        result.current.updateAP(100);
      });
      
      // リセット
      act(() => {
        result.current.resetPlayerData();
      });
      
      expect(result.current.username).toBe('Player');
      expect(result.current.level).toBe(1);
      expect(result.current.experience).toBe(0);
      expect(result.current.ap).toBe(0);
      expect(StorageManager.savePlayerData).toHaveBeenCalled();
    });

    test('リセット時に新しいuserIdが生成される', () => {
      const { result } = renderHook(() => usePlayerStore());
      
      const originalUserId = result.current.userId;
      
      act(() => {
        result.current.resetPlayerData();
      });
      
      expect(result.current.userId).not.toBe(originalUserId);
      expect(result.current.userId).toBeTruthy();
    });
  });
});

describe('PlayerStore初期化', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  test('ローカルストレージに保存されたデータを初期化時に読み込む', () => {
    const savedData = {
      userId: 'saved_user_123',
      username: 'SavedUser',
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
    };

    // StorageManagerのモックを設定して保存されたデータを返すようにする
    (StorageManager.loadPlayerData as jest.Mock).mockReturnValueOnce(savedData);

    // モジュールをリロードして初期化処理を実行
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { usePlayerStore: newStore } = require('../PlayerStore');
      const state = newStore.getState();
      
      expect(state.userId).toBe('saved_user_123');
      expect(state.username).toBe('SavedUser');
      expect(state.level).toBe(15);
      expect(state.experience).toBe(7500);
      expect(state.ap).toBe(500);
      expect(state.tap).toBe(250);
      expect(state.totalScore).toBe(50000);
      expect(state.highScore).toBe(5000);
      expect(state.gamesPlayed).toBe(50);
      expect(state.totalBubblesPopped).toBe(1500);
    });
  });

  test('ローカルストレージにデータがない場合はデフォルト値で初期化される', () => {
    // StorageManagerのモックを設定してnullを返すようにする
    (StorageManager.loadPlayerData as jest.Mock).mockReturnValueOnce(null);

    // モジュールをリロードして初期化処理を実行
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { usePlayerStore: newStore } = require('../PlayerStore');
      const state = newStore.getState();
      
      expect(state.username).toBe('Player');
      expect(state.level).toBe(1);
      expect(state.experience).toBe(0);
      expect(state.ap).toBe(0);
      expect(state.tap).toBe(0);
    });
  });
});