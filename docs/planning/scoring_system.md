# BubblePop スコアリングシステム詳細

## スコア計算の基本構造

### 最終スコア計算式
```javascript
finalScore = baseScore × comboMultiplier × ageBonus × specialMultiplier × itemMultiplier
```

### 各要素の詳細

#### 基本スコア (baseScore)
泡の種類によって決まる基本点数

#### コンボ倍率 (comboMultiplier)
連続で泡を割ることによる倍率ボーナス

#### 年齢ボーナス (ageBonus)
泡を割るタイミングによるボーナス

#### 特殊倍率 (specialMultiplier)
特殊泡の効果による倍率

#### アイテム倍率 (itemMultiplier)
購入したアイテムによる倍率

## 基本スコア設定

### 泡タイプ別基本スコア
```javascript
const baseScores = {
  // 基本泡
  normal: 15,        // 通常泡
  stone: 25,         // 石泡
  iron: 40,          // 鉄泡
  diamond: 60,       // ダイヤモンド泡
  
  // 特殊効果泡
  pink: 20,          // 回復泡
  poison: 30,        // 毒泡 (危険だが高得点)
  rainbow: 50,       // 虹色泡
  clock: 30,         // 時計泡
  score: 100,        // スコア泡
  
  // 危険泡
  spike: 35,         // トゲ泡
  electric: 40,      // 電気泡
  escape: 80,        // 逃げる泡 (捕まえにくいため高得点)
  
  // 高難易度泡
  crack: 50,         // ひび泡
  boss: 500,         // ボス泡
  golden: 200,       // 黄金泡
  frozen: 60,        // 氷泡
  magnetic: 70,      // 磁石泡
  explosive: 100,    // 爆発泡
  phantom: 150,      // 幻影泡
  multiplier: 50     // 倍率泡
};
```

### スコア設定の考え方
- **難易度比例**: 割るのが困難な泡ほど高得点
- **リスク報酬**: 危険な泡ほど高得点
- **希少性**: 出現頻度が低い泡ほど高得点
- **特殊効果**: 有益な効果を持つ泡は適度な得点

## コンボシステム

### コンボ倍率計算
```javascript
const comboSystem = {
  multiplierIncrement: 0.08,  // 1コンボあたりの倍率増加
  maxMultiplier: 2.5,         // 最大コンボ倍率
  comboTimeout: 2000,         // コンボ継続時間 (2秒)
  minComboForBonus: 3         // ボーナス発生最小コンボ数
};

// コンボ倍率の計算
function calculateComboMultiplier(comboCount) {
  if (comboCount < minComboForBonus) {
    return 1.0; // コンボボーナスなし
  }
  
  const multiplier = 1.0 + ((comboCount - minComboForBonus + 1) * multiplierIncrement);
  return Math.min(multiplier, maxMultiplier);
}
```

### コンボ段階別効果
```javascript
const comboLevels = {
  3: { multiplier: 1.08, message: "Nice!" },
  5: { multiplier: 1.16, message: "Good!" },
  10: { multiplier: 1.40, message: "Great!" },
  15: { multiplier: 1.64, message: "Excellent!" },
  20: { multiplier: 1.88, message: "Amazing!" },
  25: { multiplier: 2.12, message: "Incredible!" },
  30: { multiplier: 2.36, message: "Legendary!" },
  35: { multiplier: 2.50, message: "GODLIKE!" }
};
```

### コンボ維持条件
- **時間制限**: 2秒以内に次の泡を割る
- **連続性**: 泡を割り続ける必要がある
- **リセット条件**: 
  - 2秒間何も割らない
  - HPダメージを受ける
  - 泡の自然破裂が発生

### コンボ戦略
- **序盤**: 確実に割れる泡でコンボを開始
- **中盤**: コンボを維持しながら高得点泡を狙う
- **終盤**: 最大倍率でボス泡や特殊泡を狙う

## 年齢ボーナスシステム

### 泡の年齢段階
```javascript
const ageStages = {
  young: {          // 若い泡 (0-3秒)
    timeRange: [0, 3000],
    multiplier: 2.0,
    message: "Early Bonus!",
    color: "bright",
    risk: "low"
  },
  mature: {         // 成熟泡 (3-7秒)
    timeRange: [3000, 7000],
    multiplier: 1.5,
    message: "Good Timing!",
    color: "normal",
    risk: "medium"
  },
  old: {            // 老化泡 (7-10秒)
    timeRange: [7000, 10000],
    multiplier: 3.0,
    message: "Risk Bonus!",
    color: "dark",
    risk: "high"
  },
  critical: {       // 危険状態 (10秒以上)
    timeRange: [10000, Infinity],
    multiplier: 0,
    message: "Too Late!",
    effect: "burst",
    damage: 10
  }
};
```

### 年齢ボーナスの戦略的意味
- **早期破壊**: 安全だが中程度のボーナス
- **適時破壊**: バランスの取れたボーナス
- **危険破壊**: 高リスク・高リターン
- **破裂回避**: ダメージを避けるための判断

### 視覚的フィードバック
- **色の変化**: 年齢に応じた色調変化
- **サイズ変化**: 時間経過による徐々な拡大
- **警告表示**: 破裂が近い泡の点滅
- **カウントダウン**: 残り時間の数値表示

## 特殊スコア効果

### 特殊泡による倍率効果

#### 虹色泡 (Rainbow Bubble)
```javascript
const rainbowEffect = {
  trigger: "bubblePopped",
  effect: "bonusTime",
  duration: 5000,        // 5秒間
  multiplier: 2.0,       // 全スコア2倍
  visualEffect: "rainbowTint",
  message: "BONUS TIME!"
};
```

#### 黄金泡 (Golden Bubble)
```javascript
const goldenEffect = {
  trigger: "bubblePopped",
  effect: "immediateMultiplier",
  multiplier: 3.0,       // そのスコアが3倍
  visualEffect: "goldenFlash",
  message: "GOLDEN BONUS!"
};
```

#### 倍率泡 (Multiplier Bubble)
```javascript
const multiplierEffect = {
  trigger: "bubblePopped",
  effect: "nextBubbleMultiplier",
  multiplier: 2.0,       // 次の泡のスコアが2倍
  duration: 10000,       // 10秒間有効
  visualEffect: "multiplierGlow",
  message: "NEXT BUBBLE x2!"
};
```

#### スコア泡 (Score Bubble)
```javascript
const scoreEffect = {
  trigger: "bubblePopped",
  effect: "bonusScore",
  bonusScore: 100,       // 基本100点
  multiplier: 2.0,       // さらに次のスコアが2倍
  visualEffect: "scoreExplosion",
  message: "SCORE BONUS!"
};
```

### 特殊効果の重複処理
```javascript
const effectStacking = {
  bonusTime: "extend",      // ボーナスタイムは延長
  multiplier: "multiply",   // 倍率は乗算
  immediate: "add",         // 即座効果は加算
  duration: "max"           // 持続時間は最大値を採用
};
```

## アイテムによるスコア強化

### 購入可能なスコア強化アイテム

#### スコア倍率アップ
```javascript
const scoreMultiplierItem = {
  name: "スコア倍率アップ",
  baseCost: 75,
  maxLevel: 5,
  costMultiplier: 1.3,
  effects: {
    level1: { multiplier: 1.3 },
    level2: { multiplier: 1.6 },
    level3: { multiplier: 1.9 },
    level4: { multiplier: 2.2 },
    level5: { multiplier: 2.5 }
  }
};
```



#### 泡速度低下
```javascript
const bubbleSlowerItem = {
  name: "泡速度低下",
  baseCost: 60,
  maxLevel: 4,
  costMultiplier: 1.4,
  effects: {
    level1: { speedMultiplier: 0.9 },
    level2: { speedMultiplier: 0.8 },
    level3: { speedMultiplier: 0.7 },
    level4: { speedMultiplier: 0.6 }
  }
};
```

### アイテム効果の計算
```javascript
function calculateItemMultiplier(playerItems) {
  let totalMultiplier = 1.0;
  
  // スコア倍率アイテムの効果
  if (playerItems.scoreMultiplier) {
    const level = playerItems.scoreMultiplier.level;
    totalMultiplier *= scoreMultiplierItem.effects[`level${level}`].multiplier;
  }
  
  return totalMultiplier;
}
```

## スコア表示システム

### リアルタイムスコア表示
```javascript
const scoreDisplay = {
  currentScore: 0,
  displayScore: 0,
  animationSpeed: 50,    // スコア更新アニメーション速度
  countUpDuration: 500,  // カウントアップ時間
  flashDuration: 200     // スコア獲得時のフラッシュ時間
};
```

### スコア獲得時のフィードバック
- **フローティングテキスト**: 獲得スコアの表示
- **色分け**: スコア量に応じた色変化
- **アニメーション**: 上昇・フェードアウト効果
- **音響フィードバック**: スコア獲得音

### スコア履歴
```javascript
const scoreHistory = {
  recentScores: [],      // 最近のスコア履歴
  maxHistorySize: 100,   // 保存する履歴数
  sessionBest: 0,        // セッション最高スコア
  personalBest: 0        // 個人最高スコア
};
```

## 統計システム

### スコア統計の収集
```javascript
const scoreStatistics = {
  totalScore: 0,         // 累計スコア
  averageScore: 0,       // 平均スコア
  highScore: 0,          // 最高スコア
  gamesPlayed: 0,        // プレイ回数
  scoreDistribution: {}, // スコア分布
  comboStatistics: {},   // コンボ統計
  bubbleTypeScores: {}   // 泡タイプ別スコア
};
```

## バランス調整システム

### 動的スコア調整
```javascript
const dynamicScoring = {
  playerSkillLevel: 1.0,     // プレイヤースキルレベル
  adjustmentFactor: 0.1,     // 調整係数
  minAdjustment: 0.8,        // 最小調整値
  maxAdjustment: 1.2,        // 最大調整値
  adaptationSpeed: 0.05      // 適応速度
};
```

### スコアバランスの監視
- **平均スコア追跡**: プレイヤー全体の平均スコア
- **分布分析**: スコア分布の偏りチェック
- **難易度調整**: スコア実績に基づく難易度調整
- **アイテムバランス**: アイテム効果の適正性チェック

## 高得点戦略ガイド

### 基本戦略
1. **コンボ維持**: 常にコンボを意識した泡選択
2. **年齢管理**: リスクとリターンのバランス
3. **特殊泡活用**: 特殊効果の戦略的使用
4. **アイテム投資**: 効果的なアイテム購入

### 上級戦略
1. **倍率重複**: 複数の倍率効果の重複狙い
2. **タイミング調整**: ボーナスタイム中の高得点泡狙い
3. **リスク計算**: 危険泡の戦略的処理
4. **効率最適化**: 時間効率を考慮した泡選択

### エキスパート戦略
1. **完璧なコンボ**: 最大倍率の維持
2. **予測プレイ**: 泡の出現パターン予測
3. **マルチタスク**: 複数の要素の同時管理
4. **心理的要素**: プレッシャー下での冷静な判断

## スコアシステムの技術実装

### パフォーマンス最適化
- **計算キャッシュ**: 複雑な計算結果のキャッシュ
- **バッチ処理**: スコア更新のバッチ処理
- **精度管理**: 浮動小数点の精度問題対策
- **メモリ効率**: スコア履歴のメモリ効率的管理

### データ整合性
- **検証システム**: スコア計算の正確性検証
- **不正検出**: 異常なスコアの検出
- **復旧機能**: データ破損時の復旧機能
- **バックアップ**: スコアデータのバックアップ