# BubblePop 設定システム詳細

**要修正**

## 設定カテゴリ

### 音響設定 (Audio Settings)

#### 基本音量設定
- **masterVolume** (マスター音量)
  - **範囲**: 0.0 - 1.0
  - **デフォルト**: 0.7
  - **説明**: 全体の音量を制御

- **sfxVolume** (効果音音量)
  - **範囲**: 0.0 - 1.0
  - **デフォルト**: 0.8
  - **説明**: 泡を割る音などの効果音音量

- **bgmVolume** (BGM音量)
  - **範囲**: 0.0 - 1.0
  - **デフォルト**: 0.5
  - **説明**: 背景音楽の音量

- **isMuted** (ミュート)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: 全音響のオン/オフ

#### 高度な音響設定
- **イコライザー設定**
  - 5バンドイコライザー (低音、中低音、中音、中高音、高音)
  - 各バンド -12dB ～ +12dB の調整可能

- **音響効果**
  - リバーブ効果のオン/オフ
  - コンプレッサー効果の調整

### 言語設定 (Language Settings)

#### 対応言語
- **language** (表示言語)
  - **選択肢**: 
    - `ja` (日本語) - デフォルト
    - `en` (English)
    - `zh-CN` (中文简体)
    - `zh-TW` (中文繁體)
    - `ko` (한국어)
  - **自動検出**: ブラウザ言語から自動設定

#### 地域設定
- **数値フォーマット**: 各言語に応じた数値表示
- **日付フォーマット**: 地域別の日付表示形式
- **通貨表示**: 地域に応じた通貨記号

### 品質設定 (Quality Settings)

#### 描画品質
- **quality** (品質レベル)
  - **選択肢**:
    - `auto` (自動) - デフォルト
    - `low` (低品質)
    - `medium` (中品質)
    - `high` (高品質)
    - `ultra` (最高品質)

#### パフォーマンス設定
- **フレームレート制限**
  - 30fps / 60fps / 無制限
- **パーティクル数制限**
  - 低 (50%) / 中 (75%) / 高 (100%) / 最大 (150%)
- **エフェクト品質**
  - 簡易 / 標準 / 高品質 / 最高品質

### アクセシビリティ設定 (Accessibility Settings)

#### 視覚的アクセシビリティ
- **highContrast** (高コントラスト)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: 高コントラストモードの有効化

- **reducedMotion** (モーション軽減)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: アニメーションの軽減

- **largeText** (大きな文字)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: 文字サイズの拡大

- **fontSize** (フォントサイズ)
  - **選択肢**: `small`, `medium`, `large`, `extra-large`
  - **デフォルト**: `medium`

- **contrastLevel** (コントラストレベル)
  - **選択肢**: `normal`, `high`, `maximum`
  - **デフォルト**: `normal`

#### 操作的アクセシビリティ
- **keyboardNavigation** (キーボードナビゲーション)
  - **タイプ**: boolean
  - **デフォルト**: true
  - **説明**: キーボード操作の有効化

- **screenReader** (スクリーンリーダー対応)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: スクリーンリーダー最適化

- **voiceGuidance** (音声ガイダンス)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: 音声による操作ガイド

#### 色覚対応
- **colorBlindSupport** (色覚異常対応)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: 色覚異常者向けの表示調整

### 操作設定 (Control Settings)

#### 入力デバイス
- **keyboardEnabled** (キーボード有効)
  - **タイプ**: boolean
  - **デフォルト**: true

- **mouseEnabled** (マウス有効)
  - **タイプ**: boolean
  - **デフォルト**: true

- **touchEnabled** (タッチ有効)
  - **タイプ**: boolean
  - **デフォルト**: true

#### 操作感度
- **clickSensitivity** (クリック感度)
  - **範囲**: 0.5 - 2.0
  - **デフォルト**: 1.0

- **dragSensitivity** (ドラッグ感度)
  - **範囲**: 0.5 - 2.0
  - **デフォルト**: 1.0

### キーボードショートカット設定

#### 基本操作
- **pause** (一時停止)
  - **デフォルト**: `['Space']`
  - **説明**: ゲームの一時停止/再開

- **menu** (メニュー)
  - **デフォルト**: `['Escape']`
  - **説明**: メニューを開く/戻る

- **settings** (設定)
  - **デフォルト**: `['KeyS']`
  - **説明**: 設定画面を開く

- **help** (ヘルプ)
  - **デフォルト**: `['KeyH', 'F1']`
  - **説明**: ヘルプ画面を開く

#### 削除されたショートカット (Issue #170)
- **fullscreen** (フルスクリーン): `KeyF` - 削除済み
- **mute** (ミュート): `KeyM` - 削除済み

*注記: これらの機能は設定画面UIから利用できます*

### UI設定 (User Interface Settings)

#### 表示設定
- **showFPS** (FPS表示)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: フレームレートの表示

- **showDebugInfo** (デバッグ情報表示)
  - **タイプ**: boolean
  - **デフォルト**: false
  - **説明**: デバッグ情報の表示

- **animationSpeed** (アニメーション速度)
  - **範囲**: 0.5 - 2.0
  - **デフォルト**: 1.0
  - **説明**: UIアニメーションの速度

- **uiScale** (UI拡大率)
  - **範囲**: 0.8 - 2.0
  - **デフォルト**: 1.0
  - **説明**: UI要素のサイズ調整

### ソーシャル共有設定 (Social Sharing Settings)

#### 基本設定
- **enableSharing** (共有機能有効)
  - **タイプ**: boolean
  - **デフォルト**: true

- **autoPromptHighScore** (ハイスコア時自動プロンプト)
  - **タイプ**: boolean
  - **デフォルト**: true

- **autoPromptAchievements** (実績解除時自動プロンプト)
  - **タイプ**: boolean
  - **デフォルト**: true

#### 共有設定
- **defaultPlatform** (デフォルトプラットフォーム)
  - **選択肢**: `auto`, `twitter`, `facebook`, `native`
  - **デフォルト**: `auto`

- **includeScreenshot** (スクリーンショット含む)
  - **タイプ**: boolean
  - **デフォルト**: true

- **screenshotQuality** (スクリーンショット品質)
  - **選択肢**: `low`, `medium`, `high`
  - **デフォルト**: `high`

- **privacyLevel** (プライバシーレベル)
  - **選択肢**: `public`, `friends`, `private`
  - **デフォルト**: `public`

### 通知設定 (Notification Settings)

#### チャレンジ通知
- **challenges.enabled** (チャレンジ通知有効)
  - **デフォルト**: true
- **challenges.newChallenge** (新チャレンジ通知)
  - **デフォルト**: true
- **challenges.challengeComplete** (チャレンジ完了通知)
  - **デフォルト**: true
- **challenges.dailyReminder** (デイリーリマインダー)
  - **デフォルト**: true
- **challenges.weeklyReminder** (ウィークリーリマインダー)
  - **デフォルト**: true

#### 実績通知
- **achievements.enabled** (実績通知有効)
  - **デフォルト**: true
- **achievements.unlocked** (実績解除通知)
  - **デフォルト**: true
- **achievements.progress** (進捗通知)
  - **デフォルト**: false
- **achievements.rare** (レア実績通知)
  - **デフォルト**: true

#### リーダーボード通知
- **leaderboard.enabled** (リーダーボード通知有効)
  - **デフォルト**: true
- **leaderboard.newRecord** (新記録通知)
  - **デフォルト**: true
- **leaderboard.rankChange** (ランク変動通知)
  - **デフォルト**: false

#### システム通知
- **system.enabled** (システム通知有効)
  - **デフォルト**: true
- **system.updates** (アップデート通知)
  - **デフォルト**: true
- **system.maintenance** (メンテナンス通知)
  - **デフォルト**: true

### プライバシー設定 (Privacy Settings)

#### データ収集
- **dataCollection** (データ収集)
  - **タイプ**: boolean
  - **デフォルト**: true
  - **説明**: 匿名使用データの収集

- **analytics** (分析データ)
  - **タイプ**: boolean
  - **デフォルト**: true
  - **説明**: ゲーム分析データの送信

- **crashReports** (クラッシュレポート)
  - **タイプ**: boolean
  - **デフォルト**: true
  - **説明**: エラー情報の自動送信

## 設定システムの仕組み

### 設定管理アーキテクチャ

#### ConfigurationManager
- **中央集権的管理**: 全設定を一元管理
- **カテゴリ分類**: 設定を論理的にグループ化
- **バリデーション**: 設定値の妥当性チェック
- **変更監視**: 設定変更の即座な反映

#### 設定の保存
- **LocalStorage**: ブラウザのローカルストレージに保存
- **JSON形式**: 構造化されたデータ形式
- **自動保存**: 設定変更時の自動保存
- **バックアップ**: 設定データの復旧機能

### 設定の適用システム

#### リアルタイム反映
- **即座適用**: 設定変更の即座な反映
- **プレビュー機能**: 変更前の確認機能
- **ロールバック**: 変更の取り消し機能

#### システム連携
- **音響システム**: 音量設定の即座反映
- **描画システム**: 品質設定の動的変更
- **入力システム**: キーボード設定の更新

### 設定のインポート/エクスポート

#### エクスポート機能
- **JSON形式**: 設定データのJSON出力
- **選択的エクスポート**: 特定カテゴリのみ出力
- **暗号化**: 設定データの暗号化オプション

#### インポート機能
- **ファイル読み込み**: JSON設定ファイルの読み込み
- **バリデーション**: インポートデータの検証
- **マージ機能**: 既存設定との統合

### アクセシビリティプロファイル

#### プリセット機能
- **視覚障害者向け**: 高コントラスト + 音声ガイド
- **聴覚障害者向け**: 視覚フィードバック強化
- **運動機能障害者向け**: 操作簡素化
- **認知障害者向け**: UI簡素化

#### カスタムプロファイル
- **個人設定**: ユーザー独自の設定組み合わせ
- **プロファイル保存**: 複数プロファイルの管理
- **簡単切り替え**: ワンクリックでの切り替え

## 設定の技術実装

### データ構造
```javascript
{
  "audio": {
    "masterVolume": 0.7,
    "sfxVolume": 0.8,
    "bgmVolume": 0.5,
    "isMuted": false
  },
  "ui": {
    "language": "ja",
    "quality": "auto",
    "showFPS": false
  },
  "accessibility": {
    "highContrast": false,
    "reducedMotion": false,
    "largeText": false
  },
  "controls": {
    "keyboardEnabled": true,
    "mouseEnabled": true
  },
  "keyboardShortcuts": {
    "pause": ["Space"],
    "menu": ["Escape"]
  }
}
```

### バリデーションルール
- **型チェック**: boolean, number, string の型検証
- **範囲チェック**: 数値の最小/最大値検証
- **選択肢チェック**: 有効な選択肢の検証
- **依存関係**: 設定間の依存関係チェック

### パフォーマンス最適化
- **遅延適用**: 設定変更の遅延適用
- **バッチ処理**: 複数設定の一括処理
- **キャッシュ**: 頻繁にアクセスされる設定のキャッシュ
- **差分更新**: 変更された設定のみ更新