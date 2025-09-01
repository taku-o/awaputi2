# BubblePop UI/UX デザイン仕様

## 概要
BubblePopゲームのユーザーインターフェースとユーザーエクスペリエンスに関する包括的なデザイン仕様書です。Framer MotionによるアニメーションとZustandによる状態管理を活用し、直感的で魅力的なゲーム体験を提供するためのUI/UX要素を定義します。

## カーソルシステム

### ゲームプレイ中のカーソル

#### ハンマーカーソルの基本仕様
```javascript
const hammerCursor = {
  // 基本設定
  icon: 'hammer',
  size: { width: 32, height: 32 },
  offset: { x: -16, y: -16 }, // クリック位置からのオフセット
  
  // 状態別アイコン
  states: {
    idle: 'hammer-idle.png',      // 通常状態
    swinging: 'hammer-swing.png', // 振りかぶり中
    hitting: 'hammer-hit.png'     // 叩き中
  },
  
  // 表示条件
  displayConditions: {
    gameActive: true,             // ゲームプレイ中のみ表示
    menuOpen: false,              // メニュー開時は非表示
    dialogOpen: false             // ダイアログ開時は非表示
  }
};
```

#### カーソルの状態管理
```javascript
const cursorStateManager = {
  // 状態遷移
  transitions: {
    idle: ['swinging'],           // 待機 → 振りかぶり
    swinging: ['hitting'],        // 振りかぶり → 叩き
    hitting: ['idle']             // 叩き → 待機
  },
  
  // 状態別の視覚的フィードバック
  visualFeedback: {
    idle: {
      opacity: 1.0,
      scale: 1.0,
      rotation: 0
    },
    swinging: {
      opacity: 0.9,
      scale: 1.1,
      rotation: -45
    },
    hitting: {
      opacity: 1.0,
      scale: 0.9,
      rotation: 15
    }
  }
};
```

### カーソルの表示制御

#### ゲーム状態による切り替え
- **メインメニュー**: 通常の矢印カーソル
- **ゲームプレイ**: ハンマーカーソル
- **ゲームオーバー**: 通常の矢印カーソル
- **設定画面**: 通常の矢印カーソル

#### カーソルの非表示条件
- モバイルデバイス（タッチ操作）
- キーボード操作中
- アクセシビリティ設定で無効化

## クリックアニメーションシステム（Framer Motion実装）

### アニメーションの基本構成

#### 3段階アニメーション
1. **振りかぶり段階** (0-150ms)
   - ハンマーを後ろに振りかぶる
   - 軽微な拡大効果
   - 軌跡エフェクトの表示

2. **叩き段階** (150-250ms)
   - ハンマーを前方に振り下ろす
   - 衝撃波エフェクトの生成
   - 画面シェイク効果

3. **復帰段階** (250ms以降)
   - 元の位置への復帰
   - 次の操作の準備完了

### Framer Motionによる実装
```typescript
import { motion, useAnimation } from 'framer-motion';

const hammerAnimation = {
  swing: {
    rotate: -45,
    scale: 1.2,
    transition: { duration: 0.15, ease: "easeOut" }
  },
  hit: {
    rotate: 15,
    scale: 0.9,
    transition: { duration: 0.1, ease: "easeIn" }
  },
  idle: {
    rotate: 0,
    scale: 1.0,
    transition: { duration: 0.1, ease: "easeOut" }
  }
};
```

### アニメーションの詳細仕様

#### 振りかぶりアニメーション
```javascript
const swingAnimation = {
  duration: 150,                    // 150ms
  easing: 'ease-out',
  
  // 回転アニメーション
  rotation: {
    from: 0,                        // 開始角度
    to: -45,                        // 終了角度（後ろに振りかぶり）
    interpolation: 'linear'         // 線形補間
  },
  
  // スケールアニメーション
  scale: {
    from: 1.0,                      // 開始スケール
    to: 1.2,                        // 終了スケール（軽微な拡大）
    interpolation: 'ease-out'       // イージング補間
  },
  
  // 軌跡エフェクト
  trailEffect: {
    enabled: true,
    color: '#FFD700',               // 金色の軌跡
    opacity: 0.6,
    fadeOut: true,
    duration: 200
  }
};
```

#### 叩きアニメーション
```javascript
const hitAnimation = {
  duration: 100,                    // 100ms
  easing: 'ease-in',
  
  // 回転アニメーション
  rotation: {
    from: -45,                      // 振りかぶり位置から
    to: 15,                         // 前方に叩く
    interpolation: 'ease-in'        // 加速する動き
  },
  
  // スケールアニメーション
  scale: {
    from: 1.2,                      // 振りかぶり時の拡大状態から
    to: 0.9,                        // 叩く時の縮小
    interpolation: 'ease-in'        // 急激な縮小
  },
  
  // 衝撃波エフェクト
  impactEffect: {
    enabled: true,
    color: '#FFFFFF',               // 白色の衝撃波
    radius: { from: 0, to: 50 },   // 0pxから50pxまで拡大
    opacity: { from: 0.8, to: 0 }, // 不透明度の減少
    duration: 150
  }
};
```

### タイミング制御システム

#### 衝撃発生の遅延制御
```javascript
const impactTimingSystem = {
  // クリックから衝撃までの遅延
  impactDelay: 200,                // 200ms
  
  // 遅延の目的
  purposes: [
    'ゲーム性の向上',               // タイミング要素の追加
    'ユーザー体験の向上',           // 操作の可視化
    'アニメーションの完了',         // 視覚的フィードバックの確保
    '物理演算の準備',               // 衝突判定の準備
  ],
  
  // 遅延中の処理
  duringDelay: {
    animation: 'running',           // アニメーション継続
    input: 'locked',                // 入力ロック
    physics: 'preparing',           // 物理演算準備
    effects: 'generating'           // エフェクト生成
  }
};
```

#### アニメーション中の入力制御
```javascript
const inputLockSystem = {
  // 入力ロックの条件
  lockConditions: {
    animationRunning: true,         // アニメーション実行中
    impactDelay: true,              // 衝撃遅延中
    cooldown: true                  // クールダウン中
  },
  
  // ロック中の処理
  lockedBehavior: {
    newClicks: 'ignored',           // 新しいクリックを無視
    existingClicks: 'queued',       // 既存クリックをキュー
    visualFeedback: 'disabled',     // 視覚的フィードバック無効
    audioFeedback: 'disabled'       // 音響的フィードバック無効
  },
  
  // ロック解除条件
  unlockConditions: {
    animationComplete: true,        // アニメーション完了
    impactOccurred: true,           // 衝撃発生完了
    cooldownExpired: true           // クールダウン終了
  }
};
```

## 視覚効果システム（Framer Motion実装）

### 画面シェイク効果

#### シェイクの基本設定
```typescript
import { motion, useAnimation } from 'framer-motion';

const screenShakeVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    y: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.1,
      ease: "easeInOut"
    }
  },
  idle: {
    x: 0,
    y: 0,
    transition: {
      duration: 0.1
    }
  }
};

const screenShakeSystem = {
  // 基本パラメータ
  enabled: true,
  intensity: 0.3,                  // シェイク強度（0.0-1.0）
  duration: 100,                    // シェイク持続時間
  
  // シェイクパターン
  pattern: {
    type: 'random',                 // ランダムシェイク
    frequency: 20,                  // 20Hz
    decay: 'exponential'            // 指数関数的減衰
  },
  
  // シェイク方向
  direction: {
    horizontal: true,               // 水平方向
    vertical: true,                 // 垂直方向
    rotation: false                 // 回転なし
  }
};
```

#### シェイクの適用条件
- **通常泡**: 軽微なシェイク（強度0.1）
- **石泡**: 中程度のシェイク（強度0.3）
- **鉄泡**: 強いシェイク（強度0.5）
- **ボス泡**: 最大シェイク（強度0.8）

### 軌跡エフェクト

#### 軌跡の基本設定
```javascript
const trailEffectSystem = {
  // 軌跡の表示
  enabled: true,
  color: '#FFD700',                 // 金色
  opacity: 0.6,
  width: 3,                         // 線の太さ
  
  // 軌跡の持続性
  persistence: {
    duration: 200,                  // 200ms間表示
    fadeOut: true,                  // フェードアウト
    fadeOutDuration: 150            // フェードアウト時間
  },
  
  // 軌跡の形状
  shape: {
    type: 'curve',                  // 曲線
    smoothness: 0.8,                // 滑らかさ
    segments: 10                    // セグメント数
  }
};
```

### 衝撃波エフェクト

#### 衝撃波の基本設定
```javascript
const shockwaveEffectSystem = {
  // 衝撃波の表示
  enabled: true,
  color: '#FFFFFF',                 // 白色
  opacity: { from: 0.8, to: 0 },   // 不透明度の変化
  
  // 衝撃波の拡大
  expansion: {
    radius: { from: 0, to: 50 },   // 半径の変化
    duration: 150,                  // 拡大時間
    easing: 'ease-out'              // イージング関数
  },
  
  // 衝撃波の形状
  shape: {
    type: 'circle',                 // 円形
    borderWidth: 2,                 // 境界線の太さ
    borderColor: '#FFD700'          // 境界線の色
  }
};
```

## アクセシビリティ対応

### 視覚的アクセシビリティ

#### カスタマイズ可能な設定
```javascript
const accessibilitySettings = {
  // 視覚効果の調整
  visualEffects: {
    screenShake: {
      enabled: true,
      intensity: 'adjustable',      // 調整可能
      range: [0.0, 1.0]            // 調整範囲
    },
    cursorSize: {
      enabled: true,
      multiplier: 'adjustable',     // 調整可能
      range: [1.0, 3.0]            // 調整範囲
    },
    animationSpeed: {
      enabled: true,
      multiplier: 'adjustable',     // 調整可能
      range: [0.5, 2.0]            // 調整範囲
    }
  },
  

};
```

### 聴覚的アクセシビリティ

#### 音響フィードバックの調整
```javascript
const audioAccessibility = {
  // 音量調整
  volume: {
    master: 'adjustable',           // マスター音量調整可能
    effects: 'adjustable',          // エフェクト音量調整可能
    music: 'adjustable'             // 音楽音量調整可能
  },
  
  // 音響フィードバック
  audioFeedback: {
    clickSound: true,               // クリック音
    impactSound: true,              // 衝撃音
    visualAlternative: true         // 視覚的代替手段
  }
};
```

## パフォーマンス最適化

### アニメーションの最適化

#### レンダリング最適化
```javascript
const performanceOptimization = {
  // フレームレート制御
  frameRate: {
    target: 60,                     // 目標60FPS
    adaptive: true,                 // 適応的調整
    minFrameRate: 30                // 最小30FPS
  },
  
  // レンダリング品質
  rendering: {
    quality: 'adaptive',            // 適応的品質
    effects: 'conditional',         // 条件付きエフェクト
    optimization: 'enabled'         // 最適化有効
  },
  
  // メモリ管理
  memory: {
    textureAtlas: true,             // テクスチャアトラス使用
    objectPooling: true,            // オブジェクトプーリング
    garbageCollection: 'optimized'  // 最適化されたGC
  }
};
```

### デバイス対応

#### デバイス別最適化
```javascript
const deviceOptimization = {
  // 高性能デバイス
  highEnd: {
    effects: 'full',                // 全エフェクト有効
    quality: 'high',                // 高品質
    frameRate: 60                   // 60FPS
  },
  
  // 中性能デバイス
  midRange: {
    effects: 'reduced',             // エフェクト削減
    quality: 'medium',              // 中品質
    frameRate: 45                   // 45FPS
  },
  
  // 低性能デバイス
  lowEnd: {
    effects: 'minimal',             // 最小エフェクト
    quality: 'low',                 // 低品質
    frameRate: 30                   // 30FPS
  }
};
```
**注意**: これらの設定は品質レベル設定により自動的に制御されます

## 実装ガイドライン

### 開発時の注意点

#### コード品質
- **型安全性**: TypeScriptの型定義を活用
- **エラーハンドリング**: 適切な例外処理の実装
- **パフォーマンス**: フレームレートの監視と最適化
- **メモリリーク**: イベントリスナーの適切な管理
- **Framer Motion最適化**: 不要なアニメーションの無効化
- **Zustand状態管理**: 適切な状態の分離と更新

#### テスト要件
- **ユニットテスト**: 各アニメーション関数のテスト
- **統合テスト**: カーソルシステム全体のテスト
- **パフォーマンステスト**: フレームレートとメモリ使用量のテスト
- **アクセシビリティテスト**: 各種設定の動作確認
- **Framer Motionテスト**: アニメーションの動作確認
- **Zustandテスト**: 状態管理の動作確認

#### ブラウザ互換性
- **モダンブラウザ**: Chrome 90+, Firefox 88+, Safari 14+
- **レガシーブラウザ**: 基本的な機能のみ提供
- **モバイルブラウザ**: タッチ操作への適切な対応
- **プログレッシブエンハンスメント**: 基本機能から段階的に拡張

#### プラットフォーム対応
- **デスクトップ**: マウス・キーボード操作
- **モバイル**: タッチ・ジェスチャー操作

### Framer Motion実装のベストプラクティス

#### アニメーション最適化
```typescript
// パフォーマンスを考慮したアニメーション設定
const optimizedAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: 0.3,
    ease: "easeOut",
    // レイアウトシフトを防ぐ
    layout: false
  }
};
```

#### 状態管理との連携
```typescript
import { useStore } from '../stores/gameStore';

const GameComponent = () => {
  const { gameState, updateGameState } = useStore();
  
  return (
    <motion.div
      animate={gameState.isPlaying ? "playing" : "paused"}
      variants={gameVariants}
    >
      {/* ゲームコンテンツ */}
    </motion.div>
  );
};
```

### Zustand状態管理のベストプラクティス

#### ストア設計
```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GameState {
  score: number;
  level: number;
  isPlaying: boolean;
  updateScore: (score: number) => void;
  startGame: () => void;
  pauseGame: () => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    (set) => ({
      score: 0,
      level: 1,
      isPlaying: false,
      updateScore: (score) => set({ score }),
      startGame: () => set({ isPlaying: true }),
      pauseGame: () => set({ isPlaying: false }),
    }),
    { name: 'game-store' }
  )
);
```
