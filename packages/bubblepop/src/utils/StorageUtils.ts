import { PlayerState, SettingsState } from '../types/StoreTypes';

/**
 * 永続化データの構造
 */
export interface PersistentData {
  version: string;
  playerData: PlayerState;
  settings: SettingsState;
  lastSaved: string;
}

/**
 * ローカルストレージのキー
 */
const STORAGE_KEYS = {
  PLAYER_DATA: 'bubblepop:player',
  SETTINGS: 'bubblepop:settings',
  VERSION: 'bubblepop:version',
} as const;

/**
 * 現在のデータバージョン
 */
const CURRENT_VERSION = '1.0.0';

/**
 * ストレージ管理クラス
 */
export class StorageManager {
  /**
   * プレイヤーデータを保存
   */
  static savePlayerData(data: PlayerState): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEYS.PLAYER_DATA, serialized);
      localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
    } catch (error) {
      console.error('Failed to save player data:', error);
      throw new Error('プレイヤーデータの保存に失敗しました');
    }
  }

  /**
   * プレイヤーデータを読み込み
   */
  static loadPlayerData(): PlayerState | null {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.PLAYER_DATA);
      if (!serialized) {
        return null;
      }
      return JSON.parse(serialized) as PlayerState;
    } catch (error) {
      console.error('Failed to load player data:', error);
      return null;
    }
  }

  /**
   * 設定データを保存
   */
  static saveSettings(settings: SettingsState): void {
    try {
      const serialized = JSON.stringify(settings);
      localStorage.setItem(STORAGE_KEYS.SETTINGS, serialized);
      localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw new Error('設定の保存に失敗しました');
    }
  }

  /**
   * 設定データを読み込み
   */
  static loadSettings(): SettingsState | null {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!serialized) {
        return null;
      }
      return JSON.parse(serialized) as SettingsState;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  /**
   * すべてのデータをクリア
   */
  static clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.PLAYER_DATA);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.VERSION);
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw new Error('データのクリアに失敗しました');
    }
  }

  /**
   * 保存されたデータのバージョンを取得
   */
  static getVersion(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.VERSION);
    } catch (error) {
      console.error('Failed to get version:', error);
      return null;
    }
  }

  /**
   * すべてのデータを一括で保存
   */
  static saveAll(playerData: PlayerState, settings: SettingsState): void {
    try {
      StorageManager.savePlayerData(playerData);
      StorageManager.saveSettings(settings);
    } catch (error) {
      console.error('Failed to save all data:', error);
      throw new Error('データの一括保存に失敗しました');
    }
  }

  /**
   * すべてのデータを一括で読み込み
   */
  static loadAll(): PersistentData | null {
    try {
      const playerData = StorageManager.loadPlayerData();
      const settings = StorageManager.loadSettings();
      const version = StorageManager.getVersion() || CURRENT_VERSION;

      if (!playerData || !settings) {
        return null;
      }

      return {
        version,
        playerData,
        settings,
        lastSaved: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to load all data:', error);
      return null;
    }
  }

  /**
   * ストレージが利用可能かチェック
   */
  static isStorageAvailable(): boolean {
    try {
      const testKey = '__bubblepop_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * ストレージの使用容量を取得（概算）
   */
  static getStorageSize(): number {
    let size = 0;
    for (const key in localStorage) {
      if (key.startsWith('bubblepop:')) {
        const value = localStorage.getItem(key);
        if (value) {
          size += value.length + key.length;
        }
      }
    }
    return size;
  }
}