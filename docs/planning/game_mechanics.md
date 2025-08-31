# BubblePop ゲームメカニクス詳細

## 基本的な泡割りメカニクス

### 泡の生成システム

#### 生成ロジック
```javascript
// 泡生成の基本パラメータ
const bubbleSpawnSystem = {
  spawnRate: 1.0,        // 秒間生成数（ステージ別）
  maxBubbles: 20,        // 最大同時存在数
  spawnPositions: [],    // 生成位置候補
  bubbleTypes: [],       // 出現可能な泡の種類
  difficultyScaling: 1.0 // 難易度による調整
};
```

#### 生成位置の決定
- **ランダム生成**: 画面内のランダムな位置
- **重複回避**: 既存の泡との距離チェック
- **境界制限**: 画面端からの最小距離確保
- **安全地帯**: プレイヤーの操作を妨げない位置

#### 泡タイプの選択
- **確率テーブル**: 各泡タイプの出現確率
- **ステージ制限**: ステージごとの出現泡制限
- **動的調整**: ゲーム状況に応じた確率調整
- **バランス制御**: 危険泡の出現頻度制限

### 泡の物理挙動

#### 基本物理パラメータ
```javascript
const bubblePhysics = {
  gravity: 0.1,          // 重力加速度
  airResistance: 0.02,   // 空気抵抗
  bounceCoefficient: 0.7, // 反発係数
  friction: 0.95,        // 摩擦係数
  maxVelocity: 200,      // 最大速度
  
  // 新規追加: 泡の自然な動きのためのパラメータ
  naturalMovement: {
    enabled: true,        // 自然移動の有効化
    baseSpeed: 0.5,       // 基本移動速度
    randomFactor: 0.3,    // ランダム要素の強度
    directionChange: 0.02, // 方向変更の頻度
    smoothness: 0.8       // 動きの滑らかさ
  }
};
```

#### 移動システム
- **重力**: 下向きの重力による自然落下
- **浮力**: 泡特有の上向きの力
- **自然移動**: 全ての泡が緩やかにランダムな方向に揺れながら移動
- **境界反発**: 画面端での反発処理
- **移動パターン**: 泡の種類に応じた移動特性の違い

#### 泡の自然移動システム
```javascript
const naturalMovementSystem = {
  // 基本移動パラメータ
  baseMovement: {
    speed: 0.5,                    // 基本移動速度
    directionChangeInterval: 2000, // 方向変更間隔 (ms)
    maxDirectionChange: 45,        // 最大方向変更角度
    smoothness: 0.8                // 動きの滑らかさ
  },
  
  // 泡タイプ別移動特性
  bubbleTypeMovement: {
    normal: {
      speedMultiplier: 1.0,        // 標準速度
      randomFactor: 0.3,           // ランダム要素
      directionStability: 0.7      // 方向の安定性
    },
    stone: {
      speedMultiplier: 0.8,        // やや遅い
      randomFactor: 0.2,           // 少ないランダム要素
      directionStability: 0.8      // 方向が安定
    },
    iron: {
      speedMultiplier: 0.6,        // 遅い
      randomFactor: 0.15,          // 非常に少ないランダム要素
      directionStability: 0.9      // 方向が非常に安定
    },
    escape: {
      speedMultiplier: 2.5,        // 高速（既存仕様維持）
      randomFactor: 0.8,           // 高いランダム要素
      directionStability: 0.3      // 方向が不安定
    }
  },
  
  // サイズ変化による移動への影響
  sizeInfluence: {
    small: { speedMultiplier: 1.2 },    // 小さい泡はやや速く
    normal: { speedMultiplier: 1.0 },   // 標準サイズ
    large: { speedMultiplier: 0.8 }     // 大きい泡はやや遅く
  }
};
```

#### 泡の呼吸システム（サイズ変化）
```javascript
const bubbleBreathingSystem = {
  // 呼吸アニメーション
  breathing: {
    enabled: true,                  // 呼吸効果の有効化
    cycleDuration: 3000,            // 呼吸周期 (ms)
    sizeVariation: 0.05,            // サイズ変化範囲 (±5%)
    smoothness: 0.9,                // 変化の滑らかさ
    
    // 呼吸パターン
    pattern: {
      type: 'sine',                 // 正弦波パターン
      phase: 'random',              // ランダムな開始位相
      amplitude: 0.05               // 振幅（サイズ変化の強度）
    }
  },
  
  // 年齢による呼吸の変化
  ageInfluence: {
    young: {
      breathingIntensity: 1.2,      // 若い泡は呼吸が活発
      cycleVariation: 0.8           // 周期のばらつき
    },
    mature: {
      breathingIntensity: 1.0,      // 成熟泡は標準
      cycleVariation: 1.0           // 標準的な周期
    },
    old: {
      breathingIntensity: 0.8,      // 老化泡は呼吸が穏やか
      cycleVariation: 1.2           // 周期のばらつきが大きい
    }
  }
};
```

#### 境界反発システム
```javascript
const boundaryBounceSystem = {
  // 境界判定パラメータ
  boundary: {
    margin: 5,                      // 境界判定の余裕（px）
    bounceCoefficient: 0.7,         // 反発係数（0.0-1.0）
    energyLoss: 0.1,                // 境界衝突時のエネルギー損失
    maxBounces: 10                  // 連続反発の最大回数
  },
  
  // 画面境界の定義
  screenBoundaries: {
    left: 0,                        // 左端
    right: 'canvas.width',          // 右端
    top: 0,                         // 上端
    bottom: 'canvas.height'         // 下端
  },
  
  // 反発処理の詳細
  bounceProcessing: {
    // 境界到達判定
    boundaryDetection: {
      enabled: true,
      checkInterval: 16,             // 判定間隔（60FPS想定）
      precision: 'pixel'             // 判定精度
    },
    
    // 反発方向の計算
    directionCalculation: {
      method: 'angleReflection',     // 角度反射法
      normalizeVelocity: true,       // 速度の正規化
      maintainSpeed: true            // 速度の維持
    },
    
    // 反発後の処理
    postBounce: {
      velocityAdjustment: true,      // 速度調整
      energyConservation: true,      // エネルギー保存
      visualEffect: 'bounce'         // 視覚効果
    }
  }
};
```

#### 境界反発の動作詳細
- **境界到達判定**: 泡が画面端から5px以内に到達した時点で反発判定
- **反射角度計算**: 入射角と等しい反射角で反対方向に移動
- **速度調整**: 反発係数（0.7）に応じた速度の調整
- **エネルギー損失**: 境界衝突時に10%のエネルギー損失
- **連続反発制限**: 連続10回の反発で泡を消滅（無限ループ防止）

#### 泡タイプ別の境界反発特性
- **通常泡**: 標準的な反発係数（0.7）
- **石泡**: やや低い反発係数（0.6）- 重いため
- **鉄泡**: 低い反発係数（0.5）- 非常に重いため
- **escape泡**: 高い反発係数（0.8）- 軽いため
- **特殊泡**: 泡の性質に応じた個別設定

#### 衝突判定
- **円形判定**: 泡同士の円形衝突判定
- **重複解決**: 重なった泡の分離処理
- **弾性衝突**: 物理的に正確な衝突応答
- **質量考慮**: 泡のサイズに応じた質量計算

### 泡の成長システム

#### 年齢による変化
```javascript
const ageSystem = {
  young: {      // 若い泡 (0-3秒)
    sizeMultiplier: 0.8,
    scoreMultiplier: 2.0,
    color: 'bright'
  },
  mature: {     // 成熟泡 (3-7秒)
    sizeMultiplier: 1.0,
    scoreMultiplier: 1.5,
    color: 'normal'
  },
  old: {        // 老化泡 (7-10秒)
    sizeMultiplier: 1.3,
    scoreMultiplier: 3.0,
    color: 'dark'
  },
  burst: {      // 破裂 (10秒以上)
    damage: 10,
    effect: 'explosion'
  }
};
```

#### サイズ変化
- **自然な呼吸**: 非常にゆっくりとしたわずかな範囲での膨張・収縮
- **泡らしい見た目**: かすかな範囲で大きさが変化し続ける
- **年齢による成長**: 時間経過に伴う全体的なサイズ増加
- **最大サイズ**: 破裂直前の最大サイズ
- **視覚的変化**: サイズに応じた色調変化
- **危険度表示**: 破裂が近い泡の警告表示

### クリック・タップ処理

#### カーソルシステム
```javascript
const cursorSystem = {
  // ゲームプレイ中のカーソル設定
  gameCursor: {
    icon: 'hammer',           // ハンマーアイコン
    size: { width: 32, height: 32 }, // アイコンサイズ
    offset: { x: -16, y: -16 },      // クリック位置からのオフセット
    animation: {
      idle: 'hammer-idle',    // 待機状態のアニメーション
      swing: 'hammer-swing',  // 振りかぶりアニメーション
      hit: 'hammer-hit'       // 叩くアニメーション
    }
  },
  
  // カーソル状態管理
  states: {
    idle: 'idle',             // 通常状態
    swinging: 'swinging',     // 振りかぶり中
    hitting: 'hitting'        // 叩き中
  }
};
```

#### クリックアニメーションシステム
```javascript
const clickAnimationSystem = {
  // アニメーションタイミング
  timing: {
    swingDuration: 150,       // 振りかぶり時間 (ms)
    hitDuration: 100,         // 叩く時間 (ms)
    totalDuration: 250,       // 全体のアニメーション時間 (ms)
    impactDelay: 200          // クリックから衝撃発生までの遅延 (ms)
  },
  
  // アニメーション詳細
  animations: {
    swing: {
      rotation: { from: 0, to: -45 },    // 振りかぶり角度
      scale: { from: 1.0, to: 1.2 },    // 振りかぶり時の拡大
      easing: 'ease-out'                 // イージング関数
    },
    hit: {
      rotation: { from: -45, to: 15 },  // 叩く角度
      scale: { from: 1.2, to: 0.9 },   // 叩く時の縮小
      easing: 'ease-in'                 // イージング関数
    }
  },
  
  // 視覚効果
  effects: {
    swingTrail: true,         // 振りかぶり時の軌跡エフェクト
    hitImpact: true,          // 叩いた時の衝撃波エフェクト
    screenShake: {            // 画面シェイク効果
      enabled: true,
      intensity: 0.3,
      duration: 100
    }
  }
};
```

#### 入力検出
```javascript
const inputSystem = {
  clickRadius: 5,        // クリック判定の余裕
  multiTouch: true,      // マルチタッチ対応
  dragThreshold: 10,     // ドラッグ判定の閾値
  holdTime: 500,         // 長押し判定時間
  animationLock: true    // アニメーション中の入力ロック
};
```

#### ヒット判定
- **座標変換**: スクリーン座標からゲーム座標への変換
- **優先順位**: 重なった泡の処理優先順位
- **精密判定**: 泡の正確な円形判定
- **フィードバック**: ヒット時の即座な視覚・音響フィードバック
- **タイミング制御**: アニメーション完了後の衝撃発生

#### 操作の種類
**基本クリック**
- **効果**: 泡のHP減少（アニメーション完了後）
- **フィードバック**: ハンマーアニメーション、クリック音、視覚エフェクト
- **連続クリック**: アニメーション完了後のみ有効
- **タイミング**: クリックから衝撃まで200msの遅延

**ドラッグ操作**
- **効果**: 泡の位置移動
- **制限**: 移動可能な距離制限
- **物理**: ドラッグ中の物理計算停止
- **カーソル**: ドラッグ中は通常の矢印カーソル

**長押し操作**
- **効果**: 特殊泡の特殊効果発動
- **対象**: 一部の特殊泡のみ
- **フィードバック**: 長押し中の視覚的変化
- **カーソル**: 長押し中はハンマーアイコンを維持

### 泡の破壊システム

#### HP システム
```javascript
const bubbleHP = {
  normal: 1,     // 通常泡
  stone: 2,      // 石泡
  iron: 3,       // 鉄泡
  diamond: 4,    // ダイヤモンド泡
  boss: 10       // ボス泡
};
```

#### 破壊処理
- **HP減少**: クリックによるHP減少
- **破壊判定**: HP が 0 になった時の処理
- **エフェクト生成**: 破壊時のパーティクル効果
- **スコア計算**: 破壊時のスコア付与

#### 連鎖システム
- **電気泡**: 周囲の泡への連鎖ダメージ
- **爆発泡**: 範囲内の泡を一括破壊
- **連鎖計算**: 連鎖による追加スコア

## スコアリングシステム

### 基本スコア計算

#### 泡タイプ別基本スコア
```javascript
const baseScores = {
  normal: 15,      // 通常泡
  stone: 25,       // 石泡
  iron: 40,        // 鉄泡
  diamond: 60,     // ダイヤモンド泡
  boss: 500,       // ボス泡
  pink: 20,        // 回復泡
  poison: 30,      // 毒泡
  rainbow: 50,     // 虹色泡
  golden: 200      // 黄金泡
};
```

#### スコア計算式
```javascript
finalScore = baseScore × comboMultiplier × ageBonus × specialMultiplier
```

### コンボシステム

#### コンボ計算
```javascript
const comboSystem = {
  multiplierIncrement: 0.08,  // コンボ1回あたりの倍率増加
  maxMultiplier: 2.5,         // 最大コンボ倍率
  comboTimeout: 2000,         // コンボ継続時間 (ms)
  comboDecay: 0.95            // コンボ減衰率
};

// コンボ倍率計算
comboMultiplier = Math.min(
  1.0 + (comboCount * multiplierIncrement),
  maxMultiplier
);
```

#### コンボ維持条件
- **時間制限**: 2秒以内に次の泡を割る
- **連続性**: 泡を割り続ける必要がある
- **リセット条件**: 時間切れ、ダメージ受けでリセット

### 年齢ボーナス

#### ボーナス倍率
```javascript
const ageBonus = {
  early: {        // 早期破壊 (0-3秒)
    multiplier: 2.0,
    message: "Early Bonus!"
  },
  mid: {          // 中期破壊 (3-7秒)
    multiplier: 1.5,
    message: "Good Timing!"
  },
  late: {         // 後期破壊 (7-10秒)
    multiplier: 3.0,
    message: "Risk Bonus!"
  }
};
```

#### 戦略的要素
- **早期破壊**: 安全だが低ボーナス
- **後期破壊**: 危険だが高ボーナス
- **タイミング判断**: リスクとリターンのバランス

### 特殊スコア効果

#### 特殊泡による倍率効果
```javascript
const specialEffects = {
  rainbow: {      // 虹色泡
    effect: "bonusTime",
    duration: 5000,
    multiplier: 2.0
  },
  golden: {       // 黄金泡
    effect: "scoreMultiplier",
    multiplier: 3.0
  },
  multiplier: {   // 倍率泡
    effect: "nextBubbleMultiplier",
    multiplier: 2.0
  }
};
```

#### ボーナスタイム
- **発動条件**: 虹色泡を割る
- **効果時間**: 5秒間
- **効果**: 全スコアが2倍
- **視覚効果**: 画面全体の色調変化

## 進歩システム

### レベルシステム

#### 経験値計算
```javascript
const levelSystem = {
  baseExperience: 100,        // レベル1に必要な経験値
  experienceMultiplier: 1.2,  // レベルごとの必要経験値倍率
  maxLevel: 50               // 最大レベル
};

// 必要経験値計算
requiredExp = baseExperience * Math.pow(experienceMultiplier, level - 1);
```

#### レベルアップ特典
```javascript
const levelBenefits = {
  1: { maxHP: 100, startingItems: [] },
  5: { maxHP: 120, startingItems: ['slowTime'] },
  10: { maxHP: 150, startingItems: ['slowTime', 'doubleScore'] },
  15: { maxHP: 180, startingItems: ['slowTime', 'doubleScore', 'extraLife'] },
  20: { maxHP: 200, startingItems: ['slowTime', 'doubleScore', 'extraLife', 'timeExtension'] }
};
```

### アンロックシステム

#### ステージ解放
```javascript
const stageUnlocks = {
  tutorial: { requirement: null },
  normal: { requirement: null },
  hard: { requirement: 'tap >= 500' },
  veryHard: { requirement: 'tap >= 2000' },
  special: { requirement: 'tap >= 5000' },
  nightmare: { requirement: 'tap >= 12000' },
  chaos: { requirement: 'tap >= 25000' },
  ultimate: { requirement: 'tap >= 50000' },
  allIn: { requirement: 'tap >= 100000' },
  boss: { requirement: 'tap >= 35000' }
};
```

#### 機能解放
```javascript
const featureUnlocks = {
  leaderboard: { requirement: 'gamesPlayed >= 3' },
  achievements: { requirement: 'level >= 3' },
  itemShop: { requirement: 'level >= 2' },
  customization: { requirement: 'level >= 7' },
  statistics: { requirement: 'level >= 5' }
};
```

### AP・TAP システム

#### AP (Achievement Points)
- **獲得方法**: 実績達成時に獲得
- **用途**: アイテムショップでの購入
- **種類**: 消費型ポイント
- **管理**: 使用すると減少

#### TAP (Total Achievement Points)
- **計算式**: 累計スコア ÷ 10
- **用途**: ステージ解放条件
- **種類**: 累積型ポイント
- **管理**: 減少しない永続ポイント

### アイテムシステム

#### 購入可能アイテム
```javascript
const shopItems = {
  scoreMultiplier: {
    baseCost: 75,
    effect: 1.3,
    maxLevel: 5,
    costMultiplier: 1.3
  },
  timeExtension: {
    baseCost: 50,
    effect: 10000, // 10秒
    maxLevel: 3,
    costMultiplier: 1.5
  },
  bubbleSlower: {
    baseCost: 60,
    effect: 0.7,   // 70%の速度
    maxLevel: 4,
    costMultiplier: 1.4
  },
  extraLife: {
    baseCost: 100,
    effect: 1,     // +1 HP
    maxLevel: 2,
    costMultiplier: 2.0
  }
};
```

#### アイテム効果の適用
- **永続効果**: 購入後は常に効果が適用
- **レベルアップ**: 同じアイテムを複数回購入で効果強化
- **コスト増加**: レベルアップごとにコスト増加
- **最大レベル**: アイテムごとの最大強化レベル

## ゲームバランス調整

### 難易度曲線

#### ステージ別難易度設定
```javascript
const difficultyProgression = {
  tutorial: { spawnRate: 0.8, maxBubbles: 10, difficulty: 1.0 },
  normal: { spawnRate: 1.0, maxBubbles: 15, difficulty: 1.2 },
  hard: { spawnRate: 1.5, maxBubbles: 20, difficulty: 1.5 },
  veryHard: { spawnRate: 2.0, maxBubbles: 25, difficulty: 2.0 },
  special: { spawnRate: 2.5, maxBubbles: 30, difficulty: 2.5 },
  nightmare: { spawnRate: 3.0, maxBubbles: 35, difficulty: 3.0 }
};
```

#### 適応的難易度調整
```javascript
const adaptiveDifficulty = {
  playerPerformanceTracking: true,
  adjustmentFactors: {
    accuracy: 0.3,      // 命中率による調整
    speed: 0.3,         // 反応速度による調整
    survival: 0.4       // 生存時間による調整
  },
  adjustmentRange: [0.7, 1.3] // 調整幅
};
```
