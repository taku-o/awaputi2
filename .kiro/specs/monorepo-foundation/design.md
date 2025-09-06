# 設計書

## 概要

BubblePopゲームプロジェクトの基盤構築として、Lernaベースのモノリポジトリ環境を構築します。TypeScript、ESLint、Prettier、Viteを統合した効率的な開発環境を提供し、メインアプリケーション（bubblepop）と共通UIライブラリ（ui-library）の2つの基本パッケージを作成します。

## アーキテクチャ

### モノリポジトリ構造

```
awaputi2/
├── lerna.json                        # Lerna設定
├── package.json                      # ルートパッケージ設定
├── tsconfig.json                     # TypeScript基本設定
├── .eslintrc.js                      # ESLint設定
├── .prettierrc                       # Prettier設定
├── .gitignore                        # Git除外設定
└── packages/
    ├── bubblepop/                    # メインゲームアプリケーション
    │   ├── src/
    │   │   ├── components/           # Reactコンポーネント
    │   │   ├── pages/                # ページコンポーネント
    │   │   ├── hooks/                # カスタムフック
    │   │   ├── stores/               # Zustandストア
    │   │   ├── utils/                # ユーティリティ関数
    │   │   ├── types/                # TypeScript型定義
    │   │   ├── assets/               # 静的アセット
    │   │   └── main.tsx              # エントリーポイント
    │   ├── public/                   # 静的ファイル
    │   ├── package.json              # パッケージ設定
    │   ├── tsconfig.json             # TypeScript設定
    │   ├── vite.config.ts            # Vite設定
    │   └── index.html                # HTMLテンプレート
    └── ui-library/                   # UIコンポーネントライブラリ
        ├── src/
        │   ├── components/           # 共通UIコンポーネント
        │   ├── hooks/                # 共通フック
        │   ├── utils/                # 共通ユーティリティ
        │   ├── types/                # 共通型定義
        │   └── index.ts              # ライブラリエクスポート
        ├── package.json              # パッケージ設定
        ├── tsconfig.json             # TypeScript設定
        └── vite.config.ts            # Vite設定（ライブラリモード）
```

### 技術スタック

- **モノリポジトリ管理**: Lerna 8.x
- **パッケージマネージャー**: npm
- **言語**: TypeScript 5.x
- **フレームワーク**: React 18.x
- **ビルドツール**: Vite 5.x
- **コード品質**: ESLint 8.x + Prettier 3.x
- **型チェック**: TypeScript Compiler

## コンポーネントとインターフェース

### Lernaワークスペース管理

#### lerna.json設定
```json
{
  "version": "0.0.0",
  "npmClient": "npm",
  "command": {
    "publish": {
      "conventionalCommits": true
    }
  },
  "packages": [
    "packages/*"
  ]
}
```

#### 依存関係管理
- パッケージ間の依存関係はnpm workspacesが自動解決
- ui-libraryはbubblepopから参照される
- 外部依存関係は各パッケージのpackage.jsonで管理
- Lerna v8ではbootstrapコマンドが削除されているため、npm installを使用

### TypeScript設定

#### ルートtsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "files": [],
  "references": [
    { "path": "./packages/bubblepop" },
    { "path": "./packages/ui-library" }
  ]
}
```

#### パッケージ固有設定
- 各パッケージはルート設定を継承
- bubblepop: DOM型定義を含む
- ui-library: ライブラリ用設定（declaration: true）

**注意**: ルートtsconfig.jsonではプロジェクト参照を使用するため、`files: []`を指定し、直接ファイルを含めません。各パッケージの型チェックは個別のtsconfig.jsonで行われます。

### ESLint・Prettier設定

#### .eslintrc.js
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

#### .prettierrc
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### Vite設定

#### bubblepop用vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // 開発時はui-libraryのソースを直接参照
      '@bubblepop/ui-library': resolve(__dirname, '../ui-library/src'),
    },
  },
  server: {
    port: 3000,
    // ui-libraryの変更を監視
    watch: {
      ignored: ['!**/node_modules/@bubblepop/ui-library/**'],
    },
  },
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    // ui-libraryを事前バンドルから除外（開発時）
    exclude: ['@bubblepop/ui-library'],
  },
})
```

#### ui-library用vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync } from 'fs'

// package.jsonからバージョンを読み取り
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  plugins: [react()],
  define: {
    // バージョンを自動注入
    __UI_LIBRARY_VERSION__: JSON.stringify(packageJson.version),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UILibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `ui-library.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

## データモデル

### パッケージ設定

#### ルートpackage.json
```json
{
  "name": "bubble-pop-web-game",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "install-all": "npm install",
    "clean": "lerna clean",
    "dev": "lerna run dev --parallel",
    "build": "lerna run build",
    "lint": "lerna run lint",
    "format": "lerna run format",
    "type-check": "lerna run type-check"
  },
  "devDependencies": {
    "lerna": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "eslint-config-prettier": "^9.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.2"
  }
}
```

#### bubblepop/package.json
```json
{
  "name": "@bubblepop/app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "type-check": "tsc --noEmit",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@bubblepop/ui-library": "^0.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5"
  }
}
```

#### ui-library/package.json
```json
{
  "name": "@bubblepop/ui-library",
  "version": "0.0.1",
  "type": "module",
  "main": "./dist/ui-library.umd.js",
  "module": "./dist/ui-library.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "development": "./src/index.ts",
      "import": "./dist/ui-library.es.js",
      "require": "./dist/ui-library.umd.js"
    }
  },
  "files": [
    "dist",
    "src"
  ],
  "scripts": {
    "dev": "vite build --watch",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5"
  }
}
```

## 開発ワークフロー

### ライブラリ開発時の最適化

#### 開発時の動作
1. **ソース直接参照**: bubblepopは開発時にui-libraryのsrcを直接参照
2. **ホットリロード**: ui-libraryの変更が即座にbubblepopに反映
3. **バージョン自動注入**: Viteがpackage.jsonのversionを自動的にコードに注入

#### 本番時の動作
1. **ビルド済み参照**: bubblepopは本番時にui-libraryのdistを参照
2. **型定義**: TypeScriptの型定義ファイルを使用
3. **最適化**: バンドルサイズの最適化

#### バージョン管理
```typescript
// ui-library/src/index.ts
// Viteが自動的にpackage.jsonのversionを注入
export const UI_LIBRARY_VERSION = __UI_LIBRARY_VERSION__;

// 使用例
console.log(`UI Library Version: ${UI_LIBRARY_VERSION}`);
```

#### 開発コマンド
```bash
# 開発サーバー起動（並列実行）
npm run dev

# ui-library: vite build --watch
# bubblepop: vite dev server (port 3000)
```

## エラーハンドリング

### ビルドエラー対応
- TypeScriptコンパイルエラーの早期検出
- ESLintルール違反の自動修正
- Prettierフォーマットエラーの自動修正

### 依存関係エラー対応
- Lernaによる依存関係の自動解決
- パッケージ間の循環依存の検出と回避
- バージョン競合の解決

### 開発環境エラー対応
- Vite開発サーバーのエラーオーバーレイ
- ホットリロード失敗時の自動復旧
- ポート競合時の自動ポート変更

## テスト戦略

### 設定ファイルテスト
- lerna.jsonの妥当性検証
- tsconfig.jsonの継承関係確認
- package.jsonの依存関係整合性確認

### ビルドテスト
- 各パッケージの個別ビルド成功確認
- パッケージ間依存関係の解決確認
- 型定義ファイルの生成確認

### 開発環境テスト
- 開発サーバーの起動確認
- ホットリロードの動作確認
- ESLint・Prettierの実行確認

### 統合テスト
- 全パッケージの一括操作確認
- Lernaコマンドの動作確認
- CI/CD環境での動作確認