# BubblePop プロジェクト概要

## プロジェクト概要
BubblePop (泡々ぷちぷち) - React + TypeScript + Phaserベースのブラウザゲーム
- 画面に浮かぶ泡をクリック/タップして割るアクションゲーム
- モノリポジトリ構造（Lerna使用）
- SPA（Single Page Application）として実装

## 技術スタック
- **フロントエンド**: React 18 + TypeScript 5
- **ゲームエンジン**: Phaser 3（ゲームプレイ画面のみ）
- **UIフレームワーク**: MUI (Material-UI)
- **状態管理**: Zustand
- **アニメーション**: Framer Motion
- **国際化**: react-i18next + i18next
- **ビルドツール**: Vite
- **コンポーネント開発**: Storybook
- **テストフレームワーク**: 
  - Jest（単体テスト）
  - Playwright（E2Eテスト）
- **モノリポ管理**: Lerna
- **リンター**: ESLint
- **フォーマッター**: Prettier

## プロジェクト構造
```
awaputi2/
├── packages/                      # モノリポジトリパッケージ
│   ├── bubblepop/                # メインゲームアプリケーション
│   ├── bubblepop-debug-*/        # 各種デバッグアプリ
│   ├── ui-library/               # 共通UIコンポーネントライブラリ
│   ├── bubblepop-lib/            # ゲームロジック共通ライブラリ
│   └── storybook-docs/           # Storybook設定
├── docs/
│   ├── planning/                 # 企画・仕様書（ゲーム仕様、泡の種類、ステージ詳細など）
│   └── design/                   # 設計・実装仕様（開発ルール、データ構造、ページレイアウトなど）
├── tests/                        # E2Eテスト
├── CLAUDE.md                     # プロジェクト固有の開発ガイドライン
└── CLAUDE.local.md              # ユーザー固有の開発ルール
```

## ゲームコンセプト
- シンプルで奥が深いバブルポップゲーム
- 18種類以上の個性豊かな泡（通常、石、ダイヤモンド、レインボー、エレクトリック、ボス泡など）
- 10ステージ（チュートリアルから全部入りアワアワまで）
- 永続的な進歩システム（APとTAPを貯めてアイテム購入、レベルアップ、実績システム）