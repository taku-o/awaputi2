# BubblePop アセット一覧

## 概要
BubblePopアプリケーションで使用する画像、音声、フォントなどのアセットの具体的なファイル名とパスの一覧です。実装時にアセットを配置する際の指針として使用してください。

## 画像アセット

### ロゴ・アイコン
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `GameLogo` | `packages/bubblepop/src/assets/images/logo/game-logo.png` | png | タイトル画面、ヘッダー |
| `GameLogoIcon` | `packages/bubblepop/src/assets/images/logo/game-logo-icon.png` | png | ファビコン、小サイズ表示 |
| `BubbleIcon` | `packages/bubblepop/src/assets/images/logo/bubble-icon.png` | png | ロゴ内の泡アイコン |
| `Favicon` | `packages/bubblepop/public/favicon.ico` | ico | ブラウザタブアイコン |

### ハンマーカーソル
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `HammerCursorIdle` | `packages/bubblepop/src/assets/images/cursor/hammer-idle.png` | png | ゲームプレイ中の待機状態カーソル |
| `HammerCursorSwing` | `packages/bubblepop/src/assets/images/cursor/hammer-swing.png` | png | ゲームプレイ中の振りかぶり状態カーソル |
| `HammerCursorHit` | `packages/bubblepop/src/assets/images/cursor/hammer-hit.png` | png | ゲームプレイ中の叩き状態カーソル |

### 泡タイプ画像
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `BubbleNormal` | `packages/bubblepop/src/assets/images/bubbles/bubble-normal.png` | png | 通常泡の表示 |
| `BubbleStone` | `packages/bubblepop/src/assets/images/bubbles/bubble-stone.png` | png | 石泡の表示 |
| `BubbleIron` | `packages/bubblepop/src/assets/images/bubbles/bubble-iron.png` | png | 鉄泡の表示 |
| `BubbleDiamond` | `packages/bubblepop/src/assets/images/bubbles/bubble-diamond.png` | png | ダイヤモンド泡の表示 |
| `BubblePink` | `packages/bubblepop/src/assets/images/bubbles/bubble-pink.png` | png | 回復泡の表示 |
| `BubblePoison` | `packages/bubblepop/src/assets/images/bubbles/bubble-poison.png` | png | 毒泡の表示 |
| `BubbleRainbow` | `packages/bubblepop/src/assets/images/bubbles/bubble-rainbow.png` | png | 虹色泡の表示 |
| `BubbleClock` | `packages/bubblepop/src/assets/images/bubbles/bubble-clock.png` | png | 時計泡の表示 |
| `BubbleScore` | `packages/bubblepop/src/assets/images/bubbles/bubble-score.png` | png | スコア泡の表示 |
| `BubbleSpike` | `packages/bubblepop/src/assets/images/bubbles/bubble-spike.png` | png | トゲ泡の表示 |
| `BubbleElectric` | `packages/bubblepop/src/assets/images/bubbles/bubble-electric.png` | png | 電気泡の表示 |
| `BubbleEscape` | `packages/bubblepop/src/assets/images/bubbles/bubble-escape.png` | png | 逃げる泡の表示 |
| `BubbleCrack` | `packages/bubblepop/src/assets/images/bubbles/bubble-crack.png` | png | ひび泡の表示 |
| `BubbleBoss` | `packages/bubblepop/src/assets/images/bubbles/bubble-boss.png` | png | ボス泡の表示 |
| `BubbleGolden` | `packages/bubblepop/src/assets/images/bubbles/bubble-golden.png` | png | 黄金泡の表示 |
| `BubbleFrozen` | `packages/bubblepop/src/assets/images/bubbles/bubble-frozen.png` | png | 氷泡の表示 |
| `BubbleMagnetic` | `packages/bubblepop/src/assets/images/bubbles/bubble-magnetic.png` | png | 磁石泡の表示 |
| `BubbleExplosive` | `packages/bubblepop/src/assets/images/bubbles/bubble-explosive.png` | png | 爆発泡の表示 |
| `BubblePhantom` | `packages/bubblepop/src/assets/images/bubbles/bubble-phantom.png` | png | 幻影泡の表示 |
| `BubbleMultiplier` | `packages/bubblepop/src/assets/images/bubbles/bubble-multiplier.png` | png | 倍率泡の表示 |

### UI要素画像
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `ButtonPrimary` | `packages/bubblepop/src/assets/images/ui/button-primary.png` | png | プライマリボタンの背景 |
| `ButtonSecondary` | `packages/bubblepop/src/assets/images/ui/button-secondary.png` | png | セカンダリボタンの背景 |
| `ButtonGameStart` | `packages/bubblepop/src/assets/images/ui/button-game-start.png` | png | ゲームスタートボタンの背景 |
| `ButtonGiveUp` | `packages/bubblepop/src/assets/images/ui/button-give-up.png` | png | ギブアップボタンの背景 |
| `ButtonPlayAgain` | `packages/bubblepop/src/assets/images/ui/button-play-again.png` | png | もう一度プレイボタンの背景 |
| `ButtonPurchase` | `packages/bubblepop/src/assets/images/ui/button-purchase.png` | png | 購入ボタンの背景 |
| `ButtonSave` | `packages/bubblepop/src/assets/images/ui/button-save.png` | png | 保存ボタンの背景 |
| `ButtonReset` | `packages/bubblepop/src/assets/images/ui/button-reset.png` | png | リセットボタンの背景 |
| `ButtonClose` | `packages/bubblepop/src/assets/images/ui/button-close.png` | png | 閉じるボタンの背景 |
| `CardStage` | `packages/bubblepop/src/assets/images/ui/card-stage.png` | png | ステージカードの背景 |
| `CardItem` | `packages/bubblepop/src/assets/images/ui/card-item.png` | png | アイテムカードの背景 |
| `CardAchievement` | `packages/bubblepop/src/assets/images/ui/card-achievement.png` | png | 実績カードの背景 |
| `DialogBackground` | `packages/bubblepop/src/assets/images/ui/dialog-background.png` | png | ダイアログの背景 |
| `ModalBackground` | `packages/bubblepop/src/assets/images/ui/modal-background.png` | png | モーダルの背景 |

### ゲームUI画像
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `HPBarBackground` | `packages/bubblepop/src/assets/images/ui/hp-bar-background.png` | png | HPバーの背景 |
| `HPBarFill` | `packages/bubblepop/src/assets/images/ui/hp-bar-fill.png` | png | HPバーの塗りつぶし部分 |
| `ProgressBarBackground` | `packages/bubblepop/src/assets/images/ui/progress-bar-background.png` | png | プログレスバーの背景 |
| `ProgressBarFill` | `packages/bubblepop/src/assets/images/ui/progress-bar-fill.png` | png | プログレスバーの塗りつぶし部分 |
| `TimerBackground` | `packages/bubblepop/src/assets/images/ui/timer-background.png` | png | タイマー表示の背景 |
| `ScoreBackground` | `packages/bubblepop/src/assets/images/ui/score-background.png` | png | スコア表示の背景 |
| `ComboBackground` | `packages/bubblepop/src/assets/images/ui/combo-background.png` | png | コンボ表示の背景 |

### 背景・装飾画像
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `BackgroundTitle` | `packages/bubblepop/src/assets/images/backgrounds/background-title.png` | png | タイトル画面の背景 |
| `BackgroundMain` | `packages/bubblepop/src/assets/images/backgrounds/background-main.png` | png | メイン画面の背景 |
| `BackgroundGame` | `packages/bubblepop/src/assets/images/backgrounds/background-game.png` | png | ゲームプレイ画面の背景 |
| `BackgroundShop` | `packages/bubblepop/src/assets/images/backgrounds/background-shop.png` | png | ショップ画面の背景 |
| `BackgroundSettings` | `packages/bubblepop/src/assets/images/backgrounds/background-settings.png` | png | 設定画面の背景 |
| `BackgroundHelp` | `packages/bubblepop/src/assets/images/backgrounds/background-help.png` | png | ヘルプ画面の背景 |
| `BackgroundAccount` | `packages/bubblepop/src/assets/images/backgrounds/background-account.png` | png | アカウント画面の背景 |
| `BubbleDecoration1` | `packages/bubblepop/src/assets/images/decorations/bubble-decoration-1.png` | png | 装飾用の泡（背景） |
| `BubbleDecoration2` | `packages/bubblepop/src/assets/images/decorations/bubble-decoration-2.png` | png | 装飾用の泡（背景） |
| `BubbleDecoration3` | `packages/bubblepop/src/assets/images/decorations/bubble-decoration-3.png` | png | 装飾用の泡（背景） |

### エフェクト画像
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `ParticleBubblePop` | `packages/bubblepop/src/assets/images/effects/particle-bubble-pop.png` | png | 泡破裂時のパーティクル |
| `ParticleHeal` | `packages/bubblepop/src/assets/images/effects/particle-heal.png` | png | 回復エフェクトのパーティクル |
| `ParticlePoison` | `packages/bubblepop/src/assets/images/effects/particle-poison.png` | png | 毒エフェクトのパーティクル |
| `ParticleElectric` | `packages/bubblepop/src/assets/images/effects/particle-electric.png` | png | 電気エフェクトのパーティクル |
| `ParticleExplosion` | `packages/bubblepop/src/assets/images/effects/particle-explosion.png` | png | 爆発エフェクトのパーティクル |
| `TrailEffect` | `packages/bubblepop/src/assets/images/effects/trail-effect.png` | png | ハンマーの軌跡エフェクト |
| `ShockwaveEffect` | `packages/bubblepop/src/assets/images/effects/shockwave-effect.png` | png | 衝撃波エフェクト |
| `ScreenShakeOverlay` | `packages/bubblepop/src/assets/images/effects/screen-shake-overlay.png` | png | 画面シェイク時のオーバーレイ |

### ステージ画像
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `StageTutorial` | `packages/bubblepop/src/assets/images/stages/stage-tutorial.png` | png | チュートリアルステージの背景 |
| `StageNormal` | `packages/bubblepop/src/assets/images/stages/stage-normal.png` | png | 普通のアワアワステージの背景 |
| `StageHard` | `packages/bubblepop/src/assets/images/stages/stage-hard.png` | png | ちょっと硬いアワアワステージの背景 |
| `StageVeryHard` | `packages/bubblepop/src/assets/images/stages/stage-very-hard.png` | png | かなり硬いアワアワステージの背景 |
| `StageSpecial` | `packages/bubblepop/src/assets/images/stages/stage-special.png` | png | 特殊なアワアワステージの背景 |
| `StageNightmare` | `packages/bubblepop/src/assets/images/stages/stage-nightmare.png` | png | 悪夢のアワアワステージの背景 |
| `StageChaos` | `packages/bubblepop/src/assets/images/stages/stage-chaos.png` | png | カオスなアワアワステージの背景 |
| `StageUltimate` | `packages/bubblepop/src/assets/images/stages/stage-ultimate.png` | png | 究極のアワアワステージの背景 |
| `StageAllInOne` | `packages/bubblepop/src/assets/images/stages/stage-all-in-one.png` | png | 全部入りアワアワステージの背景 |
| `StageBoss` | `packages/bubblepop/src/assets/images/stages/stage-boss.png` | png | ボスアワアワステージの背景 |

## 音声アセット

### 効果音 (SFX)
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `BubblePopNormal` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-normal.mp3` | mp3 | 通常泡を割った時の音 |
| `BubblePopStone` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-stone.mp3` | mp3 | 石泡を割った時の音 |
| `BubblePopIron` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-iron.mp3` | mp3 | 鉄泡を割った時の音 |
| `BubblePopDiamond` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-diamond.mp3` | mp3 | ダイヤモンド泡を割った時の音 |
| `BubblePopRainbow` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-rainbow.mp3` | mp3 | 虹色泡を割った時の音 |
| `BubblePopPink` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-pink.mp3` | mp3 | 回復泡を割った時の音 |
| `BubblePopPoison` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-poison.mp3` | mp3 | 毒泡を割った時の音 |
| `BubblePopBoss` | `packages/bubblepop/src/assets/audio/sfx/bubble-pop-boss.mp3` | mp3 | ボス泡を割った時の音 |
| `UIClick` | `packages/bubblepop/src/assets/audio/sfx/ui-click.mp3` | mp3 | UI要素のクリック音 |
| `UIHover` | `packages/bubblepop/src/assets/audio/sfx/ui-hover.mp3` | mp3 | UI要素のホバー音 |
| `UIError` | `packages/bubblepop/src/assets/audio/sfx/ui-error.mp3` | mp3 | エラー発生時の音 |
| `UISuccess` | `packages/bubblepop/src/assets/audio/sfx/ui-success.mp3` | mp3 | 成功時の音 |
| `ComboSound` | `packages/bubblepop/src/assets/audio/sfx/combo-sound.mp3` | mp3 | コンボ発生時の音 |
| `DamageSound` | `packages/bubblepop/src/assets/audio/sfx/damage-sound.mp3` | mp3 | ダメージ受けた時の音 |
| `HealSound` | `packages/bubblepop/src/assets/audio/sfx/heal-sound.mp3` | mp3 | 回復時の音 |
| `TimeStopSound` | `packages/bubblepop/src/assets/audio/sfx/time-stop-sound.mp3` | mp3 | 時間停止効果時の音 |
| `ExplosionSound` | `packages/bubblepop/src/assets/audio/sfx/explosion-sound.mp3` | mp3 | 爆発効果時の音 |

### 背景音楽 (BGM)
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `MenuTheme` | `packages/bubblepop/src/assets/audio/bgm/menu-theme.mp3` | mp3 | メインページのBGM |
| `GameplayTheme` | `packages/bubblepop/src/assets/audio/bgm/gameplay-theme.mp3` | mp3 | ゲームプレイ中のBGM |
| `GameplayIntense` | `packages/bubblepop/src/assets/audio/bgm/gameplay-intense.mp3` | mp3 | 高難易度ステージのBGM |
| `ShopTheme` | `packages/bubblepop/src/assets/audio/bgm/shop-theme.mp3` | mp3 | ショップ画面のBGM |
| `SettingsTheme` | `packages/bubblepop/src/assets/audio/bgm/settings-theme.mp3` | mp3 | 設定画面のBGM |
| `HelpTheme` | `packages/bubblepop/src/assets/audio/bgm/help-theme.mp3` | mp3 | ヘルプ画面のBGM |
| `AccountTheme` | `packages/bubblepop/src/assets/audio/bgm/account-theme.mp3` | mp3 | アカウント画面のBGM |
| `AmbientBubbles` | `packages/bubblepop/src/assets/audio/bgm/ambient-bubbles.mp3` | mp3 | 環境音（泡の音） |

### 通知音響
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `AchievementUnlocked` | `packages/bubblepop/src/assets/audio/notifications/achievement-unlocked.mp3` | mp3 | 実績解除時の音 |
| `LevelUp` | `packages/bubblepop/src/assets/audio/notifications/level-up.mp3` | mp3 | レベルアップ時の音 |
| `NewRecord` | `packages/bubblepop/src/assets/audio/notifications/new-record.mp3` | mp3 | 新記録達成時の音 |
| `StageUnlocked` | `packages/bubblepop/src/assets/audio/notifications/stage-unlocked.mp3` | mp3 | ステージ解放時の音 |
| `WarningSound` | `packages/bubblepop/src/assets/audio/notifications/warning-sound.mp3` | mp3 | 警告音 |

## フォントアセット

### メインフォント
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `MainFontRegular` | `packages/bubblepop/src/assets/fonts/main-font-regular.woff2` | woff2 | メインのテキスト表示 |
| `MainFontBold` | `packages/bubblepop/src/assets/fonts/main-font-bold.woff2` | woff2 | 太字のテキスト表示 |
| `MainFontLight` | `packages/bubblepop/src/assets/fonts/main-font-light.woff2` | woff2 | 細字のテキスト表示 |

### ゲーム用フォント
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `GameFontRegular` | `packages/bubblepop/src/assets/fonts/game-font-regular.woff2` | woff2 | ゲーム内のテキスト表示 |
| `GameFontBold` | `packages/bubblepop/src/assets/fonts/game-font-bold.woff2` | woff2 | ゲーム内の太字テキスト |
| `ScoreFont` | `packages/bubblepop/src/assets/fonts/score-font.woff2` | woff2 | スコア表示専用フォント |
| `TimerFont` | `packages/bubblepop/src/assets/fonts/timer-font.woff2` | woff2 | タイマー表示専用フォント |

### 装飾フォント
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `TitleFont` | `packages/bubblepop/src/assets/fonts/title-font.woff2` | woff2 | タイトル表示用フォント |
| `DecorativeFont` | `packages/bubblepop/src/assets/fonts/decorative-font.woff2` | woff2 | 装飾用フォント |

## アイコンアセット

### UIアイコン
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `IconPlay` | `packages/bubblepop/src/assets/icons/ui/icon-play.png` | png | 再生・開始アイコン |
| `IconPause` | `packages/bubblepop/src/assets/icons/ui/icon-pause.png` | png | 一時停止アイコン |
| `IconStop` | `packages/bubblepop/src/assets/icons/ui/icon-stop.png` | png | 停止アイコン |
| `IconSettings` | `packages/bubblepop/src/assets/icons/ui/icon-settings.png` | png | 設定アイコン |
| `IconHelp` | `packages/bubblepop/src/assets/icons/ui/icon-help.png` | png | ヘルプアイコン |
| `IconShop` | `packages/bubblepop/src/assets/icons/ui/icon-shop.png` | png | ショップアイコン |
| `IconAccount` | `packages/bubblepop/src/assets/icons/ui/icon-account.png` | png | アカウントアイコン |
| `IconBack` | `packages/bubblepop/src/assets/icons/ui/icon-back.png` | png | 戻るアイコン |
| `IconClose` | `packages/bubblepop/src/assets/icons/ui/icon-close.png` | png | 閉じるアイコン |
| `IconSave` | `packages/bubblepop/src/assets/icons/ui/icon-save.png` | png | 保存アイコン |
| `IconReset` | `packages/bubblepop/src/assets/icons/ui/icon-reset.png` | png | リセットアイコン |
| `IconPurchase` | `packages/bubblepop/src/assets/icons/ui/icon-purchase.png` | png | 購入アイコン |

### ゲームアイコン
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `IconHP` | `packages/bubblepop/src/assets/icons/game/icon-hp.png` | png | HP表示用アイコン |
| `IconScore` | `packages/bubblepop/src/assets/icons/game/icon-score.png` | png | スコア表示用アイコン |
| `IconCombo` | `packages/bubblepop/src/assets/icons/game/icon-combo.png` | png | コンボ表示用アイコン |
| `IconTime` | `packages/bubblepop/src/assets/icons/game/icon-time.png` | png | 時間表示用アイコン |
| `IconLevel` | `packages/bubblepop/src/assets/icons/game/icon-level.png` | png | レベル表示用アイコン |
| `IconAP` | `packages/bubblepop/src/assets/icons/game/icon-ap.png` | png | AP表示用アイコン |
| `IconTAP` | `packages/bubblepop/src/assets/icons/game/icon-tap.png` | png | TAP表示用アイコン |

### ステータスアイコン
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `IconLocked` | `packages/bubblepop/src/assets/icons/status/icon-locked.png` | png | ロック状態アイコン |
| `IconUnlocked` | `packages/bubblepop/src/assets/icons/status/icon-unlocked.png` | png | アンロック状態アイコン |
| `IconCompleted` | `packages/bubblepop/src/assets/icons/status/icon-completed.png` | png | 完了状態アイコン |
| `IconInProgress` | `packages/bubblepop/src/assets/icons/status/icon-in-progress.png` | png | 進行中状態アイコン |
| `IconNew` | `packages/bubblepop/src/assets/icons/status/icon-new.png` | png | 新着状態アイコン |

## Storybook用アセット

### プレースホルダー画像
| 論理名 | ファイルパス | フォーマット | 使用箇所 |
|--------|-------------|-------------|----------|
| `PlaceholderCard` | `packages/storybook-docs/public/placeholder-card.svg` | svg | StorybookのCardコンポーネントストーリー用プレースホルダー画像 |

## アセット管理の注意事項

### ファイル命名規則
- 論理名はPascalCaseで記述
- ファイル名はkebab-caseで記述
- 同じ種類のアセットは統一されたプレフィックスを使用

### ディレクトリ構造
- アセットは種類別にディレクトリを分けて管理
- 各パッケージ内の`src/assets/`ディレクトリに配置
- 静的ファイルは`public/`ディレクトリに配置
- Storybook用アセットは`packages/storybook-docs/public/`ディレクトリに配置

### フォーマット選択
- 画像: PNG（透明度が必要な場合）、JPEG（写真系）
- 音声: MP3（互換性重視）、OGG（高品質）
- フォント: WOFF2（最新ブラウザ対応）、WOFF（フォールバック）
- プレースホルダー: SVG（スケーラブル、軽量）

### 品質設定
- 高品質: 高解像度、高ビットレート
- 中品質: 標準解像度、標準ビットレート
- 低品質: 低解像度、低ビットレート（低性能デバイス用）

このアセット一覧を参考に、実装時に必要なアセットを適切な場所に配置してください。
