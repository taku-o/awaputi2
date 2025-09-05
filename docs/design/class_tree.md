# BubblePop クラス構造ツリー

## 概要
BubblePopゲームプロジェクトのクラス構造をディレクトリツリー形式で表現した資料です。実装時にクラスの配置場所を視覚的に把握できます。

## ディレクトリ構造

```
awaputi2/
├── packages/
│   ├── bubblepop/                    # メインゲームアプリケーション
│   │   ├── src/
│   │   │   ├── game-engine/          # ゲームエンジン関連
│   │   │   │   ├── GameEngine.ts
│   │   │   │   ├── PhaserManager.ts
│   │   │   │   ├── GameStateManager.ts
│   │   │   │   ├── GameLoop.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── bubble/           # 泡管理システム
│   │   │   │   │   ├── BubbleManager.ts
│   │   │   │   │   ├── BubblePhysics.ts
│   │   │   │   │   ├── BubbleRenderer.ts
│   │   │   │   │   ├── BubbleCollision.ts
│   │   │   │   │   ├── BubbleSpawner.ts
│   │   │   │   │   ├── BubbleBreathing.ts
│   │   │   │   │   ├── BubbleMovement.ts
│   │   │   │   │   ├── BubbleBoundary.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── types/        # 泡タイプ管理
│   │   │   │   │       ├── BubbleTypeManager.ts
│   │   │   │   │       ├── NormalBubble.ts
│   │   │   │   │       ├── StoneBubble.ts
│   │   │   │   │       ├── IronBubble.ts
│   │   │   │   │       ├── DiamondBubble.ts
│   │   │   │   │       ├── PinkBubble.ts
│   │   │   │   │       ├── PoisonBubble.ts
│   │   │   │   │       ├── RainbowBubble.ts
│   │   │   │   │       ├── ClockBubble.ts
│   │   │   │   │       ├── ScoreBubble.ts
│   │   │   │   │       ├── SpikeBubble.ts
│   │   │   │   │       ├── ElectricBubble.ts
│   │   │   │   │       ├── EscapeBubble.ts
│   │   │   │   │       ├── CrackBubble.ts
│   │   │   │   │       ├── BossBubble.ts
│   │   │   │   │       ├── GoldenBubble.ts
│   │   │   │   │       ├── FrozenBubble.ts
│   │   │   │   │       ├── MagneticBubble.ts
│   │   │   │   │       ├── ExplosiveBubble.ts
│   │   │   │   │       ├── PhantomBubble.ts
│   │   │   │   │       ├── MultiplierBubble.ts
│   │   │   │   │       └── index.ts
│   │   │   │   ├── scoring/          # スコアリングシステム
│   │   │   │   │   ├── ScoreManager.ts
│   │   │   │   │   ├── ComboSystem.ts
│   │   │   │   │   ├── AgeBonusSystem.ts
│   │   │   │   │   ├── SpecialEffectSystem.ts
│   │   │   │   │   ├── ScoreDisplay.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── input/            # 入力処理システム
│   │   │   │   │   ├── InputManager.ts
│   │   │   │   │   ├── ClickHandler.ts
│   │   │   │   │   ├── DragHandler.ts
│   │   │   │   │   ├── TouchHandler.ts
│   │   │   │   │   ├── CursorSystem.ts
│   │   │   │   │   ├── ClickAnimation.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── audio/            # 音響システム
│   │   │   │   │   ├── AudioManager.ts
│   │   │   │   │   ├── PhaserAudioManager.ts
│   │   │   │   │   ├── HowlerAudioManager.ts
│   │   │   │   │   ├── SoundFileManager.ts
│   │   │   │   │   ├── BGMSystem.ts
│   │   │   │   │   ├── SoundEffectSystem.ts
│   │   │   │   │   ├── AudioQualityManager.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── effects/          # エフェクトシステム
│   │   │   │   │   ├── EffectManager.ts
│   │   │   │   │   ├── ParticleManager.ts
│   │   │   │   │   ├── ScreenShake.ts
│   │   │   │   │   ├── FlashEffect.ts
│   │   │   │   │   ├── ZoomEffect.ts
│   │   │   │   │   ├── ColorTintEffect.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── stage/            # ステージ管理
│   │   │   │   │   ├── StageManager.ts
│   │   │   │   │   ├── StageConfig.ts
│   │   │   │   │   ├── DifficultyManager.ts
│   │   │   │   │   ├── StageUnlockSystem.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── achievement/      # 実績システム
│   │   │   │   │   ├── AchievementManager.ts
│   │   │   │   │   ├── AchievementTracker.ts
│   │   │   │   │   ├── AchievementNotification.ts
│   │   │   │   │   ├── AchievementReward.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── item/             # アイテムシステム
│   │   │   │   │   ├── ItemManager.ts
│   │   │   │   │   ├── ItemEffect.ts
│   │   │   │   │   ├── ItemShop.ts
│   │   │   │   │   ├── ItemInventory.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/           # Reactコンポーネント
│   │   │   │   ├── layout/           # レイアウトコンポーネント
│   │   │   │   │   ├── PageContainer.tsx
│   │   │   │   │   ├── HeaderContainer.tsx
│   │   │   │   │   ├── FooterContainer.tsx
│   │   │   │   │   ├── ContentContainer.tsx
│   │   │   │   │   ├── SectionContainer.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── navigation/       # ナビゲーションコンポーネント
│   │   │   │   │   ├── MainNavigation.tsx
│   │   │   │   │   ├── BackButton.tsx
│   │   │   │   │   ├── MenuButton.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── background/       # 背景・装飾コンポーネント
│   │   │   │   │   ├── AnimatedBubbleBackground.tsx
│   │   │   │   │   ├── LogoIcon.tsx
│   │   │   │   │   ├── VersionInfo.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── buttons/          # ボタンコンポーネント
│   │   │   │   │   ├── PrimaryButton.tsx
│   │   │   │   │   ├── SecondaryButton.tsx
│   │   │   │   │   ├── IconButton.tsx
│   │   │   │   │   ├── LinkButton.tsx
│   │   │   │   │   ├── GameStartButton.tsx
│   │   │   │   │   ├── GiveUpButton.tsx
│   │   │   │   │   ├── PlayAgainButton.tsx
│   │   │   │   │   ├── MenuReturnButton.tsx
│   │   │   │   │   ├── PurchaseButton.tsx
│   │   │   │   │   ├── SaveButton.tsx
│   │   │   │   │   ├── ResetButton.tsx
│   │   │   │   │   ├── CloseButton.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── display/          # 表示コンポーネント
│   │   │   │   │   ├── GameTitle.tsx
│   │   │   │   │   ├── PageTitle.tsx
│   │   │   │   │   ├── SectionTitle.tsx
│   │   │   │   │   ├── DescriptionText.tsx
│   │   │   │   │   ├── HelpText.tsx
│   │   │   │   │   ├── ErrorText.tsx
│   │   │   │   │   ├── SuccessText.tsx
│   │   │   │   │   ├── UserInfo.tsx
│   │   │   │   │   ├── LevelDisplay.tsx
│   │   │   │   │   ├── APDisplay.tsx
│   │   │   │   │   ├── TAPDisplay.tsx
│   │   │   │   │   ├── ScoreDisplay.tsx
│   │   │   │   │   ├── ComboDisplay.tsx
│   │   │   │   │   ├── TimerDisplay.tsx
│   │   │   │   │   ├── HPBar.tsx
│   │   │   │   │   ├── ProgressBar.tsx
│   │   │   │   │   ├── StatisticCard.tsx
│   │   │   │   │   ├── StatisticList.tsx
│   │   │   │   │   ├── AchievementCard.tsx
│   │   │   │   │   ├── AchievementList.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── input/             # 入力コンポーネント
│   │   │   │   │   ├── TextInput.tsx
│   │   │   │   │   ├── SliderInput.tsx
│   │   │   │   │   ├── SelectDropdown.tsx
│   │   │   │   │   ├── ToggleSwitch.tsx
│   │   │   │   │   ├── RadioButton.tsx
│   │   │   │   │   ├── Checkbox.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── cards/             # カード・リストコンポーネント
│   │   │   │   │   ├── StageCard.tsx
│   │   │   │   │   ├── StageList.tsx
│   │   │   │   │   ├── ItemCard.tsx
│   │   │   │   │   ├── ItemList.tsx
│   │   │   │   │   ├── BubbleTypeCard.tsx
│   │   │   │   │   ├── HelpCategoryCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── dialogs/           # ダイアログ・モーダルコンポーネント
│   │   │   │   │   ├── ConfirmDialog.tsx
│   │   │   │   │   ├── ItemDetailDialog.tsx
│   │   │   │   │   ├── PurchaseResultDialog.tsx
│   │   │   │   │   ├── LevelUpNotification.tsx
│   │   │   │   │   ├── AchievementNotification.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── game/              # ゲーム専用コンポーネント
│   │   │   │   │   ├── GameHeader.tsx
│   │   │   │   │   ├── GameInfoPanel.tsx
│   │   │   │   │   ├── GameOverlay.tsx
│   │   │   │   │   ├── PhaserContainer.tsx
│   │   │   │   │   ├── ResultSummary.tsx
│   │   │   │   │   ├── ResultStatistics.tsx
│   │   │   │   │   ├── AchievementProgress.tsx
│   │   │   │   │   ├── ExperienceGain.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── shop/              # ショップコンポーネント
│   │   │   │   │   ├── ShopHeader.tsx
│   │   │   │   │   ├── ShopItemGrid.tsx
│   │   │   │   │   ├── ItemStatusBadge.tsx
│   │   │   │   │   ├── PriceTag.tsx
│   │   │   │   │   ├── PurchaseConfirmation.tsx
│   │   │   │   │   ├── ItemIcon.tsx
│   │   │   │   │   ├── ItemLevelIndicator.tsx
│   │   │   │   │   ├── ItemEffectDescription.tsx
│   │   │   │   │   ├── CostComparison.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── settings/          # 設定コンポーネント
│   │   │   │   │   ├── SettingsSection.tsx
│   │   │   │   │   ├── VolumeSlider.tsx
│   │   │   │   │   ├── LanguageSelector.tsx
│   │   │   │   │   ├── QualitySelector.tsx
│   │   │   │   │   ├── NotificationToggle.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── help/              # ヘルプコンポーネント
│   │   │   │   │   ├── HelpNavigation.tsx
│   │   │   │   │   ├── HelpContent.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── account/           # アカウントコンポーネント
│   │   │   │   │   ├── AccountSummary.tsx
│   │   │   │   │   ├── ProgressChart.tsx
│   │   │   │   │   ├── UnlockList.tsx
│   │   │   │   │   ├── ItemInventory.tsx
│   │   │   │   │   ├── PlayHistory.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── effects/           # エフェクト・アニメーションコンポーネント
│   │   │   │   │   ├── HammerCursor.tsx
│   │   │   │   │   ├── SwingAnimation.tsx
│   │   │   │   │   ├── HitAnimation.tsx
│   │   │   │   │   ├── TrailEffect.tsx
│   │   │   │   │   ├── ShockwaveEffect.tsx
│   │   │   │   │   ├── ScreenShake.tsx
│   │   │   │   │   ├── FadeTransition.tsx
│   │   │   │   │   ├── SlideTransition.tsx
│   │   │   │   │   ├── ScaleTransition.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── utils/             # ユーティリティコンポーネント
│   │   │   │   │   ├── ResponsiveContainer.tsx
│   │   │   │   │   ├── MobileView.tsx
│   │   │   │   │   ├── DesktopView.tsx
│   │   │   │   │   ├── FocusIndicator.tsx
│   │   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   │   ├── LoadingBar.tsx
│   │   │   │   │   ├── SkeletonLoader.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── pages/                 # ページコンポーネント
│   │   │   │   ├── TitlePage.tsx
│   │   │   │   ├── MainPage.tsx
│   │   │   │   ├── GamePlayPage.tsx
│   │   │   │   ├── PlayResultPage.tsx
│   │   │   │   ├── AccountPage.tsx
│   │   │   │   ├── HelpPage.tsx
│   │   │   │   ├── ShopPage.tsx
│   │   │   │   ├── ShopItemDialog.tsx
│   │   │   │   ├── ShopBuyResultPage.tsx
│   │   │   │   ├── SettingsPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── stores/                # 状態管理
│   │   │   │   ├── GameStore.ts
│   │   │   │   ├── SettingsStore.ts
│   │   │   │   ├── PlayerStore.ts
│   │   │   │   ├── UIStore.ts
│   │   │   │   ├── AudioStore.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                 # カスタムフック
│   │   │   │   ├── useGameState.ts
│   │   │   │   ├── useAudio.ts
│   │   │   │   ├── useLocalStorage.ts
│   │   │   │   ├── useDebounce.ts
│   │   │   │   ├── useAnimation.ts
│   │   │   │   └── index.ts
│   │   │   ├── animations/            # アニメーション
│   │   │   │   ├── FramerMotionAnimations.ts
│   │   │   │   ├── GameAnimations.ts
│   │   │   │   ├── UIAnimations.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/                 # ユーティリティ
│   │   │   │   ├── MathUtils.ts
│   │   │   │   ├── ColorUtils.ts
│   │   │   │   ├── TimeUtils.ts
│   │   │   │   ├── ValidationUtils.ts
│   │   │   │   ├── StorageUtils.ts
│   │   │   │   ├── DeviceUtils.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/                 # 型定義
│   │   │   │   ├── GameTypes.ts
│   │   │   │   ├── BubbleTypes.ts
│   │   │   │   ├── UITypes.ts
│   │   │   │   ├── AudioTypes.ts
│   │   │   │   ├── StoreTypes.ts
│   │   │   │   ├── APITypes.ts
│   │   │   │   └── index.ts
│   │   │   ├── assets/                # アセット
│   │   │   │   ├── images/            # 画像アセット
│   │   │   │   ├── audio/             # 音響アセット
│   │   │   │   ├── fonts/             # フォントアセット
│   │   │   │   └── icons/             # アイコンアセット
│   │   │   └── main.tsx               # エントリーポイント
│   │   ├── public/                    # 静的ファイル
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
│   │   │   │   ├── Input/            # 入力コンポーネント
│   │   │   │   ├── Modal/            # モーダルコンポーネント
│   │   │   │   ├── Navigation/       # ナビゲーションコンポーネント
│   │   │   │   └── index.ts
│   │   │   ├── animations/           # Framer Motionアニメーション
│   │   │   │   ├── FramerMotionAnimations.ts
│   │   │   │   ├── TransitionAnimations.ts
│   │   │   │   └── index.ts
│   │   │   ├── stores/               # Zustandストア
│   │   │   │   ├── UIStore.ts
│   │   │   │   ├── ThemeStore.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                # 共通フック
│   │   │   │   ├── useTheme.ts
│   │   │   │   ├── useAnimation.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/                # 共通ユーティリティ
│   │   │   │   ├── StyleUtils.ts
│   │   │   │   ├── AnimationUtils.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/                # 共通型定義
│   │   │   │   ├── ComponentTypes.ts
│   │   │   │   ├── ThemeTypes.ts
│   │   │   │   └── index.ts
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
│       │   │   ├── ScoreManager.ts   # スコア管理システム
│       │   │   ├── AchievementManager.ts # 実績管理システム
│       │   │   ├── ItemManager.ts    # アイテム管理システム
│       │   │   ├── StageManager.ts   # ステージ管理システム
│       │   │   └── index.ts
│       │   ├── utils/                # 共通ユーティリティ
│       │   │   ├── MathUtils.ts
│       │   │   ├── PhysicsUtils.ts
│       │   │   ├── GameUtils.ts
│       │   │   └── index.ts
│       │   ├── types/                # 共通型定義
│       │   │   ├── GameTypes.ts
│       │   │   ├── BubbleTypes.ts
│       │   │   ├── ScoreTypes.ts
│       │   │   └── index.ts
│       │   └── index.ts              # ライブラリのメインエクスポート
│       ├── package.json
│       └── rollup.config.js
│
├── lerna.json                        # Lerna設定
└── package.json                      # ルートパッケージ設定
```

## クラス設計の原則

### 1. 単一責任の原則
- 各クラスは一つの責任のみを持つ
- 機能が複雑な場合は複数のクラスに分割

### 2. 依存関係の逆転
- 抽象に依存し、具象に依存しない
- インターフェースを活用した疎結合設計

### 3. 開閉の原則
- 拡張に対して開いており、修正に対して閉じている
- 新機能追加時は既存コードを変更せずに拡張

### 4. インターフェース分離の原則
- クライアントは使用しないインターフェースに依存しない
- 必要最小限のインターフェースのみを提供

### 5. リスコフ置換の原則
- 派生クラスは基底クラスと置換可能
- 継承関係の適切な設計

## 技術スタック別クラス配置

### Phaser関連クラス
- **配置場所**: `src/game-engine/`
- **役割**: ゲームエンジンとの統合、物理演算、描画処理
- **主要クラス**: GameEngine, BubbleManager, ParticleManager, AudioManager

### React関連クラス
- **配置場所**: `src/components/`, `src/pages/`
- **役割**: UI表示、ユーザーインタラクション、状態管理
- **主要クラス**: 各種Reactコンポーネント、カスタムフック

### 共通ロジッククラス
- **配置場所**: `packages/bubblepop-lib/`
- **役割**: ゲームロジック、データ処理、ユーティリティ
- **主要クラス**: ScoreManager, AchievementManager, ItemManager

### UIライブラリクラス
- **配置場所**: `packages/ui-library/`
- **役割**: 再利用可能なUIコンポーネント、共通スタイル
- **主要クラス**: Button, Card, Input, Modal

## クラス間の関係性

### ゲームエンジン層
- GameEngine → PhaserManager, GameStateManager
- BubbleManager → BubblePhysics, BubbleRenderer, BubbleCollision
- ScoreManager → ComboSystem, AgeBonusSystem, SpecialEffectSystem

### プレゼンテーション層
- Reactコンポーネント → カスタムフック → ストア
- ページコンポーネント → レイアウトコンポーネント → UIコンポーネント

### データ層
- ストア → ローカルストレージ
- ゲームロジック → データモデル

## 実装時の注意事項

### 1. 命名規則
- クラス名: PascalCase (例: BubbleManager)
- メソッド名: camelCase (例: calculateScore)
- 定数名: UPPER_SNAKE_CASE (例: MAX_BUBBLES)

### 2. ファイル構成
- 1ファイル1クラス
- 関連クラスは同じディレクトリに配置
- index.tsでエクスポートを統一

### 3. 依存関係
- 循環依存を避ける
- 抽象に依存する設計
- 必要最小限の依存関係

### 4. エラーハンドリング
- 適切な例外処理
- ユーザーフレンドリーなエラーメッセージ
- ログ出力の統一

### 5. テスト
- 単体テストの作成
- モックの活用
- テストカバレッジの確保

## 将来の拡張性

### 1. 新機能追加
- 既存クラスの拡張
- 新規クラスの追加
- インターフェースの活用

### 2. パフォーマンス最適化
- オブジェクトプールの活用
- メモリ管理の最適化
- レンダリング最適化

### 3. 保守性向上
- ドキュメントの充実
- コードレビューの実施
- リファクタリングの継続

このクラス構造設計により、BubblePopゲームの効率的な開発と保守が可能になります。