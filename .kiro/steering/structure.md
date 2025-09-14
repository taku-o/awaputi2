# BubblePop プロジェクト構造

## ディレクトリ構成

### ルートディレクトリ
```
awaputi2/
├── .kiro/                          # Kiro spec-driven development
│   ├── steering/                   # プロジェクトガイドライン
│   └── specs/                      # 機能仕様書
├── packages/                       # モノリポジトリパッケージ
│   ├── bubblepop/                  # メインゲームアプリケーション
│   ├── ui-library/                 # 共通UIコンポーネントライブラリ
│   └── storybook-docs/             # StoryBook設定とストーリー
├── tests/                          # E2Eテスト
├── docs/                           # プロジェクトドキュメント
├── .github/workflows/              # CI/CD設定
├── package.json                    # ルートパッケージ設定
├── lerna.json                      # Lerna設定
├── tsconfig.json                   # TypeScript設定
└── playwright.config.ts            # Playwright設定
```

## パッケージ構造

### @bubblepop/app (メインアプリケーション)
```
packages/bubblepop/
├── src/
│   ├── components/                 # Reactコンポーネント
│   │   └── TestImport.tsx          # UIライブラリテスト用
│   ├── stores/                     # Zustandストア
│   │   ├── PlayerStore.ts          # プレイヤーデータ管理
│   │   ├── SettingsStore.ts        # 設定データ管理
│   │   ├── UIStore.ts              # UI状態管理
│   │   ├── persistence.ts          # データ永続化
│   │   ├── index.ts                # ストアエクスポート
│   │   └── __tests__/              # ストアテスト
│   ├── types/                      # TypeScript型定義
│   │   ├── GameTypes.ts            # ゲーム関連型
│   │   ├── StoreTypes.ts           # ストア関連型
│   │   ├── UITypes.ts              # UI関連型
│   │   └── index.ts                # 型エクスポート
│   ├── utils/                      # ユーティリティ関数
│   │   ├── StorageUtils.ts         # ローカルストレージ管理
│   │   ├── index.ts                # ユーティリティエクスポート
│   │   └── __tests__/              # ユーティリティテスト
│   ├── App.tsx                     # メインアプリケーション
│   ├── main.tsx                    # エントリーポイント
│   └── index.css                   # グローバルスタイル
├── public/                         # 静的ファイル
├── package.json                    # パッケージ設定
├── vite.config.ts                  # Vite設定
├── tsconfig.json                   # TypeScript設定
└── jest.config.mjs                 # Jest設定
```

### @bubblepop/ui-library (UIライブラリ)
```
packages/ui-library/
├── src/
│   ├── components/                 # UIコンポーネント
│   │   ├── Button/                 # ボタンコンポーネント
│   │   │   ├── Button.tsx          # メインコンポーネント
│   │   │   ├── Button.types.ts     # 型定義
│   │   │   └── index.ts            # エクスポート
│   │   ├── Card/                   # カードコンポーネント
│   │   │   ├── Card.tsx
│   │   │   ├── Card.types.ts
│   │   │   └── index.ts
│   │   ├── Container/              # コンテナコンポーネント
│   │   │   ├── Container.tsx
│   │   │   ├── Container.types.ts
│   │   │   └── index.ts
│   │   ├── TestButton.tsx          # テスト用コンポーネント
│   │   └── index.ts                # 全コンポーネントエクスポート
│   ├── providers/                  # プロバイダーコンポーネント
│   │   └── ThemeProvider.tsx       # テーマプロバイダー
│   ├── theme/                      # テーマ設定
│   │   ├── palette.ts              # カラーパレット
│   │   ├── typography.ts           # フォント設定
│   │   ├── spacing.ts              # スペーシング設定
│   │   ├── components.ts           # コンポーネントスタイル
│   │   ├── types.ts                # テーマ型定義
│   │   └── index.ts                # テーマエクスポート
│   ├── index.ts                    # ライブラリメインエクスポート
│   └── vite.config.ts              # Vite設定
├── tests/                          # 単体テスト
│   ├── Button.test.tsx
│   ├── Card.test.tsx
│   ├── Container.test.tsx
│   ├── ThemeProvider.test.tsx
│   ├── integration.test.tsx
│   └── theme.test.ts
├── package.json                    # パッケージ設定
├── tsconfig.json                   # TypeScript設定
└── jest.config.mjs                 # Jest設定
```

### @bubblepop/storybook-docs (StoryBook)
```
packages/storybook-docs/
├── .storybook/                     # StoryBook設定
│   ├── main.js                     # メイン設定
│   └── preview.jsx                 # プレビュー設定
├── src/
│   └── stories/                    # ストーリーファイル
│       ├── Button.stories.tsx      # ボタンストーリー
│       ├── Card.stories.tsx        # カードストーリー
│       └── Container.stories.tsx   # コンテナストーリー
├── tests/                          # StoryBookテスト
│   ├── button-stories.spec.ts
│   ├── card-stories.spec.ts
│   ├── container-stories.spec.ts
│   ├── component-stories.spec.ts
│   ├── storybook-addons.spec.ts
│   ├── storybook-build.spec.ts
│   ├── storybook-stories-display.spec.ts
│   ├── storybook.spec.ts
│   └── theme-verification.spec.ts
├── public/                         # 静的ファイル
│   └── placeholder-card.svg
├── package.json                    # パッケージ設定
├── tsconfig.json                   # TypeScript設定
└── playwright.config.ts            # Playwright設定
```

## ファイル命名規則

### コンポーネントファイル
- **コンポーネント名**: PascalCase (例: `Button.tsx`)
- **型定義ファイル**: `ComponentName.types.ts`
- **テストファイル**: `ComponentName.test.tsx`
- **ストーリーファイル**: `ComponentName.stories.tsx`
- **インデックスファイル**: `index.ts`

### ユーティリティファイル
- **ユーティリティ名**: camelCase (例: `StorageUtils.ts`)
- **テストファイル**: `utilityName.test.ts`
- **型定義**: 必要に応じて `utilityName.types.ts`

### 設定ファイル
- **パッケージ設定**: `package.json`
- **TypeScript設定**: `tsconfig.json`
- **Vite設定**: `vite.config.ts`
- **Jest設定**: `jest.config.mjs`
- **ESLint設定**: `.eslintrc.cjs`
- **Prettier設定**: `.prettierrc`

## コード組織パターン

### コンポーネント構造
```typescript
// 1. インポート文
import React from 'react';
import { ComponentProps } from './Component.types';

// 2. 型定義（必要に応じて）
interface LocalProps {
  // ローカル型定義
}

// 3. メインコンポーネント
export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2,
  ...props
}) => {
  // 4. フック（状態管理）
  const [state, setState] = useState();

  // 5. イベントハンドラー
  const handleEvent = () => {
    // 処理
  };

  // 6. レンダリング
  return (
    <div {...props}>
      {/* JSX */}
    </div>
  );
};
```

### ストア構造
```typescript
// 1. インポート文
import { create } from 'zustand';
import { StateType } from '../types/StoreTypes';

// 2. ストアインターフェース
interface StoreInterface extends StateType {
  // アクション定義
  actionName: (param: type) => void;
}

// 3. ストア実装
export const useStore = create<StoreInterface>((set, get) => ({
  // 初期状態
  initialState: 'value',
  
  // アクション実装
  actionName: (param) => {
    set({ state: param });
  },
}));
```

### 型定義構造
```typescript
// 1. 基本型定義
export interface BaseType {
  id: string;
  createdAt: string;
}

// 2. 拡張型定義
export interface ExtendedType extends BaseType {
  name: string;
  value: number;
}

// 3. ユニオン型
export type Status = 'pending' | 'success' | 'error';

// 4. ユーティリティ型
export type PartialType = Partial<ExtendedType>;
```

## インポート・エクスポート規則

### インポート順序
1. **外部ライブラリ**: React, MUI, その他
2. **内部ライブラリ**: @bubblepop/ui-library
3. **相対インポート**: 同じパッケージ内のファイル
4. **型インポート**: `import type { Type } from '...'`

### エクスポート規則
- **名前付きエクスポート**: コンポーネント、関数、型
- **デフォルトエクスポート**: メインコンポーネントのみ
- **再エクスポート**: `index.ts`でまとめてエクスポート

### 例
```typescript
// インポート例
import React from 'react';
import { Button, Card } from '@bubblepop/ui-library';
import { PlayerState } from '../types/StoreTypes';
import type { ComponentProps } from './Component.types';

// エクスポート例
export { Button } from './Button';
export { Card } from './Card';
export type { ButtonProps } from './Button.types';
```

## テスト構造

### テストファイル配置
- **単体テスト**: `ComponentName.test.tsx`
- **統合テスト**: `integration.test.tsx`
- **E2Eテスト**: `tests/e2e/`ディレクトリ
- **StoryBookテスト**: `tests/`ディレクトリ

### テスト命名規則
```typescript
describe('ComponentName', () => {
  describe('rendering', () => {
    it('should render correctly', () => {
      // テスト内容
    });
  });

  describe('interactions', () => {
    it('should handle click events', () => {
      // テスト内容
    });
  });
});
```

## 主要な設計原則

### 1. 単一責任の原則
- 各コンポーネントは1つの責任を持つ
- ストアは特定のドメインの状態のみ管理
- ユーティリティ関数は1つの機能のみ提供

### 2. 依存関係の方向
- UIライブラリは他のパッケージに依存しない
- アプリケーションはUIライブラリに依存
- 共通ロジックは適切な層に配置

### 3. 型安全性
- 全ての関数・コンポーネントに型定義
- `any`型の使用を避ける
- インターフェースで契約を明確化

### 4. テスタビリティ
- 純粋関数の使用
- 副作用の分離
- モック可能な設計

この構造により、保守性が高く、拡張しやすいコードベースを維持できます。