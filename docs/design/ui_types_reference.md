# UITypes.ts 参考資料

## 概要

Phase 6のデータ構造とストア実装で必要なUITypes.tsファイルの型定義を、既存のドキュメントから抽出・整理した資料です。

## 基本UI状態型

### UIState インターフェース

```typescript
interface UIState {
  // 現在のページ
  currentPage: string;
  
  // モーダル・ダイアログ状態
  modals: ModalState;
  
  // 通知状態
  notifications: Notification[];
  
  // ローディング状態
  loading: LoadingState;
  
  // フォーカス管理
  focus: FocusState;
}
```

## 詳細型定義

### ModalState

```typescript
interface ModalState {
  isHelpOpen: boolean;
  isSettingsOpen: boolean;
  isShopOpen: boolean;
  isAccountOpen: boolean;
}
```

### Notification

通知システムの詳細仕様（docs/planning/notification_system.md）より：

```typescript
interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement' | 'levelup' | 'challenge' | 'system';
  message: string;
  title?: string;
  timestamp: number;
  duration?: number; // 表示時間（ミリ秒）
  priority: 'high' | 'medium' | 'low';
  category: 'challenges' | 'achievements' | 'system';
  isRead?: boolean;
  data?: NotificationData;
}

interface NotificationData {
  // 実績通知用データ
  achievementId?: string;
  achievementName?: string;
  rewardAP?: number;
  
  // レベルアップ通知用データ
  newLevel?: number;
  previousLevel?: number;
  unlockedFeatures?: string[];
  
  // チャレンジ通知用データ
  challengeId?: string;
  challengeName?: string;
  challengeReward?: string;
  
  // ステージ解放通知用データ
  stageId?: string;
  stageName?: string;
}
```

### LoadingState

```typescript
interface LoadingState {
  isGameLoading: boolean;
  isDataLoading: boolean;
  isAssetLoading?: boolean;
  isSaving?: boolean;
  loadingMessage?: string;
}
```

### FocusState

```typescript
interface FocusState {
  currentElement: string | null;
  focusHistory: string[];
  isFocusVisible: boolean;
  focusMode: 'mouse' | 'keyboard' | 'auto';
}
```

## 通知設定型

### NotificationSettings

```typescript
interface NotificationSettings {
  challenges: {
    enabled: boolean;
    newChallenge: boolean;
    challengeComplete: boolean;
  };
  achievements: {
    enabled: boolean;
    unlocked: boolean;
    progress: boolean;
    rare: boolean;
  };
  system: {
    enabled: boolean;
  };
}
```

## UI操作関連型

### DialogType

```typescript
type DialogType = 
  | 'confirm'
  | 'alert'
  | 'itemDetail'
  | 'purchaseResult'
  | 'levelUpNotification'
  | 'achievementNotification';
```

### PageType

```typescript
type PageType = 
  | 'title'
  | 'main'
  | 'gameplay'
  | 'result'
  | 'shop'
  | 'settings'
  | 'help'
  | 'account';
```

### ToastType

```typescript
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
  position: 'top' | 'bottom' | 'center';
}
```

## アニメーション関連型

### AnimationState

```typescript
interface AnimationState {
  isAnimating: boolean;
  animationType: 'slideIn' | 'slideOut' | 'fadeIn' | 'fadeOut' | 'scaleIn' | 'scaleOut';
  duration: number;
  easing: 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
}
```

## 参考ドキュメント

- `docs/design/app_state_management.md` - UIState基本定義
- `docs/planning/notification_system.md` - 通知システム詳細仕様
- `docs/design/class_tree.md` - コンポーネント構造
- `docs/design/component_list.md` - UIコンポーネント一覧

## 実装時の注意点

1. **通知の優先度管理**: 高優先度の通知を優先表示
2. **同時表示制限**: 最大3つの通知を同時表示
3. **フォーカス管理**: キーボードナビゲーション対応
4. **アクセシビリティ**: スクリーンリーダー対応
5. **パフォーマンス**: 通知オブジェクトの適切な管理