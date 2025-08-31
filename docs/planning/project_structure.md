# BubblePop プロジェクト構造設計

## 概要
BubblePopゲームプロジェクトのモノリポジトリ構造と技術スタックに関する包括的な設計書です。MUI (Material-UI)、StoryBook、Lernaを活用した効率的な開発環境の構築を目指します。

## モノリポジトリ構造

### ディレクトリ構成
```
awaputi2/
├── packages/
│   ├── bubblepop/                    # メインゲームアプリケーション
│   │   ├── src/
│   │   │   ├── components/           # Reactコンポーネント
│   │   │   ├── pages/                # ページコンポーネント
│   │   │   ├── hooks/                # カスタムフック
│   │   │   ├── utils/                # ユーティリティ関数
│   │   │   ├── types/                # TypeScript型定義
│   │   │   ├── assets/               # 静的アセット
│   │   │   └── main.tsx              # エントリーポイント
│   │   ├── public/                   # 静的ファイル
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── index.html
│   │
│   ├── bubblepop-debug-game/         # ゲーム画面デバッグアプリ
│   │   ├── src/
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   ├── bubblepop-debug-settings/     # 設定画面デバッグアプリ
│   │   ├── src/
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   ├── bubblepop-debug-..../         # 他のデバッグアプリ
│   │   ├── src/
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   ├── ui-library/                   # UIコンポーネントライブラリ
│   │   ├── src/
│   │   │   ├── components/           # 共通UIコンポーネント
│   │   │   │   ├── Button/           # ボタンコンポーネント
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Card/             # カードコンポーネント
│   │   │   │   ├── ....
│   │   │   │   └── index.ts          # 全コンポーネントのエクスポート
│   │   │   ├── hooks/                # 共通フック
│   │   │   ├── utils/                # 共通ユーティリティ
│   │   │   ├── types/                # 共通型定義
│   │   │   └── index.ts              # ライブラリのメインエクスポート
│   │   ├── package.json
│   │   └── rollup.config.js          # ライブラリビルド設定
│   │
│   ├── storybook-docs/               # StoryBook設定とストーリーファイル
│   │   ├── .storybook/
│   │   ├── src/
│   │   │   └── components/           # ストーリーファイル
│   │   │       ├── Button.stories.tsx
│   │   │       └── ....
│   │   └── package.json
│   │
│   └── bubblepop-lib/                # 共通ゲームロジック
│       ├── src/
│       │   ├── game-engine/          # ゲームエンジン
│       │   │   ├── BubbleManager.ts  # 泡管理システム
│       │   │   ├── ....
│       │   │   └── index.ts
│       │   ├── utils/                # 共通ユーティリティ
│       │   ├── components/           # 共通ゲームコンポーネント
│       │   ├── types/                # 共通型定義
│       │   └── index.ts              # ライブラリのメインエクスポート
│       ├── package.json
│       └── rollup.config.js
│
├── lerna.json                        # Lerna設定
└── package.json                      # ルートパッケージ設定
```
