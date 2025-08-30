# BubblePop デバッグ機能

## 概要
このドキュメントでは、開発・デバッグ・動作確認用の機能について説明します。通常のゲームフローとは別のデバッグ用URLを提供し、各画面に直接アクセスできるようにします。

## デバッグ機能の目的
- **開発効率の向上**: 特定画面のテストを素早く実行
- **動作確認の簡素化**: ゲームフローを経由せずに画面を確認
- **デバッグ作業の効率化**: 問題のある画面への直接アクセス
- **UI/UXテスト**: 各画面の独立したテスト実行

## デバッグ用URL構成

### 基本構造
デバッグ用の機能は、ゲームの通常のURLとは別のトップページURLを提供します。

```
デバッグ用トップページ
├─ ゲームプレイ画面
├─ 設定画面
├─ ヘルプ画面
├─ アカウント情報画面
└─ ショップ画面
```

### 各画面への直接アクセス
1. **仮トップページ → ゲームプレイ画面**
   - 目的: ゲームプレイの動作確認
   - 用途: ゲームロジックのテスト、パフォーマンス測定

2. **仮トップページ → 設定画面**
   - 目的: 設定機能の動作確認
   - 用途: 設定項目のテスト、UIの動作確認

3. **仮トップページ → ヘルプ画面**
   - 目的: ヘルプシステムの動作確認
   - 用途: ヘルプ内容の表示テスト、ナビゲーション確認

4. **仮トップページ → アカウント情報画面**
   - 目的: アカウント機能の動作確認
   - 用途: データ表示のテスト、統計情報の確認

5. **仮トップページ → ショップ画面**
   - 目的: ショップ機能の動作確認
   - 用途: アイテム表示のテスト、購入フローの確認

## 技術実装

### アプリケーション分離設計
コードの品質が相当悪い想定、ビルドが通らないのも普通ぐらいの想定のため、**バイナリを極力切り離す**設計を採用します。

#### アプリケーション構成
```
本番アプリ: my-react-app (ポート3000)
├─ デバッグ用ゲームプレイ: my-react-app-debug-game (ポート8001)
├─ デバッグ用設定画面: my-react-app-debug-settings (ポート8002)
├─ デバッグ用ヘルプ画面: my-react-app-debug-help (ポート8003)
├─ デバッグ用アカウント: my-react-app-debug-account (ポート8004)
└─ デバッグ用ショップ: my-react-app-debug-shop (ポート8005)
```

#### ポート分離
- **本番アプリ**: `http://localhost:3000/`
- **デバッグ用ゲームプレイ**: `http://localhost:8001/`
- **デバッグ用設定画面**: `http://localhost:8002/`
- **デバッグ用ヘルプ画面**: `http://localhost:8003/`
- **デバッグ用アカウント**: `http://localhost:8004/`
- **デバッグ用ショップ**: `http://localhost:8005/`

### ビルド構成
- **本番ビルド**: `my-react-app` - ゲーム用のメインビルドファイル
- **デバッグビルド**: 各デバッグ機能用の独立したビルドファイル
- **完全分離**: デバッグコードとゲームコードの完全な分離

#### ビルドファイル構成
```bash
# 本番アプリ
my-react-app/
├─ dist/                    # 本番ビルドファイル
├─ src/                     # 本番ソースコード
└─ package.json

# デバッグ用アプリ（各画面）
my-react-app-debug-game/
├─ dist/                    # ゲームプレイ画面デバッグビルド
├─ src/                     # ゲームプレイ画面デバッグコード
└─ package.json

my-react-app-debug-settings/
├─ dist/                    # 設定画面デバッグビルド
├─ src/                     # 設定画面デバッグコード
└─ package.json

# ... 他のデバッグアプリも同様
```

### ルーティング構成
各デバッグアプリは、本番アプリの画面遷移パターンに合わせて実装します。

#### 本番アプリの画面遷移例
```
http://localhost:3000/ -> 
http://localhost:3000/top -> 
http://localhost:3000/game
```

#### デバッグアプリの画面遷移例
```
http://localhost:8001/ -> (遷移のための情報をいろいろセットする)
http://localhost:8001/game
```

#### デバッグ用ルーティング（各アプリ独立）
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
```

### デバッグ用コンポーネント（各アプリ独立）
各デバッグアプリは独立したコンポーネントセットを持ちます：

- **DebugGameTopPage**: ゲームプレイ画面デバッグ用トップページ
- **DebugSettingsTopPage**: 設定画面デバッグ用トップページ
- **DebugHelpTopPage**: ヘルプ画面デバッグ用トップページ
- **DebugAccountTopPage**: アカウント画面デバッグ用トップページ
- **DebugShopTopPage**: ショップ画面デバッグ用トップページ

## 開発環境での利用

### 開発サーバー起動（各アプリ独立）
各デバッグアプリは独立したプロジェクトとして起動します：

```bash
# 本番アプリ
cd my-react-app
npm run dev          # http://localhost:3000/

# デバッグ用ゲームプレイアプリ
cd my-react-app-debug-game
npm run dev          # http://localhost:8001/

# デバッグ用設定アプリ
cd my-react-app-debug-settings
npm run dev          # http://localhost:8002/

# デバッグ用ヘルプアプリ
cd my-react-app-debug-help
npm run dev          # http://localhost:8003/

# デバッグ用アカウントアプリ
cd my-react-app-debug-account
npm run dev          # http://localhost:8004/

# デバッグ用ショップアプリ
cd my-react-app-debug-shop
npm run dev          # http://localhost:8005/
```

### ビルドコマンド（各アプリ独立）
各アプリは独立してビルドされます：

```bash
# 本番アプリ
cd my-react-app
npm run build        # dist/ に本番ビルドファイル

# デバッグ用ゲームプレイアプリ
cd my-react-app-debug-game
npm run build        # dist/ にゲームプレイデバッグビルドファイル

# デバッグ用設定アプリ
cd my-react-app-debug-settings
npm run build        # dist/ に設定画面デバッグビルドファイル

# ... 他のデバッグアプリも同様
```

### 環境変数（各アプリ独立）
各アプリは独立した環境変数ファイルを持ちます：

```bash
# my-react-app/.env.development
VITE_APP_TYPE=production
VITE_API_BASE_URL=http://localhost:3000

# my-react-app-debug-game/.env.development
VITE_APP_TYPE=debug-game
VITE_DEBUG_PORT=8001
VITE_TARGET_SCREEN=game

# my-react-app-debug-settings/.env.development
VITE_APP_TYPE=debug-settings
VITE_DEBUG_PORT=8002
VITE_TARGET_SCREEN=settings

# ... 他のデバッグアプリも同様
```

## セキュリティ・制限事項

### アクセス制限
- **開発中**: アクセス制限なし
- **本番環境**: デバッグアプリは完全に分離されているため、本番環境には存在しない
- **ポート分離**: 各デバッグアプリは独立したポートで動作

### 注意事項
- デバッグ機能は開発・テスト目的でのみ使用
- 本番環境ではデバッグアプリを起動しない
- デバッグ用URLは公開しない
- 各デバッグアプリは独立したプロジェクトとして管理

## デバッグ機能の利点

### 開発効率
- **画面テストの高速化**: 特定画面への直接アクセス
- **問題の切り分け**: 画面単位での独立したテスト
- **UI/UX改善**: 各画面の独立した評価

### 品質向上
- **動作確認の徹底**: 全画面の個別テスト
- **バグの早期発見**: 画面固有の問題を素早く特定
- **ユーザビリティ向上**: 各画面の使いやすさを個別に検証

## 今後の拡張予定

### 追加予定機能
- **デバッグ用データ**: テスト用のプレイヤーデータ
- **パフォーマンス測定**: 各画面の読み込み時間測定
- **エラーシミュレーション**: 意図的なエラー状態の作成
- **ログ出力**: デバッグ情報の詳細ログ

### 開発ツール連携
- **React DevTools**: コンポーネント状態の確認
- **Redux DevTools**: 状態管理の可視化
- **Network Tab**: API通信の監視
- **Console**: エラーログの確認

## まとめ

デバッグ機能は、開発効率と品質向上を目的として提供されます。各画面への直接アクセスにより、ゲームフローを経由せずに画面単位でのテストが可能になり、開発・デバッグ作業が大幅に効率化されます。

本番環境では自動的に無効化されるため、セキュリティリスクはありません。開発中は積極的に活用し、高品質なゲームの開発に役立ててください。
