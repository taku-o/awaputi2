# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

BubblePop (泡々ぷちぷち) - React + TypeScript + Phaserベースのブラウザゲーム
- 画面に浮かぶ泡をクリック/タップして割るアクションゲーム
- モノリポジトリ構造（Lerna使用予定）
- SPA（Single Page Application）として実装

## 技術スタック

- **フロントエンド**: React + TypeScript
- **ゲームエンジン**: Phaser 3（ゲームプレイ画面のみ）
- **UIフレームワーク**: MUI (Material-UI)
- **状態管理**: Zustand
- **アニメーション**: Framer Motion
- **国際化**: react-i18next + i18next
- **ビルドツール**: Vite
- **コンポーネント開発**: Storybook
- **テスト**: Playwright（E2Eテスト）

## プロジェクト構造

```
awaputi2/
├── packages/                      # モノリポジトリパッケージ
│   ├── bubblepop/                # メインゲームアプリケーション
│   ├── bubblepop-debug-*/        # 各種デバッグアプリ
│   ├── ui-library/               # 共通UIコンポーネント
│   ├── bubblepop-lib/            # ゲームロジック共通ライブラリ
│   └── storybook-docs/           # Storybook設定
├── docs/
│   ├── planning/                 # 企画・仕様書
│   └── design/                   # 設計・実装仕様
└── CLAUDE.local.md               # プロジェクト固有の開発ルール
```

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm test

# Playwrightテスト
npm run test:e2e

# Storybook起動
npm run storybook

# リント
npm run lint

# 型チェック
npm run typecheck
```

## 重要な開発ルール

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

## 開発フェーズ（現在の状況）

現在はプロジェクト初期段階で、以下の開発計画に従って実装を進める：

1. **Phase 1-4**: 基盤構築（モノリポジトリ、UIライブラリ、Storybook）
2. **Phase 5-8**: 基本コンポーネントとルーティング
3. **Phase 9-12**: タイトル画面実装とテスト
4. **Phase 13-15**: メイン画面実装とテスト
5. **Phase 16-**: ゲームプレイ画面と各機能の段階的実装

詳細は `docs/design/development_steps_plan.md` を参照

## 主要な仕様書

### 企画仕様 (docs/planning/)
- `game_overview.md`: ゲーム全体の概要
- `game_mechanics.md`: ゲームメカニクス詳細
- `bubble_types.md`: 泡の種類と特性（18種類以上の泡）
- `scoring_system.md`: スコアリングシステム
- `progression_system.md`: 進行システム（レベル、実績）
- `audio_system.md`: 音響システム
- `stage_details.md`: 全10ステージの詳細仕様
- `achievement_system.md`: 実績システム
- `effects_system.md`: エフェクトシステム
- `shop_system.md`: ショップシステム
- `settings_system.md`: 設定システム
- `notification_system.md`: 通知システム
- `help_content.md`: ヘルプコンテンツ
- `screen_transitions.md`: 画面遷移仕様
- `page_flow.md`: ページフロー
- `system_architecture.md`: システムアーキテクチャ
- `ui_ux_design.md`: UI/UXデザイン（カーソルシステム含む）
- `url_pattern.md`: URLパターン定義
- `project_structure.md`: プロジェクト構造設計
- `debug_features.md`: デバッグ機能仕様

### 設計仕様 (docs/design/)
- `development_rules.md`: 開発時のルール
- `design_rules.md`: 設計時のルール
- `development_steps_plan.md`: 開発手順計画（全フェーズ）
- `app_state_management.md`: 状態管理方針（Zustand）
- `localization_handle.md`: 多言語対応仕様（ja/en）
- `theme_ui_component_spec.md`: UIテーマ仕様
- `asset_list.md`: アセット一覧
- `local_api_list.md`: ローカルAPI仕様
- `error_handling.md`: エラーハンドリング方針
- `class_tree.md`: クラス構造ツリー
- `component_list.md`: UIコンポーネント一覧
- `data_structure.md`: データ構造設計

### ページレイアウト (docs/design/page_layout/)
- `00_title_page.md`: タイトル画面
- `10_main_page.md`: メイン画面
- `20_game_play_page.md`: ゲームプレイ画面
- `21_play_result_page.md`: プレイ結果画面
- `30_account_page.md`: アカウント画面
- `40_help_page.md`: ヘルプ画面
- `50_shop_page.md`: ショップ画面
- `51_shop_item_dialog.md`: ショップアイテムダイアログ
- `52_shop_buy_result_page.md`: 購入結果画面
- `60_settings_page.md`: 設定画面
- `pages_list.md`: ページ一覧

## コーディング規約

- TypeScriptの厳格な型付けを使用
- React Functional Componentsを使用
- カスタムフックは`hooks/`ディレクトリに配置
- Zustandストアは`stores/`ディレクトリに配置
- コンポーネントごとにディレクトリを作成（index.ts でエクスポート）
- Storybookストーリーを各コンポーネントに用意

## 国際化対応

- react-i18nextを使用
- 対応言語: 日本語（ja）、英語（en）
- 翻訳ファイルは`locales/`ディレクトリに配置
- 動的な言語切り替えをサポート

## Git操作

- 作業ブランチはmasterから作成
- コミットメッセージは変更内容を明確に記述
- プルリクエスト作成時は変更内容とテスト結果を記載

## デバッグ機能

開発時は各種デバッグアプリを使用して個別機能をテスト可能：
- `bubblepop-debug-game`: ゲーム画面デバッグ
- `bubblepop-debug-settings`: 設定画面デバッグ
- その他、必要に応じてデバッグアプリを追加

## 注意事項

- 実装前に必ず関連する仕様書を確認
- 不明な点はユーザーに確認してから実装
- テストを含めて100%完了してから完了報告