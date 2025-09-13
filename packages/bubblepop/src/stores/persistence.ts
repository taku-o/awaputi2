import { usePlayerStore } from './PlayerStore';
import { useSettingsStore } from './SettingsStore';
import { StorageManager } from '../utils/StorageUtils';

/**
 * 永続化設定
 */
interface PersistConfig {
  enabled: boolean;
  debounceMs?: number;
}

/**
 * デフォルトの永続化設定
 */
const defaultConfig: PersistConfig = {
  enabled: true,
  debounceMs: 500, // 500ms のデバウンス
};

/**
 * デバウンス用のタイマー管理
 */
const debounceTimers: Record<string, NodeJS.Timeout> = {};

/**
 * デバウンス付き関数実行
 */
function debounce(key: string, fn: () => void, delay: number): void {
  if (debounceTimers[key]) {
    clearTimeout(debounceTimers[key]);
  }
  debounceTimers[key] = setTimeout(fn, delay);
}

/**
 * 自動保存機能を設定
 */
export function setupAutoPersistence(config: PersistConfig = defaultConfig): () => void {
  if (!config.enabled) {
    return () => {};
  }

  const unsubscribers: Array<() => void> = [];

  // PlayerStore の自動保存設定
  const unsubscribePlayer = usePlayerStore.subscribe(
    (state) => {
      debounce(
        'player',
        () => {
          try {
            // UIStore以外の永続化対象データのみを保存
            const {
              updateUsername: _updateUsername,
              updateLevel: _updateLevel,
              updateAP: _updateAP,
              updateTAP: _updateTAP,
              updateStatistics: _updateStatistics,
              addToStatistics: _addToStatistics,
              loadPlayerData: _loadPlayerData,
              resetPlayerData: _resetPlayerData,
              ...playerData
            } = state;

            StorageManager.savePlayerData(playerData);
          } catch (error) {
            console.error('Failed to auto-save player data:', error);
          }
        },
        config.debounceMs ?? 500
      );
    }
  );
  unsubscribers.push(unsubscribePlayer);

  // SettingsStore の自動保存設定
  const unsubscribeSettings = useSettingsStore.subscribe(
    (state) => {
      debounce(
        'settings',
        () => {
          try {
            // アクション以外の設定データのみを保存
            const {
              updateAudioSettings: _updateAudioSettings,
              updateGraphicsSettings: _updateGraphicsSettings,
              updateGameplaySettings: _updateGameplaySettings,
              updateLanguage: _updateLanguage,
              updateControlSettings: _updateControlSettings,
              loadSettings: _loadSettings,
              resetSettings: _resetSettings,
              ...settingsData
            } = state;

            StorageManager.saveSettings(settingsData);
          } catch (error) {
            console.error('Failed to auto-save settings:', error);
          }
        },
        config.debounceMs ?? 500
      );
    }
  );
  unsubscribers.push(unsubscribeSettings);

  // クリーンアップ関数を返す
  return () => {
    unsubscribers.forEach(unsubscribe => unsubscribe());
    // タイマーをクリア
    Object.values(debounceTimers).forEach(timer => clearTimeout(timer));
  };
}

/**
 * アプリケーション起動時のデータ読み込み
 * エラーが発生した場合はそのまま投げてアプリケーションを終了させる
 */
export function loadPersistedData(): void {
  // PlayerStore のデータ読み込み
  const savedPlayerData = StorageManager.loadPlayerData();
  if (savedPlayerData) {
    usePlayerStore.getState().loadPlayerData(savedPlayerData);
  }

  // SettingsStore のデータ読み込み
  const savedSettings = StorageManager.loadSettings();
  if (savedSettings) {
    useSettingsStore.getState().loadSettings(savedSettings);
  }
}

/**
 * 永続化対象かどうかを判定
 */
export function isPersistable(storeName: string): boolean {
  // UIStore は永続化対象外
  const nonPersistableStores = ['UIStore', 'ui', 'modal', 'notification', 'loading'];

  return !nonPersistableStores.some(
    nonPersistable => storeName.toLowerCase().includes(nonPersistable.toLowerCase())
  );
}

/**
 * すべての永続化対象データをクリア
 */
export function clearAllPersistedData(): void {
  try {
    StorageManager.clearAllData();
  } catch (error) {
    console.error('Failed to clear persisted data:', error);
  }
}

/**
 * 永続化対象データのエクスポート
 */
export function exportPersistedData(): string {
  try {
    const playerData = usePlayerStore.getState();
    const settingsData = useSettingsStore.getState();

    // アクションを除外したデータを作成
    const exportData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      player: {
        userId: playerData.userId,
        username: playerData.username,
        level: playerData.level,
        experience: playerData.experience,
        experienceToNextLevel: playerData.experienceToNextLevel,
        ap: playerData.ap,
        tap: playerData.tap,
        totalScore: playerData.totalScore,
        highScore: playerData.highScore,
        gamesPlayed: playerData.gamesPlayed,
        totalBubblesPopped: playerData.totalBubblesPopped,
        createdAt: playerData.createdAt,
        lastPlayedAt: playerData.lastPlayedAt,
      },
      settings: {
        audio: settingsData.audio,
        graphics: settingsData.graphics,
        gameplay: settingsData.gameplay,
        language: settingsData.language,
        controls: settingsData.controls,
      },
    };

    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Failed to export data:', error);
    throw new Error('データのエクスポートに失敗しました');
  }
}

/**
 * 永続化対象データのインポート
 */
export function importPersistedData(jsonData: string): void {
  try {
    const data = JSON.parse(jsonData);

    if (data.player) {
      usePlayerStore.getState().loadPlayerData(data.player);
    }

    if (data.settings) {
      useSettingsStore.getState().loadSettings(data.settings);
    }
  } catch (error) {
    console.error('Failed to import data:', error);
    throw new Error('データのインポートに失敗しました');
  }
}