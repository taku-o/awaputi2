# Phase 8: デバッグアプリ基盤構築 - 要件定義書

## 概要
Phase 8では、開発・デバッグ・動作確認用のデバッグアプリ基盤を構築します。各画面への直接アクセスを可能にするデバッグ用トップページと、各デバッグアプリのルーティング設定を実装します。

## 背景
開発効率の向上と品質向上を目的として、ゲームフローを経由せずに各画面に直接アクセスできるデバッグ機能が必要です。これにより、特定画面のテストを素早く実行し、問題のある画面への直接アクセスが可能になります。

## 機能要件

### 1. デバッグ用トップページ実装

#### 1.1 基本機能
- デバッグ用トップページの表示
- 各デバッグアプリへのリンク提供
- 視覚的に分かりやすいUI設計

#### 1.2 表示内容
- ページタイトル: "BubblePop デバッグアプリ"
- 各デバッグアプリへのリンクボタン
- 各アプリの説明文
- ポート番号の表示

#### 1.3 デバッグアプリ一覧
以下のデバッグアプリへのリンクを提供：

1. **ゲームプレイデバッグアプリ**
   - URL: `http://localhost:8001/`
   - 説明: ゲームプレイ画面の動作確認
   - 用途: ゲームロジックのテスト、パフォーマンス測定

2. **設定画面デバッグアプリ**
   - URL: `http://localhost:8002/`
   - 説明: 設定機能の動作確認
   - 用途: 設定項目のテスト、UIの動作確認

3. **ヘルプ画面デバッグアプリ**
   - URL: `http://localhost:8003/`
   - 説明: ヘルプシステムの動作確認
   - 用途: ヘルプ内容の表示テスト、ナビゲーション確認

4. **アカウント情報画面デバッグアプリ**
   - URL: `http://localhost:8004/`
   - 説明: アカウント機能の動作確認
   - 用途: データ表示のテスト、統計情報の確認

5. **ショップ画面デバッグアプリ**
   - URL: `http://localhost:8005/`
   - 説明: ショップ機能の動作確認
   - 用途: アイテム表示のテスト、購入フローの確認

6. **通知機能デバッグアプリ**
   - URL: `http://localhost:8006/`
   - 説明: 通知システムの動作確認
   - 用途: 通知の発行テスト、通知表示の確認、通知設定のテスト

### 2. 各デバッグアプリのルーティング設定

#### 2.1 ルーティング構成
各デバッグアプリは独立したルーティング設定を持ちます：

```typescript
// デバッグ用ゲームプレイアプリ
const debugGameRoutes = [
  { path: '/', component: DebugGameTopPage },
  { path: '/game', component: GamePlayScreen }
];

// デバッグ用設定アプリ
const debugSettingsRoutes = [
  { path: '/', component: DebugSettingsTopPage },
  { path: '/settings', component: SettingsScreen }
];

// デバッグ用ヘルプアプリ
const debugHelpRoutes = [
  { path: '/', component: DebugHelpTopPage },
  { path: '/help', component: HelpScreen }
];

// デバッグ用アカウントアプリ
const debugAccountRoutes = [
  { path: '/', component: DebugAccountTopPage },
  { path: '/account', component: AccountScreen }
];

// デバッグ用ショップアプリ
const debugShopRoutes = [
  { path: '/', component: DebugShopTopPage },
  { path: '/shop', component: ShopScreen }
];

// デバッグ用通知アプリ
const debugNotificationRoutes = [
  { path: '/', component: DebugNotificationTopPage },
  { path: '/notification', component: NotificationScreen }
];
```

#### 2.2 デバッグ用トップページコンポーネント
各デバッグアプリは独立したトップページコンポーネントを持ちます：

- **DebugGameTopPage**: ゲームプレイ画面デバッグ用トップページ
- **DebugSettingsTopPage**: 設定画面デバッグ用トップページ
- **DebugHelpTopPage**: ヘルプ画面デバッグ用トップページ
- **DebugAccountTopPage**: アカウント画面デバッグ用トップページ
- **DebugShopTopPage**: ショップ画面デバッグ用トップページ
- **DebugNotificationTopPage**: 通知システムデバッグ用トップページ

## 技術要件

### 1. アプリケーション分離設計
- 各デバッグアプリは独立したプロジェクトとして管理
- 完全分離: デバッグコードとゲームコードの完全な分離
- バイナリを極力切り離す設計

### 2. ポート分離
- **本番アプリ**: `http://localhost:3000/`
- **デバッグ用ゲームプレイ**: `http://localhost:8001/`
- **デバッグ用設定画面**: `http://localhost:8002/`
- **デバッグ用ヘルプ画面**: `http://localhost:8003/`
- **デバッグ用アカウント**: `http://localhost:8004/`
- **デバッグ用ショップ**: `http://localhost:8005/`
- **デバッグ用通知**: `http://localhost:8006/`

### 3. ビルド構成
- 各デバッグアプリは独立したビルドファイルを持つ
- 本番ビルドとデバッグビルドの完全分離

### 4. 環境変数
各アプリは独立した環境変数ファイルを持つ：

```bash
# bubblepop-debug-game/.env.development
VITE_APP_TYPE=debug-game
VITE_DEBUG_PORT=8001
VITE_TARGET_SCREEN=game

# bubblepop-debug-settings/.env.development
VITE_APP_TYPE=debug-settings
VITE_DEBUG_PORT=8002
VITE_TARGET_SCREEN=settings
```

## 非機能要件

### 1. セキュリティ
- 開発中: アクセス制限なし
- 本番環境: デバッグアプリは完全に分離されているため、本番環境には存在しない
- ポート分離: 各デバッグアプリは独立したポートで動作

### 2. パフォーマンス
- 各デバッグアプリは独立して起動・停止可能
- 本番アプリに影響を与えない設計

### 3. 保守性
- 各デバッグアプリは独立したプロジェクトとして管理
- コードの重複を最小限に抑制

## 制約事項

### 1. 開発制約
- ドキュメントにない余計な機能は作らない
- 将来導入予定の機能、拡張予定の機能は考慮しない
- 最適化は不要
- フォールバック機能は不要

### 2. 技術制約
- 既存のプロジェクト構造を維持
- 既存の技術スタックを変更しない
- 既存のテストが失敗しないことを確認

## 受け入れ基準

### 1. デバッグ用トップページ
- デバッグ用トップページが表示される
- 各デバッグアプリへのリンクが機能する
- 視覚的に分かりやすいUIが実装されている

### 2. ルーティング設定
- 各デバッグアプリのルーティングが適切に設定される
- 各デバッグアプリのトップページが表示される
- 各デバッグアプリの対象画面に遷移できる

### 3. 技術要件
- 各デバッグアプリが独立したポートで動作する
- 本番アプリに影響を与えない
- 既存のテストが全て成功する

## 参考ドキュメント
- docs/planning/debug_features.md
- docs/design/development_steps_plan.md
- docs/planning/page_flow.md
- docs/planning/url_pattern.md
