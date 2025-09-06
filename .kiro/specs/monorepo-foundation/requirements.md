# 要件定義書

## 概要

BubblePopゲームプロジェクトの基盤構築として、モノリポジトリ環境のセットアップを行います。Lernaを使用したパッケージ管理、TypeScript・ESLint・Prettier設定、Viteビルド設定を含む開発環境の構築を目指します。

## 要件

### 要件1: モノリポジトリ構造の構築

**ユーザーストーリー:** 開発者として、効率的な開発とパッケージ管理のために、Lernaベースのモノリポジトリ構造を構築したい

#### 受け入れ基準

1. WHEN プロジェクトルートでlerna initを実行 THEN lernaの設定ファイルが正しく生成される
2. WHEN packages/ディレクトリが作成される THEN 各パッケージが適切に配置できる構造になる
3. WHEN lerna bootstrapを実行 THEN 全パッケージの依存関係が正しく解決される

### 要件2: 基本パッケージ構造の作成

**ユーザーストーリー:** 開発者として、ゲーム開発に必要な基本パッケージ構造を作成し、各パッケージが独立して管理できるようにしたい

#### 受け入れ基準

1. WHEN packages/bubblepopディレクトリが作成される THEN メインゲームアプリケーションの基盤が構築される
   - packages/bubblepop/src/components/ディレクトリが存在する
   - packages/bubblepop/src/pages/ディレクトリが存在する
   - packages/bubblepop/src/hooks/ディレクトリが存在する
   - packages/bubblepop/src/stores/ディレクトリが存在する
   - packages/bubblepop/src/utils/ディレクトリが存在する
   - packages/bubblepop/src/types/ディレクトリが存在する
   - packages/bubblepop/src/assets/ディレクトリが存在する
   - packages/bubblepop/public/ディレクトリが存在する
   - packages/bubblepop/index.htmlが存在する

2. WHEN packages/ui-libraryディレクトリが作成される THEN 共通UIコンポーネントライブラリの基盤が構築される
   - packages/ui-library/src/components/ディレクトリが存在する
   - packages/ui-library/src/hooks/ディレクトリが存在する
   - packages/ui-library/src/utils/ディレクトリが存在する
   - packages/ui-library/src/types/ディレクトリが存在する
   - packages/ui-library/src/index.tsが存在する

3. WHEN 各パッケージにpackage.jsonが作成される THEN 独立したパッケージとして管理できる
   - packages/bubblepop/package.jsonが適切なname、version、scriptsを含む
   - packages/ui-library/package.jsonが適切なname、version、scriptsを含む
   - 各package.jsonがTypeScript、React、Viteの依存関係を含む

4. WHEN 各パッケージにsrcディレクトリが作成される THEN ソースコードの配置場所が明確になる
   - packages/bubblepop/src/main.tsxが存在する
   - packages/ui-library/src/index.tsが存在する

### 要件3: TypeScript設定の構築

**ユーザーストーリー:** 開発者として、型安全な開発環境のために、TypeScript設定を各パッケージに適用したい

#### 受け入れ基準

1. WHEN ルートにtsconfig.jsonが作成される THEN プロジェクト全体のTypeScript設定が定義される
   - strict: trueが設定されている
   - target: "ES2020"が設定されている
   - module: "ESNext"が設定されている
   - moduleResolution: "bundler"が設定されている
   - jsx: "react-jsx"が設定されている
   - allowImportingTsExtensions: trueが設定されている
   - resolveJsonModule: trueが設定されている
   - isolatedModules: trueが設定されている
   - noEmit: trueが設定されている

2. WHEN 各パッケージにtsconfig.jsonが作成される THEN パッケージ固有のTypeScript設定が適用される
   - packages/bubblepop/tsconfig.jsonがルートのtsconfig.jsonを継承している
   - packages/ui-library/tsconfig.jsonがルートのtsconfig.jsonを継承している
   - 各tsconfig.jsonが適切なinclude/excludeパスを含む
   - packages/bubblepop/tsconfig.jsonがDOM型定義を含む
   - packages/ui-library/tsconfig.jsonがライブラリ用の設定を含む

3. WHEN TypeScriptファイルをコンパイル THEN エラーなくJavaScriptファイルが生成される
   - tscコマンドでエラーが発生しない
   - 型定義ファイル(.d.ts)が適切に生成される

4. WHEN 型チェックを実行 THEN 型エラーが適切に検出される
   - tsc --noEmitで型チェックが実行される
   - 型エラーがある場合は適切にエラーメッセージが表示される

### 要件4: ESLint・Prettier設定の構築

**ユーザーストーリー:** 開発者として、コード品質の統一とフォーマットの自動化のために、ESLint・Prettier設定を適用したい

#### 受け入れ基準

1. WHEN ルートに.eslintrc.jsが作成される THEN プロジェクト全体のESLint設定が定義される
   - @typescript-eslint/parserが設定されている
   - @typescript-eslint/eslint-pluginが有効になっている
   - eslint-plugin-reactが有効になっている
   - eslint-plugin-react-hooksが有効になっている
   - eslint-config-prettierが設定されている
   - 適切なparserOptionsが設定されている
   - TypeScript用のrulesが設定されている

2. WHEN ルートに.prettierrcが作成される THEN プロジェクト全体のPrettier設定が定義される
   - semi: trueが設定されている
   - singleQuote: trueが設定されている
   - tabWidth: 2が設定されている
   - trailingComma: 'es5'が設定されている
   - printWidth: 80が設定されている

3. WHEN ESLintを実行 THEN コードの品質問題が適切に検出される
   - eslint packages/*/src/**/*.{ts,tsx}でエラーチェックが実行される
   - 未使用変数、未定義変数が検出される
   - React Hooksのルール違反が検出される

4. WHEN Prettierを実行 THEN コードが統一されたフォーマットに整形される
   - prettier --write packages/*/src/**/*.{ts,tsx}でフォーマットが実行される
   - インデント、セミコロン、クォートが統一される

5. WHEN TypeScriptファイルに対してESLintを実行 THEN TypeScript固有のルールが適用される
   - @typescript-eslint/no-unused-varsが適用される
   - @typescript-eslint/explicit-function-return-typeが適用される
   - @typescript-eslint/no-explicit-anyが適用される

### 要件5: Viteビルド設定の構築

**ユーザーストーリー:** 開発者として、高速な開発サーバーとビルドのために、Vite設定を各パッケージに適用したい

#### 受け入れ基準

1. WHEN packages/bubblepopにvite.config.tsが作成される THEN メインアプリのVite設定が定義される
   - @vitejs/plugin-reactが設定されている
   - server.port: 3000が設定されている
   - build.outDir: 'dist'が設定されている
   - resolve.aliasで@/がsrc/にマッピングされている
   - TypeScriptの型チェックが有効になっている

2. WHEN packages/ui-libraryにvite.config.tsが作成される THEN ライブラリのVite設定が定義される
   - @vitejs/plugin-reactが設定されている
   - build.lib設定でライブラリモードが有効になっている
   - build.rollupOptions.externalでreact、react-domが外部依存として設定されている
   - build.rollupOptions.outputでUMDとESMの両方が出力される
   - resolve.aliasで@/がsrc/にマッピングされている

3. WHEN npm run devを実行 THEN 開発サーバーが正常に起動する
   - packages/bubblepopで開発サーバーがポート3000で起動する
   - ブラウザでhttp://localhost:3000にアクセスできる
   - React開発者ツールが利用できる

4. WHEN npm run buildを実行 THEN 本番用ビルドが正常に完了する
   - packages/bubblepop/distディレクトリにビルド成果物が生成される
   - packages/ui-library/distディレクトリにライブラリファイルが生成される
   - TypeScriptの型定義ファイルが生成される
   - ビルドエラーが発生しない

5. WHEN ホットリロードが動作 THEN ファイル変更時に自動的にブラウザが更新される
   - .tsx、.tsファイルの変更でホットリロードが発生する
   - CSSファイルの変更でスタイルが即座に反映される
   - エラー時にオーバーレイが表示される

### 要件6: パッケージ間依存関係の設定

**ユーザーストーリー:** 開発者として、パッケージ間の依存関係を適切に管理し、相互参照できるようにしたい

#### 受け入れ基準

1. WHEN bubblepopパッケージがui-libraryを依存関係に追加 THEN ui-libraryのコンポーネントをインポートできる
2. WHEN lerna linkを実行 THEN パッケージ間のシンボリックリンクが作成される
3. WHEN 依存関係を変更 THEN lerna bootstrapで依存関係が更新される

### 要件7: 開発スクリプトの設定

**ユーザーストーリー:** 開発者として、効率的な開発作業のために、共通の開発スクリプトを利用したい

#### 受け入れ基準

1. WHEN ルートpackage.jsonにスクリプトが定義される THEN 全パッケージに対して一括操作ができる
   - "bootstrap": "lerna bootstrap"が定義されている
   - "clean": "lerna clean"が定義されている
   - "dev": "lerna run dev --parallel"が定義されている
   - "build": "lerna run build"が定義されている
   - "lint": "lerna run lint"が定義されている
   - "format": "lerna run format"が定義されている
   - "type-check": "lerna run type-check"が定義されている

2. WHEN npm run lintを実行 THEN 全パッケージのESLintが実行される
   - packages/bubblepopのESLintが実行される
   - packages/ui-libraryのESLintが実行される
   - エラーがある場合は適切にエラーメッセージが表示される

3. WHEN npm run formatを実行 THEN 全パッケージのPrettierが実行される
   - packages/bubblepopのPrettierが実行される
   - packages/ui-libraryのPrettierが実行される
   - 全ファイルが統一されたフォーマットに整形される

4. WHEN npm run type-checkを実行 THEN 全パッケージの型チェックが実行される
   - packages/bubblepopの型チェックが実行される
   - packages/ui-libraryの型チェックが実行される
   - 型エラーがある場合は適切にエラーメッセージが表示される

5. WHEN npm run buildを実行 THEN 全パッケージのビルドが実行される
   - packages/ui-libraryが最初にビルドされる（依存関係順）
   - packages/bubblepopがui-libraryの後にビルドされる
   - 全パッケージのビルドが成功する