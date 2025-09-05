# BubblePop クラス構造設計

## 概要
BubblePopゲームプロジェクトのクラス設計と配置に関する包括的な設計書です。React + TypeScript + Phaserを活用した効率的な開発環境でのクラス配置を定義します。

## ディレクトリ構造とクラス配置

### メインアプリケーション (packages/bubblepop/)

#### ゲームエンジン関連 (src/game-engine/)
```
packages/bubblepop/src/game-engine/
├── GameEngine.ts              # ゲームエンジンの統合制御
├── PhaserManager.ts           # Phaserインスタンス管理
├── GameStateManager.ts        # ゲーム状態の管理
├── GameLoop.ts                # ゲームループ制御
└── index.ts                   # エクスポート
```

#### 泡管理システム (src/game-engine/bubble/)
```
packages/bubblepop/src/game-engine/bubble/
├── BubbleManager.ts           # 泡の生成・更新・削除管理
├── BubblePhysics.ts           # 泡の物理演算
├── BubbleRenderer.ts          # 泡の描画処理
├── BubbleCollision.ts         # 泡の衝突判定
├── BubbleSpawner.ts           # 泡の生成ロジック
├── BubbleBreathing.ts         # 泡の呼吸アニメーション
├── BubbleMovement.ts          # 泡の自然移動システム
├── BubbleBoundary.ts          # 境界反発システム
└── index.ts
```

#### 泡タイプ管理 (src/game-engine/bubble/types/)
```
packages/bubblepop/src/game-engine/bubble/types/
├── BubbleTypeManager.ts       # 泡タイプの管理
├── NormalBubble.ts            # 通常泡クラス
├── StoneBubble.ts             # 石泡クラス
├── IronBubble.ts              # 鉄泡クラス
├── DiamondBubble.ts           # ダイヤモンド泡クラス
├── PinkBubble.ts              # 回復泡クラス
├── PoisonBubble.ts            # 毒泡クラス
├── RainbowBubble.ts           # 虹色泡クラス
├── ClockBubble.ts             # 時計泡クラス
├── ScoreBubble.ts             # スコア泡クラス
├── SpikeBubble.ts             # トゲ泡クラス
├── ElectricBubble.ts          # 電気泡クラス
├── EscapeBubble.ts            # 逃げる泡クラス
├── CrackBubble.ts             # ひび泡クラス
├── BossBubble.ts              # ボス泡クラス
├── GoldenBubble.ts            # 黄金泡クラス
├── FrozenBubble.ts            # 氷泡クラス
├── MagneticBubble.ts          # 磁石泡クラス
├── ExplosiveBubble.ts         # 爆発泡クラス
├── PhantomBubble.ts           # 幻影泡クラス
├── MultiplierBubble.ts        # 倍率泡クラス
└── index.ts
```

#### スコアリングシステム (src/game-engine/scoring/)
```
packages/bubblepop/src/game-engine/scoring/
├── ScoreManager.ts            # スコア計算と管理
├── ComboSystem.ts             # コンボシステム
├── AgeBonusSystem.ts          # 年齢ボーナスシステム
├── SpecialEffectSystem.ts     # 特殊効果システム
├── ScoreDisplay.ts            # スコア表示管理
└── index.ts
```

#### 入力処理システム (src/game-engine/input/)
```
packages/bubblepop/src/game-engine/input/
├── InputManager.ts            # 入力処理の統合管理
├── ClickHandler.ts            # クリック処理
├── DragHandler.ts             # ドラッグ処理
├── TouchHandler.ts            # タッチ処理
├── CursorSystem.ts            # カーソルシステム
├── ClickAnimation.ts          # クリックアニメーション
└── index.ts
```

#### 音響システム (src/game-engine/audio/)
```
packages/bubblepop/src/game-engine/audio/
├── AudioManager.ts            # 音響システムの統合管理
├── PhaserAudioManager.ts      # Phaser音響管理
├── HowlerAudioManager.ts      # Howler.js音響管理
├── SoundFileManager.ts        # 音響ファイル管理
├── BGMSystem.ts               # 背景音楽システム
├── SoundEffectSystem.ts       # 効果音システム
├── AudioQualityManager.ts     # 音響品質管理
└── index.ts
```

#### エフェクトシステム (src/game-engine/effects/)
```
packages/bubblepop/src/game-engine/effects/
├── EffectManager.ts           # エフェクトの統合管理
├── ParticleManager.ts         # パーティクル管理
├── ScreenShake.ts             # 画面シェイク
├── FlashEffect.ts             # フラッシュ効果
├── ZoomEffect.ts              # ズーム効果
├── ColorTintEffect.ts         # 色調変更効果
└── index.ts
```

#### ステージ管理 (src/game-engine/stage/)
```
packages/bubblepop/src/game-engine/stage/
├── StageManager.ts            # ステージ管理
├── StageConfig.ts             # ステージ設定
├── DifficultyManager.ts       # 難易度管理
├── StageUnlockSystem.ts       # ステージ解放システム
└── index.ts
```

#### 実績システム (src/game-engine/achievement/)
```
packages/bubblepop/src/game-engine/achievement/
├── AchievementManager.ts      # 実績管理
├── AchievementTracker.ts      # 実績追跡
├── AchievementNotification.ts # 実績通知
├── AchievementReward.ts       # 実績報酬
└── index.ts
```

#### アイテムシステム (src/game-engine/item/)
```
packages/bubblepop/src/game-engine/item/
├── ItemManager.ts             # アイテム管理
├── ItemEffect.ts              # アイテム効果
├── ItemShop.ts                # アイテムショップ
├── ItemInventory.ts           # アイテムインベントリ
└── index.ts
```

### Reactコンポーネント (src/components/)

#### レイアウトコンポーネント (src/components/layout/)
```
packages/bubblepop/src/components/layout/
├── PageContainer.tsx          # ページコンテナ
├── HeaderContainer.tsx        # ヘッダーコンテナ
├── FooterContainer.tsx        # フッターコンテナ
├── ContentContainer.tsx       # コンテンツコンテナ
├── SectionContainer.tsx       # セクションコンテナ
└── index.ts
```

#### ナビゲーションコンポーネント (src/components/navigation/)
```
packages/bubblepop/src/components/navigation/
├── MainNavigation.tsx         # メインナビゲーション
├── BackButton.tsx             # 戻るボタン
├── MenuButton.tsx             # メニューボタン
└── index.ts
```

#### 背景・装飾コンポーネント (src/components/background/)
```
packages/bubblepop/src/components/background/
├── AnimatedBubbleBackground.tsx # アニメーション泡背景
├── LogoIcon.tsx               # ロゴアイコン
├── VersionInfo.tsx            # バージョン情報
└── index.ts
```

#### ボタンコンポーネント (src/components/buttons/)
```
packages/bubblepop/src/components/buttons/
├── PrimaryButton.tsx          # プライマリボタン
├── SecondaryButton.tsx        # セカンダリボタン
├── IconButton.tsx             # アイコンボタン
├── LinkButton.tsx             # リンクボタン
├── GameStartButton.tsx        # ゲーム開始ボタン
├── GiveUpButton.tsx           # ギブアップボタン
├── PlayAgainButton.tsx        # 再プレイボタン
├── MenuReturnButton.tsx       # メニュー戻りボタン
├── PurchaseButton.tsx         # 購入ボタン
├── SaveButton.tsx             # 保存ボタン
├── ResetButton.tsx            # リセットボタン
├── CloseButton.tsx            # 閉じるボタン
└── index.ts
```

#### 表示コンポーネント (src/components/display/)
```
packages/bubblepop/src/components/display/
├── GameTitle.tsx              # ゲームタイトル
├── PageTitle.tsx              # ページタイトル
├── SectionTitle.tsx           # セクションタイトル
├── DescriptionText.tsx        # 説明テキスト
├── HelpText.tsx               # ヘルプテキスト
├── ErrorText.tsx              # エラーテキスト
├── SuccessText.tsx            # 成功テキスト
├── UserInfo.tsx               # ユーザー情報
├── LevelDisplay.tsx           # レベル表示
├── APDisplay.tsx              # AP表示
├── TAPDisplay.tsx             # TAP表示
├── ScoreDisplay.tsx           # スコア表示
├── ComboDisplay.tsx           # コンボ表示
├── TimerDisplay.tsx           # タイマー表示
├── HPBar.tsx                  # HPバー
├── ProgressBar.tsx            # プログレスバー
├── StatisticCard.tsx          # 統計カード
├── StatisticList.tsx          # 統計リスト
├── AchievementCard.tsx        # 実績カード
├── AchievementList.tsx        # 実績リスト
└── index.ts
```

#### 入力コンポーネント (src/components/input/)
```
packages/bubblepop/src/components/input/
├── TextInput.tsx              # テキスト入力
├── SliderInput.tsx            # スライダー入力
├── SelectDropdown.tsx         # セレクトドロップダウン
├── ToggleSwitch.tsx           # トグルスイッチ
├── RadioButton.tsx            # ラジオボタン
├── Checkbox.tsx               # チェックボックス
└── index.ts
```

#### カード・リストコンポーネント (src/components/cards/)
```
packages/bubblepop/src/components/cards/
├── StageCard.tsx              # ステージカード
├── StageList.tsx              # ステージリスト
├── ItemCard.tsx               # アイテムカード
├── ItemList.tsx               # アイテムリスト
├── BubbleTypeCard.tsx         # 泡タイプカード
├── HelpCategoryCard.tsx       # ヘルプカテゴリカード
└── index.ts
```

#### ダイアログ・モーダルコンポーネント (src/components/dialogs/)
```
packages/bubblepop/src/components/dialogs/
├── ConfirmDialog.tsx          # 確認ダイアログ
├── ItemDetailDialog.tsx       # アイテム詳細ダイアログ
├── PurchaseResultDialog.tsx   # 購入結果ダイアログ
├── LevelUpNotification.tsx    # レベルアップ通知
├── AchievementNotification.tsx # 実績通知
└── index.ts
```

#### ゲーム専用コンポーネント (src/components/game/)
```
packages/bubblepop/src/components/game/
├── GameHeader.tsx             # ゲームヘッダー
├── GameInfoPanel.tsx          # ゲーム情報パネル
├── GameOverlay.tsx            # ゲームオーバーレイ
├── PhaserContainer.tsx        # Phaserコンテナ
├── ResultSummary.tsx          # 結果サマリー
├── ResultStatistics.tsx       # 結果統計
├── AchievementProgress.tsx    # 実績進捗
├── ExperienceGain.tsx         # 経験値獲得
└── index.ts
```

#### ショップコンポーネント (src/components/shop/)
```
packages/bubblepop/src/components/shop/
├── ShopHeader.tsx             # ショップヘッダー
├── ShopItemGrid.tsx           # ショップアイテムグリッド
├── ItemStatusBadge.tsx        # アイテムステータスバッジ
├── PriceTag.tsx               # 価格タグ
├── PurchaseConfirmation.tsx   # 購入確認
├── ItemIcon.tsx               # アイテムアイコン
├── ItemLevelIndicator.tsx     # アイテムレベルインジケーター
├── ItemEffectDescription.tsx  # アイテム効果説明
├── CostComparison.tsx         # コスト比較
└── index.ts
```

#### 設定コンポーネント (src/components/settings/)
```
packages/bubblepop/src/components/settings/
├── SettingsSection.tsx        # 設定セクション
├── VolumeSlider.tsx           # 音量スライダー
├── LanguageSelector.tsx       # 言語選択
├── QualitySelector.tsx        # 品質選択
├── NotificationToggle.tsx     # 通知トグル
└── index.ts
```

#### ヘルプコンポーネント (src/components/help/)
```
packages/bubblepop/src/components/help/
├── HelpNavigation.tsx         # ヘルプナビゲーション
├── HelpContent.tsx            # ヘルプコンテンツ
└── index.ts
```

#### アカウントコンポーネント (src/components/account/)
```
packages/bubblepop/src/components/account/
├── AccountSummary.tsx         # アカウントサマリー
├── ProgressChart.tsx          # 進捗チャート
├── UnlockList.tsx             # 解放リスト
├── ItemInventory.tsx          # アイテムインベントリ
├── PlayHistory.tsx            # プレイ履歴
└── index.ts
```

#### エフェクト・アニメーションコンポーネント (src/components/effects/)
```
packages/bubblepop/src/components/effects/
├── HammerCursor.tsx           # ハンマーカーソル
├── SwingAnimation.tsx         # 振りかぶりアニメーション
├── HitAnimation.tsx           # 叩くアニメーション
├── TrailEffect.tsx            # 軌跡エフェクト
├── ShockwaveEffect.tsx        # 衝撃波エフェクト
├── ScreenShake.tsx            # 画面シェイク
├── FadeTransition.tsx         # フェードトランジション
├── SlideTransition.tsx        # スライドトランジション
├── ScaleTransition.tsx        # スケールトランジション
└── index.ts
```

#### ユーティリティコンポーネント (src/components/utils/)
```
packages/bubblepop/src/components/utils/
├── ResponsiveContainer.tsx    # レスポンシブコンテナ
├── MobileView.tsx             # モバイルビュー
├── DesktopView.tsx            # デスクトップビュー
├── FocusIndicator.tsx         # フォーカスインジケーター
├── LoadingSpinner.tsx         # ローディングスピナー
├── LoadingBar.tsx             # ローディングバー
├── SkeletonLoader.tsx         # スケルトンローダー
└── index.ts
```

### ページコンポーネント (src/pages/)
```
packages/bubblepop/src/pages/
├── TitlePage.tsx              # タイトルページ
├── MainPage.tsx               # メインページ
├── GamePlayPage.tsx           # ゲームプレイページ
├── PlayResultPage.tsx         # プレイ結果ページ
├── AccountPage.tsx            # アカウントページ
├── HelpPage.tsx               # ヘルプページ
├── ShopPage.tsx               # ショップページ
├── ShopItemDialog.tsx         # ショップアイテムダイアログ
├── ShopBuyResultPage.tsx      # ショップ購入結果ページ
├── SettingsPage.tsx           # 設定ページ
└── index.ts
```

### 状態管理 (src/stores/)
```
packages/bubblepop/src/stores/
├── GameStore.ts               # ゲーム状態管理
├── SettingsStore.ts           # 設定状態管理
├── PlayerStore.ts             # プレイヤーデータ管理
├── UIStore.ts                 # UI状態管理
├── AudioStore.ts              # 音響状態管理
└── index.ts
```

### カスタムフック (src/hooks/)
```
packages/bubblepop/src/hooks/
├── useGameState.ts            # ゲーム状態フック
├── useAudio.ts                # 音響フック
├── useLocalStorage.ts         # ローカルストレージフック
├── useDebounce.ts             # デバウンスフック
├── useAnimation.ts            # アニメーションフック
└── index.ts
```

### アニメーション (src/animations/)
```
packages/bubblepop/src/animations/
├── FramerMotionAnimations.ts  # Framer Motionアニメーション
├── GameAnimations.ts          # ゲームアニメーション
├── UIAnimations.ts            # UIアニメーション
└── index.ts
```

### ユーティリティ (src/utils/)
```
packages/bubblepop/src/utils/
├── MathUtils.ts               # 数学ユーティリティ
├── ColorUtils.ts              # 色ユーティリティ
├── TimeUtils.ts               # 時間ユーティリティ
├── ValidationUtils.ts         # バリデーション
├── StorageUtils.ts            # ストレージユーティリティ
├── DeviceUtils.ts             # デバイスユーティリティ
└── index.ts
```

### 型定義 (src/types/)
```
packages/bubblepop/src/types/
├── GameTypes.ts               # ゲーム関連型定義
├── BubbleTypes.ts             # 泡関連型定義
├── UITypes.ts                 # UI関連型定義
├── AudioTypes.ts              # 音響関連型定義
├── StoreTypes.ts              # ストア関連型定義
├── APITypes.ts                # API関連型定義
└── index.ts
```

### アセット (src/assets/)
```
packages/bubblepop/src/assets/
├── images/                    # 画像アセット
├── audio/                     # 音響アセット
├── fonts/                     # フォントアセット
└── icons/                     # アイコンアセット
```

### 共通ゲームロジック (packages/bubblepop-lib/)

#### ゲームエンジン (src/game-engine/)
```
packages/bubblepop-lib/src/game-engine/
├── BubbleManager.ts           # 泡管理システム
├── ScoreManager.ts            # スコア管理システム
├── AchievementManager.ts      # 実績管理システム
├── ItemManager.ts             # アイテム管理システム
├── StageManager.ts            # ステージ管理システム
└── index.ts
```

#### ユーティリティ (src/utils/)
```
packages/bubblepop-lib/src/utils/
├── MathUtils.ts               # 数学ユーティリティ
├── PhysicsUtils.ts            # 物理演算ユーティリティ
├── GameUtils.ts               # ゲームユーティリティ
└── index.ts
```

#### 型定義 (src/types/)
```
packages/bubblepop-lib/src/types/
├── GameTypes.ts               # ゲーム関連型定義
├── BubbleTypes.ts             # 泡関連型定義
├── ScoreTypes.ts              # スコア関連型定義
└── index.ts
```

### UIライブラリ (packages/ui-library/)

#### 共通UIコンポーネント (src/components/)
```
packages/ui-library/src/components/
├── Button/                    # ボタンコンポーネント
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── Card/                      # カードコンポーネント
├── Input/                     # 入力コンポーネント
├── Modal/                     # モーダルコンポーネント
├── Navigation/                # ナビゲーションコンポーネント
└── index.ts
```

#### アニメーション (src/animations/)
```
packages/ui-library/src/animations/
├── FramerMotionAnimations.ts  # Framer Motionアニメーション
├── TransitionAnimations.ts    # トランジションアニメーション
└── index.ts
```

#### ストア (src/stores/)
```
packages/ui-library/src/stores/
├── UIStore.ts                 # UI状態管理
├── ThemeStore.ts              # テーマ状態管理
└── index.ts
```

#### フック (src/hooks/)
```
packages/ui-library/src/hooks/
├── useTheme.ts                # テーマフック
├── useAnimation.ts            # アニメーションフック
└── index.ts
```

#### ユーティリティ (src/utils/)
```
packages/ui-library/src/utils/
├── StyleUtils.ts              # スタイルユーティリティ
├── AnimationUtils.ts          # アニメーションユーティリティ
└── index.ts
```

#### 型定義 (src/types/)
```
packages/ui-library/src/types/
├── ComponentTypes.ts          # コンポーネント型定義
├── ThemeTypes.ts              # テーマ型定義
└── index.ts
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
