# BubblePop 技術スタック

## アーキテクチャ概要

### アプリケーション構成
- **アプリケーションタイプ**: Single Page Application (SPA)
- **フロントエンド**: React 18.2.0 + TypeScript 5.9.2
- **ゲームエンジン**: Phaser（ゲームプレイ画面のみ）
- **UI描画**: HTML + React（ゲームプレイ画面以外）
- **UIコンポーネント**: MUI (Material-UI) 5.14.0
- **コンポーネント管理**: StoryBook 8.0.0
- **モノリポジトリ管理**: Lerna 8.2.3 + npm workspaces
- **ビルドツール**: Vite 4.4.5
- **状態管理**: Zustand 5.0.8
- **多言語対応**: react-i18next + i18next
- **テスト**: Jest 29.7.0 (単体) + Playwright 1.55.0 (E2E)

## パッケージ構成

### メインパッケージ
- **@bubblepop/app**: メインゲームアプリケーション
- **@bubblepop/ui-library**: 共通UIコンポーネントライブラリ
- **@bubblepop/storybook-docs**: StoryBook設定とストーリーファイル

### 依存関係

#### コアライブラリ
- **React**: 18.2.0 - UIフレームワーク
- **TypeScript**: 5.9.2 - 型安全性
- **Vite**: 4.4.5 - ビルドツール
- **Zustand**: 5.0.8 - 状態管理

#### UI・スタイリング
- **@mui/material**: 5.14.0 - Material-UIコンポーネント
- **@mui/system**: 5.14.0 - MUIシステム
- **@emotion/react**: 11.11.0 - CSS-in-JS
- **@emotion/styled**: 11.11.0 - スタイルコンポーネント

#### テスト
- **Jest**: 29.7.0 - 単体テスト
- **@testing-library/react**: 14.0.0 - Reactテスト
- **@testing-library/jest-dom**: 6.1.3 - DOMテスト
- **Playwright**: 1.55.0 - E2Eテスト

#### 開発ツール
- **ESLint**: 8.57.1 - リンター
- **Prettier**: 3.6.2 - コードフォーマッター
- **Lerna**: 8.2.3 - モノリポジトリ管理
- **StoryBook**: 8.0.0 - コンポーネント開発

## 技術スタック詳細

### フロントエンド技術

#### React + TypeScript
- **React 18.2.0**: 最新のReact機能を活用
- **TypeScript 5.9.2**: 型安全性による開発効率向上
- **JSX**: Reactコンポーネントの記述
- **Hooks**: 関数コンポーネントでの状態管理

#### 状態管理
- **Zustand 5.0.8**: 軽量で高性能な状態管理
- **ローカルストレージ**: データの永続化
- **型安全なストア**: TypeScriptによる型定義

#### UIコンポーネント
- **MUI (Material-UI) 5.14.0**: 統一されたデザインシステム
- **カスタムコンポーネント**: ゲーム固有のUI要素
- **レスポンシブデザイン**: 様々な画面サイズに対応

### ゲームエンジン

#### Phaser（将来実装予定）
- **高性能2D描画**: WebGL/Canvas2Dの自動選択
- **物理演算**: Arcade Physics, Matter.js
- **アニメーション**: スプライトアニメーション
- **音響管理**: ゲーム内音響
- **入力処理**: マウス・タッチ入力
- **パーティクルシステム**: 視覚効果

### ビルド・開発環境

#### Vite
- **高速ビルド**: ESBuildによる高速バンドリング
- **HMR**: ホットモジュールリロード
- **TypeScript対応**: ネイティブTypeScriptサポート
- **プラグインシステム**: 拡張可能なアーキテクチャ

#### モノリポジトリ
- **Lerna 8.2.3**: パッケージ管理
- **npm workspaces**: 依存関係の共有
- **統一されたビルド**: 全パッケージの一括ビルド
- **独立したデプロイ**: パッケージ単位でのデプロイ

### テスト戦略

#### 単体テスト
- **Jest 29.7.0**: テストランナー
- **React Testing Library**: コンポーネントテスト
- **カバレッジ**: テストカバレッジの測定
- **モック**: 外部依存関係のモック

#### E2Eテスト
- **Playwright 1.55.0**: ブラウザ自動化
- **マルチブラウザ**: Chrome, Firefox, Safari対応
- **視覚回帰テスト**: スクリーンショット比較
- **パフォーマンステスト**: ロード時間測定

### 品質管理

#### コード品質
- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマット
- **TypeScript**: 型チェック
- **Husky**: Gitフック

#### 継続的インテグレーション
- **GitHub Actions**: CI/CDパイプライン
- **自動テスト**: プルリクエスト時の自動テスト
- **自動デプロイ**: メインブランチへの自動デプロイ

## 開発環境

### 必要なツール
- **Node.js**: 18.x以上
- **npm**: 9.x以上
- **Git**: バージョン管理

### 開発コマンド
```bash
# 依存関係のインストール
npm run install-all

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm run test

# リント
npm run lint

# フォーマット
npm run format

# StoryBook起動
npm run storybook
```

### 環境変数
- **NODE_ENV**: 開発/本番環境の切り替え
- **VITE_APP_VERSION**: アプリケーションバージョン
- **VITE_APP_API_URL**: APIエンドポイント（将来実装）

## パフォーマンス最適化

### バンドル最適化
- **Tree Shaking**: 未使用コードの除去
- **Code Splitting**: 動的インポート
- **Lazy Loading**: 遅延読み込み
- **Bundle Analysis**: バンドルサイズ分析

### ランタイム最適化
- **React.memo**: 不要な再レンダリング防止
- **useMemo/useCallback**: 計算結果のメモ化
- **Virtual Scrolling**: 大量データの効率的描画
- **Image Optimization**: 画像の最適化

## セキュリティ

### フロントエンドセキュリティ
- **XSS対策**: 入力値のサニタイズ
- **CSRF対策**: トークンベース認証
- **Content Security Policy**: CSPヘッダー
- **HTTPS**: 暗号化通信

### データ保護
- **ローカルストレージ**: 機密データの暗号化
- **入力検証**: クライアントサイドバリデーション
- **エラーハンドリング**: 機密情報の漏洩防止

この技術スタックにより、保守性が高く、パフォーマンスに優れた、スケーラブルなWebアプリケーションを構築できます。