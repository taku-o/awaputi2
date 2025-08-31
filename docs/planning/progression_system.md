# BubblePop 進歩システム詳細

## 進歩システム概要

### 3つの進歩軸
1. **レベルシステム**: プレイヤーの成長と能力向上
2. **アンロックシステム**: 新コンテンツの段階的解放
3. **通貨システム**: AP・TAPによる永続的な強化

### 進歩の相互関係
```
ゲームプレイ → 経験値・スコア獲得 → レベルアップ・TAP増加
     ↓                                      ↓
実績達成 → AP獲得 → アイテム購入 → ゲーム有利化
     ↓                                      ↓
TAP蓄積 → ステージ解放 → 新しい挑戦 → さらなる成長
```

## レベルシステム

### レベル計算式
```javascript
const levelSystem = {
  baseExperience: 100,        // レベル1→2に必要な基本経験値
  experienceMultiplier: 1.2,  // レベルごとの必要経験値倍率
  maxLevel: 50,              // 最大レベル
  experienceDecay: 0.95      // 高レベルでの経験値効率減衰
};

// レベルnに必要な累計経験値
function getTotalExperienceForLevel(level) {
  let totalExp = 0;
  for (let i = 1; i < level; i++) {
    const levelExp = baseExperience * Math.pow(experienceMultiplier, i - 1);
    totalExp += Math.floor(levelExp);
  }
  return totalExp;
}
```

### 経験値獲得システム
```javascript
const experienceGain = {
  baseGameExp: 50,           // ゲーム完了基本経験値
  scoreMultiplier: 0.01,     // スコア1点あたりの経験値
  survivalBonus: 2,          // 1秒生存あたりの経験値
  comboBonus: 5,             // 最大コンボ1あたりの経験値
  achievementBonus: 100,     // 実績達成ボーナス経験値
  firstClearBonus: 200       // ステージ初回クリアボーナス
};

// 経験値計算
function calculateExperience(gameData) {
  let totalExp = experienceGain.baseGameExp;
  totalExp += gameData.score * experienceGain.scoreMultiplier;
  totalExp += gameData.survivalTime * experienceGain.survivalBonus;
  totalExp += gameData.maxCombo * experienceGain.comboBonus;
  
  if (gameData.newAchievements > 0) {
    totalExp += gameData.newAchievements * experienceGain.achievementBonus;
  }
  
  if (gameData.firstClear) {
    totalExp += experienceGain.firstClearBonus;
  }
  
  return Math.floor(totalExp);
}
```

### レベル特典システム
```javascript
const levelBenefits = {
  // 基本特典（全レベル）
  baseHP: {
    formula: (level) => 100 + (level - 1) * 5,  // レベル1: 100HP, レベル2: 105HP...
    maxHP: 200  // レベル21で最大
  },
  
  // 特別特典（特定レベル）
  specialBenefits: {
    2: {
      unlock: "itemShop",
      message: "アイテムショップが利用可能になりました！"
    },
    3: {
      unlock: "achievements",
      message: "実績システムが利用可能になりました！"
    },
    5: {
      maxHP: 120,
      startingItems: ["slowTime"],
      message: "最大HPが120になり、開始時アイテムを獲得！"
    },
    7: {
      unlock: "customization",
      message: "カスタマイゼーション機能が解放されました！"
    },
    10: {
      maxHP: 150,
      startingItems: ["slowTime", "doubleScore"],
      message: "最大HPが150になり、追加開始アイテムを獲得！"
    },
    15: {
      maxHP: 180,
      startingItems: ["slowTime", "doubleScore", "extraLife"],
      unlock: "expertMode",
      message: "エキスパートモードが解放されました！"
    },
    20: {
      maxHP: 200,
      startingItems: ["slowTime", "doubleScore", "extraLife", "timeExtension"],
      unlock: "masterMode",
      message: "マスターモードが解放されました！"
    },
    25: {
      unlock: "legendaryItems",
      message: "レジェンダリーアイテムが購入可能になりました！"
    },
    30: {
      unlock: "infiniteMode",
      message: "無限モードが解放されました！"
    },
    40: {
      unlock: "creatorMode",
      message: "クリエイターモードが解放されました！"
    },
    50: {
      title: "BubbleMaster",
      unlock: "allFeatures",
      message: "全ての機能が解放されました！おめでとうございます！"
    }
  }
};
```

### レベルアップ演出
```javascript
const levelUpEffects = {
  visual: {
    screenFlash: { color: "gold", duration: 500 },
    particleExplosion: { count: 50, color: "rainbow" },
    textAnimation: { text: "LEVEL UP!", scale: 2.0, duration: 2000 }
  },
  audio: {
    levelUpSound: "fanfare",
    volume: 0.8
  },
  ui: {
    benefitDisplay: true,
    newUnlockNotification: true,
    statComparison: true
  }
};
```

## アンロックシステム

### ステージ解放システム
```javascript
const stageUnlockRequirements = {
  tutorial: { 
    requirement: null,
    message: "最初から利用可能"
  },
  normal: { 
    requirement: null,
    message: "最初から利用可能"
  },
  hard: { 
    requirement: { type: "tap", value: 500 },
    message: "TAP 500以上で解放"
  },
  veryHard: { 
    requirement: { type: "tap", value: 2000 },
    message: "TAP 2000以上で解放"
  },
  special: { 
    requirement: { type: "tap", value: 5000 },
    message: "TAP 5000以上で解放"
  },
  nightmare: { 
    requirement: { type: "tap", value: 12000 },
    message: "TAP 12000以上で解放"
  },
  chaos: { 
    requirement: { type: "tap", value: 25000 },
    message: "TAP 25000以上で解放"
  },
  ultimate: { 
    requirement: { type: "tap", value: 50000 },
    message: "TAP 50000以上で解放"
  },
  allIn: { 
    requirement: { type: "tap", value: 100000 },
    message: "TAP 100000以上で解放"
  },
  boss: { 
    requirement: { type: "tap", value: 35000 },
    message: "TAP 35000以上で解放"
  }
};
```

### 機能解放システム
```javascript
const featureUnlockRequirements = {
  // レベル依存の解放
  itemShop: {
    requirement: { type: "level", value: 2 },
    message: "レベル2で解放"
  },
  achievements: {
    requirement: { type: "level", value: 3 },
    message: "レベル3で解放"
  },
  statistics: {
    requirement: { type: "level", value: 5 },
    message: "レベル5で解放"
  },
  customization: {
    requirement: { type: "level", value: 7 },
    message: "レベル7で解放"
  },
  
  // プレイ回数依存の解放
  leaderboard: {
    requirement: { type: "gamesPlayed", value: 3 },
    message: "3回プレイで解放"
  },
  socialSharing: {
    requirement: { type: "gamesPlayed", value: 5 },
    message: "5回プレイで解放"
  },
  
  // 実績依存の解放
  expertTips: {
    requirement: { type: "achievements", value: 10 },
    message: "実績10個達成で解放"
  },
  masterGuide: {
    requirement: { type: "achievements", value: 25 },
    message: "実績25個達成で解放"
  },
  
  // 複合条件の解放
  tournamentMode: {
    requirement: { 
      type: "and",
      conditions: [
        { type: "level", value: 15 },
        { type: "tap", value: 10000 },
        { type: "achievements", value: 15 }
      ]
    },
    message: "レベル15、TAP 10000、実績15個で解放"
  }
};
```

### 解放チェック関数
```javascript
function checkUnlockRequirement(requirement, playerData) {
  if (!requirement) return true;
  
  switch (requirement.type) {
    case "level":
      return playerData.level >= requirement.value;
    case "tap":
      return playerData.totalTAP >= requirement.value;
    case "gamesPlayed":
      return playerData.gamesPlayed >= requirement.value;
    case "achievements":
      return playerData.unlockedAchievements.length >= requirement.value;
    case "and":
      return requirement.conditions.every(cond => 
        checkUnlockRequirement(cond, playerData)
      );
    case "or":
      return requirement.conditions.some(cond => 
        checkUnlockRequirement(cond, playerData)
      );
    default:
      return false;
  }
}
```

## 通貨システム

### AP (Achievement Points) システム
```javascript
const apSystem = {
  // AP獲得源
  sources: {
    achievements: {
      basic: 10,      // 基本実績
      intermediate: 50, // 中級実績
      advanced: 100,   // 上級実績
      expert: 200      // エキスパート実績
    }
  },
  
  // AP使用先
  uses: {
    items: "アイテム購入",
    cosmetics: "見た目カスタマイズ",
    boosters: "一時的なブースター",
    unlocks: "特別コンテンツ解放"
  }
};
```

### TAP (Total Achievement Points) システム
```javascript
const tapSystem = {
  // TAP計算式
  calculation: {
    formula: "累計スコア ÷ 10",
    example: "50000点獲得 → 5000 TAP"
  },
  
  // TAP特性
  characteristics: {
    persistent: true,    // 永続的（減らない）
    cumulative: true,    // 累積的
    retroactive: true    // 過去のスコアも反映
  },
  
  // TAP用途
  purposes: {
    stageUnlock: "ステージ解放の条件",
    progressMeasure: "進歩の指標",
    ranking: "プレイヤーランキング"
  }
};
```

### 通貨管理システム
```javascript
class CurrencyManager {
  constructor(playerData) {
    this.playerData = playerData;
  }
  
  // AP獲得
  gainAP(amount, source) {
    this.playerData.currentAP += amount;
    this.playerData.totalAPEarned += amount;
    this.logTransaction("AP_GAIN", amount, source);
  }
  
  // AP消費
  spendAP(amount, purpose) {
    if (this.playerData.currentAP >= amount) {
      this.playerData.currentAP -= amount;
      this.playerData.totalAPSpent += amount;
      this.logTransaction("AP_SPEND", amount, purpose);
      return true;
    }
    return false;
  }
  
  // TAP更新
  updateTAP(newScore) {
    const additionalTAP = Math.floor(newScore / 10);
    this.playerData.totalTAP += additionalTAP;
    this.checkTAPMilestones();
  }
  
  // TAPマイルストーンチェック
  checkTAPMilestones() {
    const milestones = [500, 1000, 2000, 5000, 10000, 25000, 50000, 100000];
    milestones.forEach(milestone => {
      if (this.playerData.totalTAP >= milestone && 
          !this.playerData.tapMilestones.includes(milestone)) {
        this.playerData.tapMilestones.push(milestone);
        this.triggerMilestoneReward(milestone);
      }
    });
  }
}
```

## アイテムシステム

### 購入可能アイテム
```javascript
const shopItems = {
  // 永続強化アイテム
  scoreMultiplier: {
    name: "スコア倍率アップ",
    description: "獲得スコアが増加します",
    baseCost: 75,
    maxLevel: 5,
    costMultiplier: 1.3,
    effects: [
      { level: 1, multiplier: 1.3, cost: 75 },
      { level: 2, multiplier: 1.6, cost: 98 },
      { level: 3, multiplier: 1.9, cost: 127 },
      { level: 4, multiplier: 2.2, cost: 165 },
      { level: 5, multiplier: 2.5, cost: 215 }
    ]
  },
  
  bubbleSlower: {
    name: "泡速度低下",
    description: "泡の成長速度が遅くなります",
    baseCost: 60,
    maxLevel: 4,
    costMultiplier: 1.4,
    effects: [
      { level: 1, speedMultiplier: 0.9, cost: 60 },
      { level: 2, speedMultiplier: 0.8, cost: 84 },
      { level: 3, speedMultiplier: 0.7, cost: 118 },
      { level: 4, speedMultiplier: 0.6, cost: 165 }
    ]
  },
  
  extraLife: {
    name: "追加ライフ",
    description: "開始時のHPが増加します",
    baseCost: 100,
    maxLevel: 2,
    costMultiplier: 2.0,
    effects: [
      { level: 1, hpBonus: 25, cost: 100 },   // +25 HP
      { level: 2, hpBonus: 50, cost: 200 }    // +50 HP
    ]
  },
  
  // 一時的ブースター
  temporaryBoosters: {
    doubleScoreBooster: {
      name: "スコア2倍ブースター",
      description: "次の1ゲームでスコアが2倍",
      cost: 30,
      duration: "1game",
      effect: { scoreMultiplier: 2.0 }
    },
    
    luckyBooster: {
      name: "ラッキーブースター",
      description: "次の1ゲームで特殊泡出現率アップ",
      cost: 25,
      duration: "1game",
      effect: { specialBubbleRate: 2.0 }
    },
    
    shieldBooster: {
      name: "シールドブースター",
      description: "次の1ゲームでダメージ半減",
      cost: 35,
      duration: "1game",
      effect: { damageReduction: 0.5 }
    }
  },
  
  // 特別アイテム
  specialItems: {
    reset: {
      name: "リセット",
      description: "全アイテムレベルをリセットしてAPを返還",
      cost: 25,
      maxUses: 1,
      effect: "resetAllItems"
    },
    
    premiumPass: {
      name: "プレミアムパス",
      description: "30日間AP獲得量が2倍",
      cost: 500,
      duration: 2592000000, // 30日（ミリ秒）
      effect: { apMultiplier: 2.0 }
    }
  }
};
```

### アイテム効果の適用
```javascript
class ItemEffectManager {
  constructor(playerData) {
    this.playerData = playerData;
    this.activeEffects = new Map();
  }
  
  // 永続アイテム効果の計算
  calculatePermanentEffects() {
    const effects = {
      scoreMultiplier: 1.0,
      timeBonus: 0,
      speedMultiplier: 1.0,
      hpBonus: 0
    };
    
    // 各アイテムの効果を累積
    Object.entries(this.playerData.items).forEach(([itemId, itemData]) => {
      const itemConfig = shopItems[itemId];
      if (itemConfig && itemData.level > 0) {
        const effect = itemConfig.effects[itemData.level - 1];
        
        if (effect.multiplier) {
          effects.scoreMultiplier *= effect.multiplier;
        }
        if (effect.timeBonus) {
          effects.timeBonus += effect.timeBonus;
        }
        if (effect.speedMultiplier) {
          effects.speedMultiplier *= effect.speedMultiplier;
        }
        if (effect.hpBonus) {
          effects.hpBonus += effect.hpBonus;
        }
      }
    });
    
    return effects;
  }
  
  // 一時的ブースターの適用
  applyTemporaryBooster(boosterId) {
    const booster = shopItems.temporaryBoosters[boosterId];
    if (booster) {
      this.activeEffects.set(boosterId, {
        effect: booster.effect,
        duration: booster.duration,
        startTime: Date.now()
      });
    }
  }
}
```

## 進歩の可視化

### 進歩バー・インジケーター
```javascript
const progressVisualization = {
  // レベル進歩バー
  levelProgress: {
    currentExp: 0,
    requiredExp: 0,
    percentage: 0,
    animationDuration: 1000
  },
  
  // TAP進歩表示
  tapProgress: {
    currentTAP: 0,
    nextMilestone: 0,
    progressToNext: 0,
    milestoneRewards: []
  },
  
  // アンロック進歩
  unlockProgress: {
    totalFeatures: 0,
    unlockedFeatures: 0,
    nextUnlock: null,
    progressToNext: 0
  }
};
```

### 統計・実績表示
```javascript
const progressStatistics = {
  // 基本統計
  basicStats: {
    totalPlayTime: 0,
    gamesPlayed: 0,
    totalScore: 0,
    averageScore: 0,
    bestScore: 0
  },
  
  // 進歩統計
  progressStats: {
    currentLevel: 0,
    totalExperience: 0,
    currentAP: 0,
    totalAPEarned: 0,
    totalTAP: 0,
    achievementsUnlocked: 0,
    stagesUnlocked: 0
  },
  
  // 比較統計
  comparisonStats: {
    lastWeekProgress: {},
    lastMonthProgress: {},
    improvementRate: 0
  }
};
```

## 進歩システムのバランス設計

### 進歩速度の調整
```javascript
const progressionBalance = {
  // 初心者期（レベル1-10）
  beginner: {
    levelUpTime: "30-60分",
    unlockFrequency: "2-3レベルごと",
    apGainRate: "高め",
    difficulty: "緩やか"
  },
  
  // 中級者期（レベル11-25）
  intermediate: {
    levelUpTime: "1-2時間",
    unlockFrequency: "3-5レベルごと",
    apGainRate: "標準",
    difficulty: "適度"
  },
  
  // 上級者期（レベル26-40）
  advanced: {
    levelUpTime: "2-4時間",
    unlockFrequency: "5-10レベルごと",
    apGainRate: "低め",
    difficulty: "高め"
  },
  
  // マスター期（レベル41-50）
  master: {
    levelUpTime: "4-8時間",
    unlockFrequency: "10レベルごと",
    apGainRate: "最低",
    difficulty: "最高"
  }
};
```



## 進歩データの管理

### データ構造
```javascript
const playerProgressData = {
  // 基本進歩データ
  level: 1,
  experience: 0,
  currentAP: 0,
  totalAPEarned: 0,
  totalTAP: 0,
  
  // アンロック状況
  unlockedStages: ["tutorial", "normal"],
  unlockedFeatures: ["basic"],
  unlockedAchievements: [],
  
  // アイテム所有状況
  items: {
    scoreMultiplier: { level: 0, purchased: false },
    timeExtension: { level: 0, purchased: false },
    // ... 他のアイテム
  },
  
  // 統計データ
  statistics: {
    gamesPlayed: 0,
    totalScore: 0,
    totalPlayTime: 0,
    // ... 他の統計
  },
  
  // 進歩履歴
  progressHistory: {
    levelUps: [],
    unlocks: [],
    achievements: [],
    milestones: []
  }
};
```

### データの永続化
- **LocalStorage**: ブラウザローカルストレージに保存
- **自動保存**: 進歩データの自動保存