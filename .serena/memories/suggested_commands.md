# 開発用コマンド一覧

## 基本的な開発コマンド

### 依存関係のインストール
```bash
npm install
```

### 開発サーバー起動
```bash
npm run dev                 # 全パッケージの開発サーバー起動（並列）
npm run dev:e2e            # メインアプリのみ起動（E2Eテスト用）
```

### ビルドコマンド
```bash
npm run build              # 全パッケージのビルド
npm run build --workspace=@bubblepop/ui-library  # UIライブラリのみビルド
```

### テストコマンド
```bash
npm test                   # 全パッケージのテスト実行
npm run test:e2e          # Playwrightによるるるるるるるる����E2Eテスト
npm run test:e2e:ui       # PlaywrightテストUI起動
npm run test:e2e:headed   # ヘッドフルモードでE2Eテスト実行
npm run test:storybook    # Storybookテスト
npm run test:bubblepop    # メインアプリのテスト
```

### コード品質チェック
```bash
npm run lint              # ESLintによるコードチェック
npm run format            # Prettierによるコードフォーマット
npm run type-check        # TypeScriptの型チェック
```

### Storybook
```bash
npm run storybook         # Storybook起動
npm run build-storybook   # Storybookのビルド
```

### パッケージごとのコマンド実行
```bash
# ui-libraryパッケージのコマンド
cd packages/ui-library
npm run type-check        # 型チェック
npm run lint             # リント
npm run build            # ビルド
npm test                 # テスト
```

### Lernaコマンド
```bash
npm run clean            # 全パッケージのクリーン
lerna run dev --parallel # 並列でdev実行
lerna run build          # 全パッケージビルド
```

### CI用コマンド
```bash
npm run ci:install       # CI用インストール
npm run ci:build         # CI用ビルド
npm run ci:lint          # CI用リント
npm run ci:type-check    # CI用型チェック
npm run ci:test:unit     # CI用単体テスト
npm run ci:test:e2e      # CI用E2Eテスト
npm run ci:test:storybook # CI用Storybookテスト
npm run ci:test:all      # CI用全テスト実行
```

## タスク完了時の必須確認コマンド

タスク完了時には以下のコマンドを実行してエラーがないことを確認：

```bash
# プロジェクトルートで実行
cd {project_root}
npm run test:e2e
npm run test:storybook -- --reporter=line

# UIライブラリの確認
cd packages/ui-library && npm run type-check && npm run lint && npm run build && npm test

# 最終確認
cd {project_root}
npm run lint
npm run build --workspace=@bubblepop/ui-library && npm run build-storybook
```

※ test:e2e, test:storybookはClaude Codeで実行時にタイムアウトエラーすることがあるが、タイムアウト原因の失敗なら問題ない