# BubblePop システム構成

## 全体アーキテクチャ

### 技術スタック
- **フロントエンド**: HTML5 Canvas + JavaScript (ES6 modules)
- **ビルドツール**: Vite
- **状態管理**: 独自のConfigurationManager
- **PWA**: Service Worker + Manifest
- **テスト**: Jest (単体) + Playwright (E2E)

### ディレクトリ構造
```
src/
├── core/                     # コアゲームエンジン
│   ├── GameEngine.js        # メインゲームエンジン
│   ├── SceneManager.js      # シーン管理
│   ├── PlayerData.js        # プレイヤーデータ
│   ├── SettingsManager.js   # 設定管理
│   └── achievements/        # 実績システム
├── scenes/                   # ゲームシーン
│   ├── MainMenuScene.js     # メインメニュー
│   ├── GameScene.js         # ゲームプレイ
│   ├── SettingsScene.js     # 設定画面
│   └── components/          # シーンコンポーネント
├── managers/                 # システム管理
│   ├── BubbleManager.js     # 泡管理
│   └── ScoreManager.js      # スコア管理
├── audio/                    # 音響システム
│   ├── AudioManager.js      # 音響管理
│   ├── BGMSystem.js         # BGM制御
│   └── SoundEffectSystem.js # 効果音制御
├── effects/                  # エフェクトシステム
│   ├── EffectManager.js     # エフェクト管理
│   ├── ParticleManager.js   # パーティクル
│   └── AnimationManager.js  # アニメーション
├── bubbles/                  # 泡システム
│   └── Bubble.js            # 泡クラス
├── utils/                    # ユーティリティ
│   ├── ErrorHandler.js      # エラー処理
│   ├── MemoryManager.js     # メモリ管理
│   └── PerformanceOptimizer.js # パフォーマンス最適化
├── config/                   # 設定ファイル
│   ├── GameConfig.js        # ゲーム設定
│   └── GameBalance.js       # バランス調整
├── locales/                  # 多言語リソース
│   ├── ja/                  # 日本語
│   ├── en/                  # 英語
│   └── [他言語]/
└── accessibility/            # アクセシビリティ
    └── [アクセシビリティ機能]
```

## コアシステム

### GameEngine (ゲームエンジン)
- **役割**: 全システムの統合・制御
- **主要機能**:
  - シーン管理
  - ゲームループ制御
  - システム間連携
  - パフォーマンス監視

### SceneManager (シーン管理)
- **役割**: 画面遷移とシーン制御
- **管理シーン**:
  - MainMenuScene (メインメニュー)
  - GameScene (ゲームプレイ)
  - SettingsScene (設定)
  - HelpScene (ヘルプ)
  - StageSelectScene (ステージ選択)

### ConfigurationManager (設定管理)
- **役割**: 全設定の一元管理
- **機能**:
  - 設定値の保存・読み込み
  - 設定変更の監視
  - バリデーション
  - デフォルト値管理

## ゲームシステム

### BubbleManager (泡管理)
- **役割**: 泡の生成・更新・削除
- **機能**:
  - 泡の生成ロジック
  - 衝突判定
  - 泡の状態管理
  - 特殊効果処理

### ScoreManager (スコア管理)
- **役割**: スコア計算とコンボ管理
- **機能**:
  - 基本スコア計算
  - コンボ倍率適用
  - 年齢ボーナス
  - 特殊泡ボーナス

### AchievementManager (実績管理)
- **役割**: 実績の進捗追跡と解除
- **機能**:
  - 実績条件チェック
  - 進捗計算
  - 通知システム
  - 報酬付与

## 音響・視覚システム

### AudioManager (音響管理)
- **役割**: 音響システムの統合制御
- **サブシステム**:
  - BGMSystem (背景音楽)
  - SoundEffectSystem (効果音)
  - AudioContextManager (Web Audio API)
  - ProceduralSoundGenerator (音響生成)

### EffectManager (エフェクト管理)
- **役割**: 視覚効果の制御
- **機能**:
  - 画面揺れ
  - フラッシュ効果
  - ズーム効果
  - 色調変更

### ParticleManager (パーティクル管理)
- **役割**: パーティクル効果の制御
- **機能**:
  - パーティクル生成
  - 物理シミュレーション
  - レンダリング最適化
  - メモリ管理

## データ管理

### PlayerData (プレイヤーデータ)
- **保存データ**:
  - ユーザー名
  - レベル・経験値
  - 累計スコア
  - 解放ステージ
  - 実績進捗
  - 設定値

### LocalStorage構造
```javascript
{
  "bubblePopPlayerData": {
    "username": "プレイヤー名",
    "level": 1,
    "experience": 0,
    "totalScore": 0,
    "unlockedStages": ["tutorial", "normal"],
    "achievements": [...],
    "settings": {...}
  }
}
```

## パフォーマンス最適化

### メモリ管理
- オブジェクトプール
- ガベージコレクション最適化
- メモリリーク検出

### レンダリング最適化
- フレームレート制御
- カリング処理
- バッチレンダリング

### 品質制御
- 動的品質調整
- デバイス性能検出
- 負荷分散

## セキュリティ・エラー処理

### ErrorHandler (エラー処理)
- **機能**:
  - エラーキャッチ・ログ
  - ユーザーフレンドリーなエラー表示
  - 復旧処理
  - デバッグ情報収集

### セキュリティ対策
- XSS対策
- データバリデーション
- セキュアな設定管理
- プライバシー保護

## 拡張性・保守性

### モジュラー設計
- ES6 modules
- 依存関係の明確化
- インターフェース統一
- プラグイン対応

### 設定駆動
- 外部設定ファイル
- 動的設定変更
- A/Bテスト対応
- 環境別設定