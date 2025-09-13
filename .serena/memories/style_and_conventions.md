# コードスタイルと規約

## TypeScript設定
- **ターゲット**: ES2020
- **厳格モード**: strict: true
- **未使用変数チェック**: noUnusedLocals, noUnusedParameters有効
- **JSX**: react-jsx
- **モジュール解決**: bundler

## ESLint設定
- TypeScript推奨ルール適用
- React推奨ルール適用
- React Hooks推奨ルール適用
- Prettierとの統合
- **重要なルール**:
  - `@typescript-eslint/no-unused-vars`: error
  - `@typescript-eslint/explicit-function-return-type`: warn
  - `@typescript-eslint/no-explicit-any`: error
  - `react/react-in-jsx-scope`: off（React 17+のため）

## Prettier設定
- セミコロン: あり
- シングルクォート: true
- タブ幅: 2
- 末尾カンマ: es5
- 行幅: 80

## コーディング規約

### React
- React Functional Componentsを使用
- クラスコンポーネントは使用しない
- カスタムフックは`hooks/`ディレクトリに配置
- コンポーネントごとにディレクトリを作成（index.ts でエクスポート）

### 状態管理
- Zustandを使用
- ストアは`stores/`ディレクトリに配置

### ファイル構成
- TypeScriptファイル拡張子: `.ts`, `.tsx`
- コンポーネント: PascalCase（例: `BubbleComponent.tsx`）
- ユーティリティ: camelCase（例: `bubbleUtils.ts`）
- テストファイル: `.test.ts`, `.test.tsx`
- Storybookストーリー: `.stories.tsx`

### インポート
- 絶対インポートではなく相対インポートを使用
- パッケージ間は`@bubblepop/`プレフィックスを使用

### テスト
- 各コンポーネントにStorybookストーリーを用意
- テスト可能な機能には単体テストを用意
- 画面描画がある機能にはPlaywrightテストを用意

### 国際化
- react-i18nextを使用
- 対応言語: 日本語（ja）、英語（en）
- 翻訳ファイルは`locales/`ディレクトリに配置

## 開発時の厳格なルール

### 実装時の厳格なルール
- ドキュメントにない余計な機能は作らない
- 将来導入予定の機能、拡張予定の機能は考慮しない
- 最適化やフォールバック機能は不要
- 一時的な実装、仮実装、ダミー実装は「実装完了」とみなさない

### 作業完了の判定
- 作業が100%完了するまで「完了」と判断しない
- タスクの完了判定はユーザーが行う
- 「部分完了」「一部完了」「実質完了」等の表現は使用禁止

### コード変更時の注意
- 処理件数が多くても一括処理スクリプトの作成は禁止（ユーザー許可が必要）
- 問題を発見したら必ずユーザーに報告し、応答を待つ
- テスト可能な機能は単体テストを用意
- 画面描画がある機能はPlaywrightテストを用意

### 作業停止トリガー
- WARNING、ERROR、警告が1件でも出たら即座に作業停止しユーザーに報告
- 「ビルド成功」の文字があっても警告があれば成功とみなさない
- 警告やエラーを「問題ない」「通常は問題ない」と自己判断しない