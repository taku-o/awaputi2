# Phase 8: デバッグアプリ基盤構築 - タスクリスト

## 概要
Phase 8では、開発・デバッグ・動作確認用のデバッグアプリ基盤を構築します。各画面への直接アクセスを可能にするデバッグ用トップページと、各デバッグアプリのルーティング設定を実装します。

## タスク一覧

### 1. デバッグアプリの作成

#### 1.1 ゲームプレイデバッグアプリの作成
- [ ] **Task 1.1**: パッケージディレクトリの作成
  - ディレクトリ: `packages/bubblepop-debug-game/`
  - 内容: デバッグ用ゲームプレイアプリのディレクトリ構造を作成
  - 要件: [1.1 アクセス方法 - ゲームプレイデバッグアプリ](requirements.md#11-アクセス方法)
  - 受け入れ基準:
    - 必要なディレクトリが作成されている
    - 本番アプリと独立した構造になっている

- [ ] **Task 1.2**: package.jsonの作成
  - ファイル: `packages/bubblepop-debug-game/package.json`
  - 内容: デバッグ用ゲームプレイアプリの依存関係とスクリプトを定義
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - 必要な依存関係が定義されている
    - ポート8001で起動する設定になっている

- [ ] **Task 1.3**: Vite設定の作成
  - ファイル: `packages/bubblepop-debug-game/vite.config.ts`
  - 内容: ポート8001で起動するVite設定を作成
  - 要件: [3.2 ポート分離](requirements.md#32-ポート分離)
  - 受け入れ基準:
    - ポート8001で起動する設定になっている
    - 本番アプリと独立したビルド設定になっている

- [ ] **Task 1.4**: 環境変数設定の作成
  - ファイル: `packages/bubblepop-debug-game/.env.development`
  - 内容: デバッグ用ゲームプレイアプリの環境変数を設定
  - 要件: [3.4 環境変数](requirements.md#34-環境変数)
  - 受け入れ基準:
    - VITE_APP_TYPE=debug-gameが設定されている
    - VITE_DEBUG_PORT=8001が設定されている
    - VITE_TARGET_SCREEN=gameが設定されている

- [ ] **Task 1.5**: ルーティング設定の作成
  - ファイル: `packages/bubblepop-debug-game/src/router/Router.tsx`
  - 内容: デバッグ用ゲームプレイアプリのルーティング設定を作成
  - 要件: [2.1 ルーティング構成](requirements.md#21-ルーティング構成)
  - 受け入れ基準:
    - `/`でDebugGameTopPageが表示される
    - `/game`でGamePageが表示される

- [ ] **Task 1.6**: デバッグ用トップページコンポーネントの作成
  - ファイル: `packages/bubblepop-debug-game/src/pages/DebugGameTopPage.tsx`
  - 内容: ゲームプレイ画面への遷移を提供するトップページ
  - 要件: [2.2 デバッグ用トップページコンポーネント](requirements.md#22-デバッグ用トップページコンポーネント)
  - 受け入れ基準:
    - ゲームプレイ画面への遷移ボタンが表示される
    - ポート8001の情報が表示される

- [ ] **Task 1.7**: メインアプリケーションの作成
  - ファイル: `packages/bubblepop-debug-game/src/App.tsx`
  - 内容: デバッグ用ゲームプレイアプリのメインアプリケーション
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - ルーティングが正しく動作する
    - 本番アプリと独立したアプリケーションになっている

- [ ] **Task 1.8**: エントリーポイントの作成
  - ファイル: `packages/bubblepop-debug-game/src/main.tsx`
  - 内容: デバッグ用ゲームプレイアプリのエントリーポイント
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - アプリケーションが正しく起動する
    - 本番アプリと独立したエントリーポイントになっている

- [ ] **Task 1.9**: ゲームプレイデバッグアプリのテスト
  - 内容: ポート8001でゲームプレイデバッグアプリが起動することを確認
  - 要件: [1.1 各デバッグアプリへの直接アクセス](requirements.md#1-各デバッグアプリへの直接アクセス)
  - 受け入れ基準:
    - アプリが正しく起動する
    - トップページが表示される
    - ゲームプレイ画面に遷移できる

#### 2. 設定画面デバッグアプリの作成
- [ ] **Task 2.1**: パッケージディレクトリの作成
  - ディレクトリ: `packages/bubblepop-debug-settings/`
  - 内容: デバッグ用設定アプリのディレクトリ構造を作成
  - 要件: [1.1 アクセス方法 - 設定画面デバッグアプリ](requirements.md#11-アクセス方法)
  - 受け入れ基準:
    - 必要なディレクトリが作成されている
    - 本番アプリと独立した構造になっている

- [ ] **Task 2.2**: package.jsonの作成
  - ファイル: `packages/bubblepop-debug-settings/package.json`
  - 内容: デバッグ用設定アプリの依存関係とスクリプトを定義
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - 必要な依存関係が定義されている
    - ポート8002で起動する設定になっている

- [ ] **Task 2.3**: Vite設定の作成
  - ファイル: `packages/bubblepop-debug-settings/vite.config.ts`
  - 内容: ポート8002で起動するVite設定を作成
  - 要件: [3.2 ポート分離](requirements.md#32-ポート分離)
  - 受け入れ基準:
    - ポート8002で起動する設定になっている
    - 本番アプリと独立したビルド設定になっている

- [ ] **Task 2.4**: 環境変数設定の作成
  - ファイル: `packages/bubblepop-debug-settings/.env.development`
  - 内容: デバッグ用設定アプリの環境変数を設定
  - 要件: [3.4 環境変数](requirements.md#34-環境変数)
  - 受け入れ基準:
    - VITE_APP_TYPE=debug-settingsが設定されている
    - VITE_DEBUG_PORT=8002が設定されている
    - VITE_TARGET_SCREEN=settingsが設定されている

- [ ] **Task 2.5**: ルーティング設定の作成
  - ファイル: `packages/bubblepop-debug-settings/src/router/Router.tsx`
  - 内容: デバッグ用設定アプリのルーティング設定を作成
  - 要件: [2.1 ルーティング構成](requirements.md#21-ルーティング構成)
  - 受け入れ基準:
    - `/`でDebugSettingsTopPageが表示される
    - `/settings`でSettingsPageが表示される

- [ ] **Task 2.6**: デバッグ用トップページコンポーネントの作成
  - ファイル: `packages/bubblepop-debug-settings/src/pages/DebugSettingsTopPage.tsx`
  - 内容: 設定画面への遷移を提供するトップページ
  - 要件: [2.2 デバッグ用トップページコンポーネント](requirements.md#22-デバッグ用トップページコンポーネント)
  - 受け入れ基準:
    - 設定画面への遷移ボタンが表示される
    - ポート8002の情報が表示される

- [ ] **Task 2.7**: メインアプリケーションの作成
  - ファイル: `packages/bubblepop-debug-settings/src/App.tsx`
  - 内容: デバッグ用設定アプリのメインアプリケーション
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - ルーティングが正しく動作する
    - 本番アプリと独立したアプリケーションになっている

- [ ] **Task 2.8**: エントリーポイントの作成
  - ファイル: `packages/bubblepop-debug-settings/src/main.tsx`
  - 内容: デバッグ用設定アプリのエントリーポイント
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - アプリケーションが正しく起動する
    - 本番アプリと独立したエントリーポイントになっている

- [ ] **Task 2.9**: 設定画面デバッグアプリのテスト
  - 内容: ポート8002で設定画面デバッグアプリが起動することを確認
  - 要件: [1.1 各デバッグアプリへの直接アクセス](requirements.md#1-各デバッグアプリへの直接アクセス)
  - 受け入れ基準:
    - アプリが正しく起動する
    - トップページが表示される
    - 設定画面に遷移できる

#### 3. ヘルプ画面デバッグアプリの作成
- [ ] **Task 3.1**: パッケージディレクトリの作成
  - ディレクトリ: `packages/bubblepop-debug-help/`
  - 内容: デバッグ用ヘルプアプリのディレクトリ構造を作成
  - 要件: [1.1 アクセス方法 - ヘルプ画面デバッグアプリ](requirements.md#11-アクセス方法)
  - 受け入れ基準:
    - 必要なディレクトリが作成されている
    - 本番アプリと独立した構造になっている

- [ ] **Task 3.2**: package.jsonの作成
  - ファイル: `packages/bubblepop-debug-help/package.json`
  - 内容: デバッグ用ヘルプアプリの依存関係とスクリプトを定義
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - 必要な依存関係が定義されている
    - ポート8003で起動する設定になっている

- [ ] **Task 3.3**: Vite設定の作成
  - ファイル: `packages/bubblepop-debug-help/vite.config.ts`
  - 内容: ポート8003で起動するVite設定を作成
  - 要件: [3.2 ポート分離](requirements.md#32-ポート分離)
  - 受け入れ基準:
    - ポート8003で起動する設定になっている
    - 本番アプリと独立したビルド設定になっている

- [ ] **Task 3.4**: 環境変数設定の作成
  - ファイル: `packages/bubblepop-debug-help/.env.development`
  - 内容: デバッグ用ヘルプアプリの環境変数を設定
  - 要件: [3.4 環境変数](requirements.md#34-環境変数)
  - 受け入れ基準:
    - VITE_APP_TYPE=debug-helpが設定されている
    - VITE_DEBUG_PORT=8003が設定されている
    - VITE_TARGET_SCREEN=helpが設定されている

- [ ] **Task 3.5**: ルーティング設定の作成
  - ファイル: `packages/bubblepop-debug-help/src/router/Router.tsx`
  - 内容: デバッグ用ヘルプアプリのルーティング設定を作成
  - 要件: [2.1 ルーティング構成](requirements.md#21-ルーティング構成)
  - 受け入れ基準:
    - `/`でDebugHelpTopPageが表示される
    - `/help`でHelpPageが表示される

- [ ] **Task 3.6**: デバッグ用トップページコンポーネントの作成
  - ファイル: `packages/bubblepop-debug-help/src/pages/DebugHelpTopPage.tsx`
  - 内容: ヘルプ画面への遷移を提供するトップページ
  - 要件: [2.2 デバッグ用トップページコンポーネント](requirements.md#22-デバッグ用トップページコンポーネント)
  - 受け入れ基準:
    - ヘルプ画面への遷移ボタンが表示される
    - ポート8003の情報が表示される

- [ ] **Task 3.7**: メインアプリケーションの作成
  - ファイル: `packages/bubblepop-debug-help/src/App.tsx`
  - 内容: デバッグ用ヘルプアプリのメインアプリケーション
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - ルーティングが正しく動作する
    - 本番アプリと独立したアプリケーションになっている

- [ ] **Task 3.8**: エントリーポイントの作成
  - ファイル: `packages/bubblepop-debug-help/src/main.tsx`
  - 内容: デバッグ用ヘルプアプリのエントリーポイント
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
  - 受け入れ基準:
    - アプリケーションが正しく起動する
    - 本番アプリと独立したエントリーポイントになっている

- [ ] **Task 3.9**: ヘルプ画面デバッグアプリのテスト
  - 内容: ポート8003でヘルプ画面デバッグアプリが起動することを確認
  - 要件: [1.1 各デバッグアプリへの直接アクセス](requirements.md#1-各デバッグアプリへの直接アクセス)
  - 受け入れ基準:
    - アプリが正しく起動する
    - トップページが表示される
    - ヘルプ画面に遷移できる

#### 4. アカウント画面デバッグアプリの作成
- [ ] **Task 4.1**: パッケージディレクトリの作成
  - ディレクトリ: `packages/bubblepop-debug-account/`
  - 内容: デバッグ用アカウントアプリのディレクトリ構造を作成
  - 要件: [1.1 アクセス方法 - アカウント情報画面デバッグアプリ](requirements.md#11-アクセス方法)
  - 受け入れ基準:
    - 必要なディレクトリが作成されている
    - 本番アプリと独立した構造になっている

- [ ] **Task 4.2**: package.jsonの作成
  - ファイル: `packages/bubblepop-debug-account/package.json`
  - 内容: デバッグ用アカウントアプリの依存関係とスクリプトを定義
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - 必要な依存関係が定義されている
    - ポート8004で起動する設定になっている

- [ ] **Task 4.3**: Vite設定の作成
  - ファイル: `packages/bubblepop-debug-account/vite.config.ts`
  - 内容: ポート8004で起動するVite設定を作成
  - 受け入れ基準:
  - 要件: [3.2 ポート分離](requirements.md#32-ポート分離)
    - ポート8004で起動する設定になっている
    - 本番アプリと独立したビルド設定になっている

- [ ] **Task 4.4**: 環境変数設定の作成
  - ファイル: `packages/bubblepop-debug-account/.env.development`
  - 内容: デバッグ用アカウントアプリの環境変数を設定
  - 受け入れ基準:
  - 要件: [3.4 環境変数](requirements.md#34-環境変数)
    - VITE_APP_TYPE=debug-accountが設定されている
    - VITE_DEBUG_PORT=8004が設定されている
    - VITE_TARGET_SCREEN=accountが設定されている

- [ ] **Task 4.5**: ルーティング設定の作成
  - ファイル: `packages/bubblepop-debug-account/src/router/Router.tsx`
  - 内容: デバッグ用アカウントアプリのルーティング設定を作成
  - 受け入れ基準:
  - 要件: [2.1 ルーティング構成](requirements.md#21-ルーティング構成)
    - `/`でDebugAccountTopPageが表示される
    - `/account`でAccountPageが表示される

- [ ] **Task 4.6**: デバッグ用トップページコンポーネントの作成
  - ファイル: `packages/bubblepop-debug-account/src/pages/DebugAccountTopPage.tsx`
  - 内容: アカウント画面への遷移を提供するトップページ
  - 受け入れ基準:
  - 要件: [2.2 デバッグ用トップページコンポーネント](requirements.md#22-デバッグ用トップページコンポーネント)
    - アカウント画面への遷移ボタンが表示される
    - ポート8004の情報が表示される

- [ ] **Task 4.7**: メインアプリケーションの作成
  - ファイル: `packages/bubblepop-debug-account/src/App.tsx`
  - 内容: デバッグ用アカウントアプリのメインアプリケーション
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - ルーティングが正しく動作する
    - 本番アプリと独立したアプリケーションになっている

- [ ] **Task 4.8**: エントリーポイントの作成
  - ファイル: `packages/bubblepop-debug-account/src/main.tsx`
  - 内容: デバッグ用アカウントアプリのエントリーポイント
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - アプリケーションが正しく起動する
    - 本番アプリと独立したエントリーポイントになっている

- [ ] **Task 4.9**: アカウント画面デバッグアプリのテスト
  - 内容: ポート8004でアカウント画面デバッグアプリが起動することを確認
  - 受け入れ基準:
  - 要件: [1.1 各デバッグアプリへの直接アクセス](requirements.md#1-各デバッグアプリへの直接アクセス)
    - アプリが正しく起動する
    - トップページが表示される
    - アカウント画面に遷移できる

#### 5. ショップ画面デバッグアプリの作成
- [ ] **Task 5.1**: パッケージディレクトリの作成
  - ディレクトリ: `packages/bubblepop-debug-shop/`
  - 内容: デバッグ用ショップアプリのディレクトリ構造を作成
  - 受け入れ基準:
  - 要件: [1.1 アクセス方法 - ショップ画面デバッグアプリ](requirements.md#11-アクセス方法)
    - 必要なディレクトリが作成されている
    - 本番アプリと独立した構造になっている

- [ ] **Task 5.2**: package.jsonの作成
  - ファイル: `packages/bubblepop-debug-shop/package.json`
  - 内容: デバッグ用ショップアプリの依存関係とスクリプトを定義
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - 必要な依存関係が定義されている
    - ポート8005で起動する設定になっている

- [ ] **Task 5.3**: Vite設定の作成
  - ファイル: `packages/bubblepop-debug-shop/vite.config.ts`
  - 内容: ポート8005で起動するVite設定を作成
  - 受け入れ基準:
  - 要件: [3.2 ポート分離](requirements.md#32-ポート分離)
    - ポート8005で起動する設定になっている
    - 本番アプリと独立したビルド設定になっている

- [ ] **Task 5.4**: 環境変数設定の作成
  - ファイル: `packages/bubblepop-debug-shop/.env.development`
  - 内容: デバッグ用ショップアプリの環境変数を設定
  - 受け入れ基準:
  - 要件: [3.4 環境変数](requirements.md#34-環境変数)
    - VITE_APP_TYPE=debug-shopが設定されている
    - VITE_DEBUG_PORT=8005が設定されている
    - VITE_TARGET_SCREEN=shopが設定されている

- [ ] **Task 5.5**: ルーティング設定の作成
  - ファイル: `packages/bubblepop-debug-shop/src/router/Router.tsx`
  - 内容: デバッグ用ショップアプリのルーティング設定を作成
  - 受け入れ基準:
  - 要件: [2.1 ルーティング構成](requirements.md#21-ルーティング構成)
    - `/`でDebugShopTopPageが表示される
    - `/shop`でShopPageが表示される

- [ ] **Task 5.6**: デバッグ用トップページコンポーネントの作成
  - ファイル: `packages/bubblepop-debug-shop/src/pages/DebugShopTopPage.tsx`
  - 内容: ショップ画面への遷移を提供するトップページ
  - 受け入れ基準:
  - 要件: [2.2 デバッグ用トップページコンポーネント](requirements.md#22-デバッグ用トップページコンポーネント)
    - ショップ画面への遷移ボタンが表示される
    - ポート8005の情報が表示される

- [ ] **Task 5.7**: メインアプリケーションの作成
  - ファイル: `packages/bubblepop-debug-shop/src/App.tsx`
  - 内容: デバッグ用ショップアプリのメインアプリケーション
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - ルーティングが正しく動作する
    - 本番アプリと独立したアプリケーションになっている

- [ ] **Task 5.8**: エントリーポイントの作成
  - ファイル: `packages/bubblepop-debug-shop/src/main.tsx`
  - 内容: デバッグ用ショップアプリのエントリーポイント
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - アプリケーションが正しく起動する
    - 本番アプリと独立したエントリーポイントになっている

- [ ] **Task 5.9**: ショップ画面デバッグアプリのテスト
  - 内容: ポート8005でショップ画面デバッグアプリが起動することを確認
  - 受け入れ基準:
  - 要件: [1.1 各デバッグアプリへの直接アクセス](requirements.md#1-各デバッグアプリへの直接アクセス)
    - アプリが正しく起動する
    - トップページが表示される
    - ショップ画面に遷移できる

#### 6. 通知機能デバッグアプリの作成
- [ ] **Task 6.1**: パッケージディレクトリの作成
  - ディレクトリ: `packages/bubblepop-debug-notification/`
  - 内容: デバッグ用通知アプリのディレクトリ構造を作成
  - 受け入れ基準:
  - 要件: [1.1 アクセス方法 - 通知機能デバッグアプリ](requirements.md#11-アクセス方法)
    - 必要なディレクトリが作成されている
    - 本番アプリと独立した構造になっている

- [ ] **Task 6.2**: package.jsonの作成
  - ファイル: `packages/bubblepop-debug-notification/package.json`
  - 内容: デバッグ用通知アプリの依存関係とスクリプトを定義
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - 必要な依存関係が定義されている
    - ポート8006で起動する設定になっている

- [ ] **Task 6.3**: Vite設定の作成
  - ファイル: `packages/bubblepop-debug-notification/vite.config.ts`
  - 内容: ポート8006で起動するVite設定を作成
  - 受け入れ基準:
  - 要件: [3.2 ポート分離](requirements.md#32-ポート分離)
    - ポート8006で起動する設定になっている
    - 本番アプリと独立したビルド設定になっている

- [ ] **Task 6.4**: 環境変数設定の作成
  - ファイル: `packages/bubblepop-debug-notification/.env.development`
  - 内容: デバッグ用通知アプリの環境変数を設定
  - 受け入れ基準:
  - 要件: [3.4 環境変数](requirements.md#34-環境変数)
    - VITE_APP_TYPE=debug-notificationが設定されている
    - VITE_DEBUG_PORT=8006が設定されている
    - VITE_TARGET_SCREEN=notificationが設定されている

- [ ] **Task 6.5**: ルーティング設定の作成
  - ファイル: `packages/bubblepop-debug-notification/src/router/Router.tsx`
  - 内容: デバッグ用通知アプリのルーティング設定を作成
  - 受け入れ基準:
  - 要件: [2.1 ルーティング構成](requirements.md#21-ルーティング構成)
    - `/`でDebugNotificationTopPageが表示される
    - `/notification`でNotificationPageが表示される

- [ ] **Task 6.6**: デバッグ用トップページコンポーネントの作成
  - ファイル: `packages/bubblepop-debug-notification/src/pages/DebugNotificationTopPage.tsx`
  - 内容: 通知画面への遷移を提供するトップページ
  - 受け入れ基準:
  - 要件: [2.2 デバッグ用トップページコンポーネント](requirements.md#22-デバッグ用トップページコンポーネント)
    - 通知画面への遷移ボタンが表示される
    - ポート8006の情報が表示される

- [ ] **Task 6.7**: メインアプリケーションの作成
  - ファイル: `packages/bubblepop-debug-notification/src/App.tsx`
  - 内容: デバッグ用通知アプリのメインアプリケーション
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - ルーティングが正しく動作する
    - 本番アプリと独立したアプリケーションになっている

- [ ] **Task 6.8**: エントリーポイントの作成
  - ファイル: `packages/bubblepop-debug-notification/src/main.tsx`
  - 内容: デバッグ用通知アプリのエントリーポイント
  - 受け入れ基準:
  - 要件: [3.1 アプリケーション分離設計](requirements.md#31-アプリケーション分離設計)
    - アプリケーションが正しく起動する
    - 本番アプリと独立したエントリーポイントになっている

- [ ] **Task 6.9**: 通知機能デバッグアプリのテスト
  - 内容: ポート8006で通知機能デバッグアプリが起動することを確認
  - 受け入れ基準:
  - 要件: [1.1 各デバッグアプリへの直接アクセス](requirements.md#1-各デバッグアプリへの直接アクセス)
    - アプリが正しく起動する
    - トップページが表示される
    - 通知画面に遷移できる

### 7. ドキュメント更新

#### 7.1 README更新
- [ ] **Task 7.1.1**: デバッグアプリの起動方法の追加
  - ファイル: `README.md`
  - 内容: 各デバッグアプリの起動方法を追加
  - 受け入れ基準:
  - 要件: [4.1 ドキュメント更新](requirements.md#41-ドキュメント更新)
    - 各デバッグアプリの起動コマンドが記載されている
    - ポート番号が正しく記載されている

#### 7.2 開発ドキュメントの更新
- [ ] **Task 7.2.1**: デバッグ機能の説明の追加
  - ファイル: `docs/planning/debug_features.md`
  - 内容: 実装されたデバッグ機能の説明を更新
  - 受け入れ基準:
  - 要件: [4.2 開発ドキュメントの更新](requirements.md#42-開発ドキュメントの更新)
    - 実装内容が正しく反映されている
    - 使用方法が記載されている

## 受け入れ基準

### 全体の受け入れ基準
1. 6つのデバッグアプリが独立したポートで起動する
2. 各デバッグアプリに直接URLでアクセスできる
3. 各デバッグアプリが対象画面に正しく遷移する
4. 既存の機能に影響を与えない
5. 既存のテストが全て成功する

### 技術的な受け入れ基準
1. 各デバッグアプリが独立したプロジェクトとして管理される
2. 本番アプリとデバッグアプリが完全に分離される
3. 各デバッグアプリが正しいポートで起動する
4. ルーティングが正しく動作する
5. 環境変数が正しく設定される

## 注意事項

### 開発時の注意事項
1. 各デバッグアプリは独立したプロジェクトとして作成する
2. 本番アプリのコードを直接コピーしない
3. 共通コンポーネントは適切に共有する
4. 環境変数は各アプリで独立して設定する

### テスト時の注意事項
1. 各デバッグアプリを個別にテストする
2. 本番アプリとの統合テストを行う
3. 既存のテストが失敗しないことを確認する
4. ポートの競合がないことを確認する

## 参考ドキュメント
- docs/planning/debug_features.md
- docs/design/development_steps_plan.md
- docs/planning/page_flow.md
- docs/planning/url_pattern.md
