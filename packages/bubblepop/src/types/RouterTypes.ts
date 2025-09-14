/**
 * ルーティング関連の型定義
 */

/**
 * ゲームプレイ画面のルートパラメータ
 */
export interface GamePageParams {
  stageId: string;
}

/**
 * ヘルプ詳細画面のルートパラメータ
 */
export interface HelpDetailPageParams {
  category: string;
  topic: string;
}

/**
 * アイテム詳細画面のルートパラメータ
 */
export interface ItemDetailPageParams {
  itemId: string;
}

/**
 * ナビゲーションアイテムの型定義
 */
export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
}

/**
 * ルート定義の型
 */
export interface RouteDefinition {
  path: string;
  element: React.ReactElement;
  title?: string;
  requiresAuth?: boolean;
}

/**
 * ページ遷移時のステート
 */
export interface LocationState {
  from?: string;
  returnTo?: string;
  data?: Record<string, unknown>;
}