# Design Document

## Overview

Phase 6では、BubblePopアプリケーションのデータ構造とストア機能を設計・実装します。Zustandを使用した軽量で型安全な状態管理システムを構築し、ローカルストレージによるデータ永続化機能を提供します。

## Architecture

### 状態管理アーキテクチャ

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React         │    │   Zustand       │    │ LocalStorage    │
│   Components    │◄──►│   Stores        │◄──►│   Persistence   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Custom        │    │   State         │    │   Storage       │
│   Hooks         │    │   Actions       │    │   Utils         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### ストア分割戦略

1. **PlayerStore**: ユーザーデータ（レベル、経験値、AP、TAP、統計）
2. **SettingsStore**: 設定データ（音量、グラフィック、言語、コントロール）
3. **UIStore**: UI状態（モーダル、通知、ローディング、フォーカス）

## Components and Interfaces

### 型定義構造

```typescript
// packages/bubblepop/src/types/index.ts
export * from './GameTypes';
export * from './StoreTypes';
export * from './UITypes';

// packages/bubblepop/src/types/StoreTypes.ts
export interface PlayerState {
  userId: string;
  username: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  ap: number;
  tap: number;
  totalScore: number;
  highScore: number;
  gamesPlayed: number;
  totalBubblesPopped: number;
  createdAt: string;
  lastPlayedAt: string;
}

export interface SettingsState {
  audio: AudioSettings;
  graphics: GraphicsSettings;
  gameplay: GameplaySettings;
  language: 'ja' | 'en';
  controls: ControlSettings;
}

export interface UIState {
  currentPage: string;
  modals: ModalState;
  notifications: Notification[];
  loading: LoadingState;
  focus: FocusState;
}
```

### ストア実装構造

```typescript
// packages/bubblepop/src/stores/PlayerStore.ts
interface PlayerStore extends PlayerState {
  // Actions
  updateUsername: (username: string) => void;
  updateLevel: (level: number, experience: number) => void;
  updateAP: (ap: number) => void;
  updateTAP: (tap: number) => void;
  updateStatistics: (stats: Partial<PlayerStatistics>) => void;
  loadPlayerData: (data: PlayerState) => void;
  resetPlayerData: () => void;
}

// packages/bubblepop/src/stores/SettingsStore.ts
interface SettingsStore extends SettingsState {
  // Actions
  updateAudioSettings: (audio: Partial<AudioSettings>) => void;
  updateGraphicsSettings: (graphics: Partial<GraphicsSettings>) => void;
  updateLanguage: (language: 'ja' | 'en') => void;
  loadSettings: (settings: SettingsState) => void;
  resetSettings: () => void;
}
```

### 永続化システム

```typescript
// packages/bubblepop/src/utils/StorageUtils.ts
export interface PersistentData {
  version: string;
  playerData: PlayerState;
  settings: SettingsState;
  lastSaved: string;
}

export class StorageManager {
  static savePlayerData(data: PlayerState): void;
  static loadPlayerData(): PlayerState | null;
  static saveSettings(settings: SettingsState): void;
  static loadSettings(): SettingsState | null;
  static clearAllData(): void;
}
```

## Data Models

### プレイヤーデータモデル

```typescript
interface PlayerState {
  // 基本情報
  userId: string;           // ユーザー識別子
  username: string;         // ユーザー名
  level: number;           // 現在のレベル
  experience: number;      // 現在の経験値
  experienceToNextLevel: number; // 次のレベルまでの必要経験値
  
  // 通貨
  ap: number;              // 現在の所持AP
  tap: number;             // 累計TAP
  
  // ゲーム統計
  totalScore: number;      // 累計総スコア
  highScore: number;       // 最高スコア
  gamesPlayed: number;     // 総プレイ回数
  totalBubblesPopped: number; // 累計割った泡の数
  
  // タイムスタンプ
  createdAt: string;       // アカウント作成日時
  lastPlayedAt: string;    // 最終プレイ日時
}
```

### 設定データモデル

```typescript
interface SettingsState {
  audio: {
    masterVolume: number;    // マスター音量 (0-100)
    bgmVolume: number;       // BGM音量 (0-100)
    sfxVolume: number;       // 効果音音量 (0-100)
    isMuted: boolean;        // ミュート状態
  };
  graphics: {
    quality: 'auto' | 'low' | 'medium' | 'high' | 'ultra';
    particleEffects: boolean;
    screenShake: boolean;
    showDamageNumbers: boolean;
    reducedMotion: boolean;
  };
  gameplay: {
    difficulty: 'normal';
    autoSave: boolean;
    showTutorialHints: boolean;
    confirmPurchases: boolean;
  };
  language: 'ja' | 'en';
  controls: {
    mouseButton: 'left' | 'right';
    keyBindings: Record<string, string | string[]>;
  };
}
```

### UI状態モデル

```typescript
interface UIState {
  currentPage: string;
  modals: {
    isHelpOpen: boolean;
    isSettingsOpen: boolean;
    isShopOpen: boolean;
    isAccountOpen: boolean;
  };
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: number;
  }>;
  loading: {
    isGameLoading: boolean;
    isDataLoading: boolean;
  };
  focus: {
    currentElement: string | null;
    focusHistory: string[];
  };
}
```

## Error Handling

### ストアエラーハンドリング

1. **状態更新エラー**: 不正な値の場合はエラーログを出力し、例外を発生させる
2. **永続化エラー**: ローカルストレージ保存失敗時は例外を発生させる
3. **読み込みエラー**: データが存在しない場合はデフォルト値で初期化

### バリデーション

```typescript
// 値の妥当性チェック
const validatePlayerData = (data: Partial<PlayerState>): boolean => {
  if (data.level !== undefined && (data.level < 1 || data.level > 100)) {
    return false;
  }
  if (data.ap !== undefined && data.ap < 0) {
    return false;
  }
  return true;
};
```

## Testing Strategy

### 単体テスト

1. **ストアテスト**: 各ストアのアクションと状態更新をテスト
2. **永続化テスト**: ローカルストレージの保存・読み込み機能をテスト
3. **バリデーションテスト**: データ検証ロジックをテスト

### テストファイル構成

```
packages/bubblepop/src/
├── stores/
│   ├── __tests__/
│   │   ├── PlayerStore.test.ts
│   │   ├── SettingsStore.test.ts
│   │   └── UIStore.test.ts
├── utils/
│   └── __tests__/
│       └── StorageUtils.test.ts
```

### テストケース例

```typescript
// PlayerStore.test.ts
describe('PlayerStore', () => {
  test('should update username correctly', () => {
    const store = usePlayerStore.getState();
    store.updateUsername('TestUser');
    expect(store.username).toBe('TestUser');
  });
  
  test('should calculate experience to next level', () => {
    const store = usePlayerStore.getState();
    store.updateLevel(5, 1000);
    expect(store.experienceToNextLevel).toBeGreaterThan(0);
  });
});
```

この設計により、型安全で保守性の高いデータ管理システムを構築できます。