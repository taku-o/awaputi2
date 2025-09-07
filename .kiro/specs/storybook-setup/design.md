# Design Document

## Overview

Phase 4のStorybookセットアップでは、既存のui-libraryパッケージのコンポーネントを視覚的に確認・テストできる開発環境を構築します。Storybookは独立したパッケージとして設定し、ui-libraryのコンポーネントを参照する構成とします。

## Architecture

### パッケージ構成
```
packages/
├── ui-library/                    # 既存のUIコンポーネントライブラリ
│   ├── src/components/
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Container/
│   └── ...
└── storybook-docs/               # 新規作成するStorybookパッケージ
    ├── .storybook/               # Storybook設定ディレクトリ
    │   ├── main.js              # メイン設定ファイル
    │   └── preview.jsx          # プレビュー設定ファイル
    ├── src/
    │   └── stories/             # ストーリーファイル
    │       ├── Button.stories.tsx
    │       ├── Card.stories.tsx
    │       └── Container.stories.tsx
    ├── package.json
    └── tsconfig.json
```

### 依存関係
- storybook-docsパッケージはui-libraryパッケージに依存
- ui-libraryのコンポーネントとテーマを参照
- MUIテーマプロバイダーをStorybook環境で利用

## Components and Interfaces

### Storybook設定ファイル

#### .storybook/main.js
```javascript
export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-viewport'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
};
```

#### .storybook/preview.jsx
```javascript
import React from 'react';
import { BubblePopThemeProvider } from '@bubblepop/ui-library';

export const decorators = [
  (Story) => (
    <BubblePopThemeProvider>
      <Story />
    </BubblePopThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

### ストーリーファイル構造

#### Button.stories.tsx
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@bubblepop/ui-library';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'icon'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
    children: '🎮',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};
```

## Data Models

### ルートパッケージ設定

#### ルートpackage.jsonへのスクリプト追加
```json
{
  "scripts": {
    "storybook": "npm run storybook --workspace=@bubblepop/storybook-docs",
    "build-storybook": "npm run build-storybook --workspace=@bubblepop/storybook-docs"
  }
}
```

### パッケージ設定

#### package.json
```json
{
  "name": "@bubblepop/storybook-docs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@bubblepop/ui-library": "*"
  },
  "devDependencies": {
    "@storybook/react": "^7.0.0",
    "@storybook/react-vite": "^7.0.0",
    "@storybook/addon-essentials": "^7.0.0",
    "@storybook/addon-controls": "^7.0.0",
    "@storybook/addon-actions": "^7.0.0",
    "@storybook/addon-docs": "^7.0.0",
    "@storybook/addon-viewport": "^7.0.0",
    "storybook": "^7.0.0"
  }
}
```

#### tsconfig.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*",
    ".storybook/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## Error Handling

### 設定エラー対応
- Storybookの起動に失敗した場合のエラーメッセージ表示とプロセス終了
- ui-libraryパッケージの依存関係が正しく設定されていない場合のモジュール解決エラー表示とビルド停止
- MUIテーマの読み込みに失敗した場合のエラー表示とアプリケーション終了

### ビルドエラー対応
- TypeScriptコンパイルエラーの適切な表示とビルド停止
- 不正なストーリーファイルの検出とエラー表示
- 依存関係の不整合に対するエラー表示とビルド停止

## Testing Strategy

### Storybookテスト
- Storybookサーバーの起動テスト
- 各ストーリーの正常な表示確認
- アドオンの動作確認
- ビルド処理の成功確認

### 統合テスト
- ui-libraryコンポーネントとの連携テスト
- MUIテーマの適用確認
- 既存テストの継続実行確認