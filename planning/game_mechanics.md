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
  maxVelocity: 200       // 最大速度
};
```

#### 移動システム
- **重力**: 下向きの重力による自然落下
- **浮力**: 泡特有の上向きの力
- **ランダム移動**: 微細なランダム要素
- **境界反発**: 画面端での反発処理

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
- **線形成長**: 時間に比例したサイズ増加
- **最大サイズ**: 破裂直前の最大サイズ
- **視覚的変化**: サイズに応じた色調変化
- **危険度表示**: 破裂が近い泡の警告表示

### クリック・タップ処理

#### 入力検出
```javascript
const inputSystem = {
  clickRadius: 5,        // クリック判定の余裕
  multiTouch: true,      // マルチタッチ対応
  dragThreshold: 10,     // ドラッグ判定の閾値
  holdTime: 500          // 長押し判定時間
};
```

#### ヒット判定
- **座標変換**: スクリーン座標からゲーム座標への変換
- **優先順位**: 重なった泡の処理優先順位
- **精密判定**: 泡の正確な円形判定
- **フィードバック**: ヒット時の即座な視覚・音響フィードバック

#### 操作の種類
**基本クリック**
- **効果**: 泡のHP減少
- **フィードバック**: クリック音、視覚エフェクト
- **連続クリック**: 硬い泡への連続攻撃

**ドラッグ操作**
- **効果**: 泡の位置移動
- **制限**: 移動可能な距離制限
- **物理**: ドラッグ中の物理計算停止

**長押し操作**
- **効果**: 特殊泡の特殊効果発動
- **対象**: 一部の特殊泡のみ
- **フィードバック**: 長押し中の視覚的変化

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

### バランス検証システム

#### 統計データ収集
- **プレイ時間分布**: ステージ別の平均プレイ時間
- **スコア分布**: プレイヤーのスコア分布
- **生存率**: ステージ別の生存率
- **アイテム使用率**: 各アイテムの購入・使用率

#### 自動バランス調整
- **動的スポーン率**: プレイヤーの成績に応じた調整
- **スコア倍率調整**: 平均スコアに基づく調整
- **泡タイプ確率**: 出現確率の動的調整

## プレイヤー体験設計

### 学習曲線
1. **導入段階**: 基本操作の習得
2. **発展段階**: 特殊泡の理解
3. **応用段階**: コンボシステムの活用
4. **熟練段階**: 高度な戦略の実践
5. **マスター段階**: 完璧なプレイの追求

### フィードバックシステム
- **即座のフィードバック**: クリック時の即座な反応
- **進捗フィードバック**: スコア、レベル、実績の表示
- **成果フィードバック**: ゲーム終了時の詳細統計
- **改善フィードバック**: 次回への改善提案

### モチベーション維持
- **短期目標**: 各ゲームでのスコア目標
- **中期目標**: レベルアップ、ステージ解放
- **長期目標**: 全実績コンプリート
- **社会的要素**: スコア共有、ランキング