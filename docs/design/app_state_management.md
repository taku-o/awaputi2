# BubblePop アプリケーション状態管理方針

## 概要
BubblePopアプリケーションにおける状態管理の統一的な方針を定義します。アプリケーション全体で共有・管理されるデータの扱い方、更新ルール、永続化方針を明確にします。

## 採用する状態管理の技術/ライブラリ

### メイン状態管理ライブラリ
- **Zustand**: 軽量で高性能な状態管理ライブラリ
- **理由**: 
  - TypeScriptとの親和性が高い
  - 学習コストが低い
  - パフォーマンスが優れている
  - React Hooksとの統合が容易

### 補助的な状態管理
- **React useState**: コンポーネント固有のローカル状態
- **React useReducer**: 複雑なローカル状態の管理
- **カスタムフック**: 状態管理ロジックの再利用

## グローバルステートの定義

### ストア構成
以下の5つのストアに分割して管理します：

#### 1. PlayerStore（プレイヤーデータ）
```typescript
interface PlayerState {
  // 基本情報
  userId: string;
  username: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  
  // 通貨
  ap: number;  // 現在の所持AP
  tap: number; // 累計TAP
  
  // ゲーム統計
  totalScore: number;
  highScore: number;
  gamesPlayed: number;
  totalBubblesPopped: number;
  
  // タイムスタンプ
  createdAt: string;
  lastPlayedAt: string;
}
```

#### 2. GameStore（ゲーム状態）
```typescript
interface GameState {
  // 現在のセッション
  currentSession: GameSession | null;
  
  // ステージ進行状況
  stageProgress: Record<string, StageProgress>;
  
  // 実績データ
  achievements: Record<string, AchievementProgress>;
  
  // 所持アイテム
  ownedItems: OwnedItem[];
  
  // 統計データ
  statistics: PlayerStatistics;
}
```

#### 3. SettingsStore（設定データ）
```typescript
interface SettingsState {
  // 音響設定
  audio: {
    masterVolume: number;
    bgmVolume: number;
    sfxVolume: number;
    isMuted: boolean;
  };
  
  // グラフィック設定
  graphics: {
    quality: 'auto' | 'low' | 'medium' | 'high' | 'ultra';
    particleEffects: boolean;
    screenShake: boolean;
    showDamageNumbers: boolean;
    reducedMotion: boolean;
  };
  
  // ゲームプレイ設定
  gameplay: {
    difficulty: 'normal';
    autoSave: boolean;
    showTutorialHints: boolean;
    confirmPurchases: boolean;
  };
  
  // 言語設定
  language: 'ja' | 'en';
  
  // コントロール設定
  controls: {
    mouseButton: 'left' | 'right';
    keyBindings: Record<string, string | string[]>;
  };
}
```

#### 4. UIStore（UI状態）
```typescript
interface UIState {
  // 現在のページ
  currentPage: string;
  
  // モーダル・ダイアログ状態
  modals: {
    isHelpOpen: boolean;
    isSettingsOpen: boolean;
    isShopOpen: boolean;
    isAccountOpen: boolean;
  };
  
  // 通知状態
  notifications: Notification[];
  
  // ローディング状態
  loading: {
    isGameLoading: boolean;
    isDataLoading: boolean;
  };
  
  // フォーカス管理
  focus: {
    currentElement: string | null;
    focusHistory: string[];
  };
}
```

#### 5. AudioStore（音響状態）
```typescript
interface AudioState {
  // 音響システム状態
  isInitialized: boolean;
  currentBGM: string | null;
  
  // 音量設定（SettingsStoreと同期）
  volumes: {
    master: number;
    bgm: number;
    sfx: number;
  };
  
  // ミュート状態
  isMuted: boolean;
  
  // 再生中の音響
  playingSounds: Set<string>;
}
```

## 状態の更新ルール

### 基本原則
1. **単一責任**: 各ストアは明確に定義された責任範囲を持つ
2. **不変性**: 状態の更新時は新しいオブジェクトを作成
3. **型安全性**: TypeScriptによる厳密な型チェック
4. **予測可能性**: 同じ入力に対して常に同じ結果

### 更新パターン

#### 1. 直接更新（シンプルな値）
```typescript
// PlayerStore
const updateUsername = (username: string) => {
  set((state) => ({
    ...state,
    username
  }));
};
```

#### 2. 複合更新（複数の値を同時に更新）
```typescript
// PlayerStore
const levelUp = (newLevel: number, newExperience: number) => {
  set((state) => ({
    ...state,
    level: newLevel,
    experience: newExperience,
    experienceToNextLevel: calculateExperienceToNext(newLevel)
  }));
};
```

#### 3. 配列・オブジェクトの更新
```typescript
// GameStore
const addAchievement = (achievement: AchievementProgress) => {
  set((state) => ({
    ...state,
    achievements: {
      ...state.achievements,
      [achievement.id]: achievement
    }
  }));
};
```

#### 4. 非同期更新（API呼び出し後）
```typescript
// PlayerStore
const loadPlayerData = async () => {
  try {
    const data = await fetchPlayerData();
    set((state) => ({
      ...state,
      ...data
    }));
  } catch (error) {
    console.error('プレイヤーデータ読み込みエラー:', error);
    throw error;
  }
};
```

### 状態更新の制約
1. **直接変更禁止**: 既存の状態オブジェクトを直接変更しない
2. **バリデーション必須**: 更新前に値の妥当性をチェック
3. **エラーハンドリング**: 更新失敗時の適切な処理
4. **ログ出力**: 重要な状態変更のログ記録

## データの永続化方針

### 永続化対象データ
以下のデータをローカルストレージに永続化します：

#### 1. プレイヤーデータ（PlayerStore + GameStore）
```typescript
interface PersistentPlayerData {
  version: string;
  userData: PlayerState;
  stageProgress: Record<string, StageProgress>;
  achievements: Record<string, AchievementProgress>;
  ownedItems: OwnedItem[];
  statistics: PlayerStatistics;
  lastSaved: string;
}
```

#### 2. 設定データ（SettingsStore）
```typescript
interface PersistentSettingsData {
  audio: SettingsState['audio'];
  graphics: SettingsState['graphics'];
  gameplay: SettingsState['gameplay'];
  language: SettingsState['language'];
  controls: SettingsState['controls'];
}
```

### 永続化しないデータ
以下のデータは永続化しません：
- UI状態（UIStore）
- 音響状態（AudioStore）
- ゲームセッション（一時的なデータ）

### 永続化の実装

#### 1. 自動保存
```typescript
// プレイヤーデータの自動保存
const usePlayerDataPersistence = () => {
  const playerData = usePlayerStore();
  
  useEffect(() => {
    const saveData = {
      version: '1.0.0',
      userData: playerData,
      lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem('bubblePopPlayerData', JSON.stringify(saveData));
  }, [playerData]);
};
```

#### 2. 手動保存
```typescript
// 設定データの手動保存
const saveSettings = (settings: SettingsState) => {
  try {
    localStorage.setItem('bubblePopSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('設定保存エラー:', error);
    throw error;
  }
};
```

#### 3. データ読み込み
```typescript
// アプリケーション起動時のデータ読み込み
const loadPersistentData = () => {
  try {
    // プレイヤーデータ読み込み
    const playerDataStr = localStorage.getItem('bubblePopPlayerData');
    if (playerDataStr) {
      try {
        const playerData = JSON.parse(playerDataStr);
        usePlayerStore.getState().loadPlayerData(playerData);
      } catch (parseError) {
        console.error('プレイヤーデータの解析エラー:', parseError);
        // データ破損のため処理を終了
        throw new Error('プレイヤーデータが破損しています');
      }
    } else {
      // ファイルが存在しない場合はデフォルト値で初期化
      initializePlayerWithDefaults();
    }
    
    // 設定データ読み込み
    const settingsStr = localStorage.getItem('bubblePopSettings');
    if (settingsStr) {
      try {
        const settings = JSON.parse(settingsStr);
        useSettingsStore.getState().loadSettings(settings);
      } catch (parseError) {
        console.error('設定データの解析エラー:', parseError);
        // データ破損のため処理を終了
        throw new Error('設定データが破損しています');
      }
    } else {
      // ファイルが存在しない場合はデフォルト値で初期化
      initializeSettingsWithDefaults();
    }
  } catch (error) {
    console.error('データ読み込みエラー:', error);
    // ファイルを読めない場合やデータ破損の場合は処理を終了
    throw error;
  }
};
```

### データバージョン管理
```typescript
interface DataVersion {
  version: string;
  migrationRequired: boolean;
}

const checkDataVersion = (data: any): DataVersion => {
  const currentVersion = '1.0.0';
  const dataVersion = data.version || '0.0.0';
  
  return {
    version: dataVersion,
    migrationRequired: dataVersion !== currentVersion
  };
};
```

### エラーハンドリング
永続化時のエラーは以下の方針で処理します：

1. **保存エラー**: エラーログを出力し、処理を終了
2. **読み込みエラー**: 
   - ファイルが存在しない場合: デフォルト値で初期化
   - ファイルを読めない場合: エラーログを出力し、処理を終了
3. **データ破損**: エラーログを出力し、処理を終了

## 状態管理のベストプラクティス

### 1. ストア設計
- **単一責任**: 各ストアは明確な責任範囲を持つ
- **適切な粒度**: 過度に細分化せず、関連するデータは同じストアで管理
- **依存関係の最小化**: ストア間の依存関係を最小限に抑制

### 2. パフォーマンス最適化
- **選択的購読**: 必要な状態のみを購読
- **メモ化**: 計算コストの高い値のメモ化
- **バッチ更新**: 複数の状態変更を一括処理

### 3. デバッグ・開発支援
- **開発者ツール**: Zustand DevToolsの活用
- **ログ出力**: 重要な状態変更のログ記録
- **型安全性**: TypeScriptによる厳密な型チェック

### 4. テスト容易性
- **純粋関数**: 状態更新ロジックを純粋関数として実装
- **モック化**: 外部依存のモック化
- **分離**: ビジネスロジックとUIロジックの分離

この状態管理方針により、BubblePopアプリケーションの保守性、拡張性、パフォーマンスを確保します。
