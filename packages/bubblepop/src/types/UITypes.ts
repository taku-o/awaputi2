// UI状態管理関連の型定義

// 通知関連
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement' | 'levelup' | 'challenge' | 'system';
  message: string;
  title?: string;
  timestamp: number;
  duration?: number;
  priority: 'high' | 'medium' | 'low';
  category: 'challenges' | 'achievements' | 'system';
  isRead?: boolean;
  data?: NotificationData;
}

export interface NotificationData {
  achievementId?: string;
  achievementName?: string;
  rewardAP?: number;
  newLevel?: number;
  previousLevel?: number;
  unlockedFeatures?: string[];
  challengeId?: string;
  challengeName?: string;
  challengeReward?: string;
  stageId?: string;
  stageName?: string;
}

export interface NotificationSettings {
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

// ローディング状態
export interface LoadingState {
  isGameLoading: boolean;
  isDataLoading: boolean;
  isAssetLoading?: boolean;
  isSaving?: boolean;
  loadingMessage?: string;
}

// フォーカス管理
export interface FocusState {
  currentElement: string | null;
  focusHistory: string[];
  isFocusVisible: boolean;
  focusMode: 'mouse' | 'keyboard' | 'auto';
}

// ダイアログ関連
export type DialogType = 
  | 'confirm'
  | 'alert'
  | 'itemDetail'
  | 'purchaseResult'
  | 'levelUpNotification'
  | 'achievementNotification';

// ページタイプ
export type PageType = 
  | 'title'
  | 'main'
  | 'gameplay'
  | 'result'
  | 'shop'
  | 'settings'
  | 'help'
  | 'account';

// トースト通知
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
  position: 'top' | 'bottom' | 'center';
}

// アニメーション状態
export interface AnimationState {
  isAnimating: boolean;
  animationType: 'slideIn' | 'slideOut' | 'fadeIn' | 'fadeOut' | 'scaleIn' | 'scaleOut';
  duration: number;
  easing: 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
}