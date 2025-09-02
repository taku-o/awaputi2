# BubblePop データ構造設計

## 1. ユーザーデータ (User Data)

ユーザーの基本情報と進行状況を管理するデータ構造

```jsonc
{
  "userId": "user_001",  // ユーザー識別子
  "username": "プレイヤー1",  // ユーザー名
  "level": 15,  // 現在のレベル
  "experience": 12500,  // 現在の経験値
  "experienceToNextLevel": 3500,  // 次のレベルまでの必要経験値
  "ap": 450,  // 現在の所持AP (Achievement Points)
  "tap": 25000,  // 累計TAP (Total Achievement Points)
  "totalScore": 580000,  // 累計総スコア
  "highScore": 45000,  // 最高スコア
  "gamesPlayed": 120,  // 総プレイ回数
  "totalBubblesPopped": 5840,  // 累計割った泡の数
  "createdAt": "2025-01-01T00:00:00Z",  // アカウント作成日時
  "lastPlayedAt": "2025-09-01T14:30:00Z"  // 最終プレイ日時
}
```

## 2. ゲームセッションデータ (Game Session Data)

アクティブなゲームプレイ中の状態を管理

```jsonc
{
  "sessionId": "session_001",  // セッション識別子
  "stageId": "normal",  // プレイ中のステージID
  "currentScore": 12500,  // 現在のスコア
  "currentCombo": 8,  // 現在のコンボ数
  "maxCombo": 25,  // このセッションでの最大コンボ
  "comboMultiplier": 1.64,  // 現在のコンボ倍率
  "hp": 85,  // 現在のHP
  "maxHp": 125,  // 最大HP (アイテム効果込み)
  "timeRemaining": 245.5,  // 残り時間（秒）
  "elapsedTime": 54.5,  // 経過時間（秒）
  "bubblesPopped": 156,  // このセッションで割った泡の数
  "activeBubbles": [],  // 現在画面上の泡リスト（後述）
  "activeEffects": {  // アクティブな特殊効果
    "bonusTime": {
      "active": true,
      "remainingTime": 3.2,  // 残り効果時間
      "multiplier": 2.0  // 効果倍率
    },
    "timeStop": {
      "active": false,
      "remainingTime": 0,
      "duration": 0
    },
    "nextBubbleMultiplier": {
      "active": false,
      "multiplier": 1.0
    }
  },
  "itemEffects": {  // アイテムによる効果
    "scoreMultiplier": 1.5,  // スコア倍率アイテムの効果
    "hpBoost": 25,  // HP増加アイテムの効果
    "revivalCount": 1,  // 残り復活回数
    "rareRate": 1.3,  // レア率アップ効果
    "comboBoost": 1.5  // コンボ時間延長効果
  },
  "statistics": {  // セッション統計
    "bubbleTypeCount": {  // 泡タイプ別の破壊数
      "normal": 120,
      "stone": 25,
      "iron": 8,
      "rainbow": 3,
      "pink": 5
    },
    "damageReceived": 25,  // 受けたダメージ総量
    "healingReceived": 20  // 回復した量
  }
}
```

## 3. バブル（泡）データ (Bubble Data)

個々の泡のインスタンスデータ

```jsonc
{
  "bubbleId": "bubble_001",  // 泡の識別子
  "type": "normal",  // 泡のタイプ
  "position": {  // 現在位置
    "x": 320.5,
    "y": 240.2
  },
  "velocity": {  // 移動速度
    "x": 1.2,
    "y": -0.8
  },
  "size": 48,  // 現在のサイズ（ピクセル）
  "baseSize": 40,  // 基本サイズ
  "scale": 1.2,  // スケール倍率
  "hp": 1,  // 現在のHP
  "maxHp": 1,  // 最大HP
  "age": 3500,  // 生成からの経過時間（ミリ秒）
  "ageStage": "mature",  // 年齢段階 (young/mature/old/critical)
  "ageMultiplier": 1.5,  // 年齢によるスコア倍率
  "baseScore": 15,  // 基本スコア
  "breathPhase": 0.7,  // 呼吸アニメーションの位相（0-1）
  "breathSpeed": 0.002,  // 呼吸速度
  "breathScale": 0.05,  // 呼吸によるサイズ変化量
  "bounceCoefficient": 0.7,  // 境界反発係数
  "clickCount": 0,  // クリックされた回数
  "specialEffect": null,  // 特殊効果（通常泡はnull）
  "visualState": {  // 視覚的状態
    "opacity": 1.0,
    "color": "#4A90E2",
    "glowIntensity": 0,
    "isFlashing": false
  },
  "willBurstAt": 10000  // 自動破裂までの時間（ミリ秒）
}
```

## 4. ステージデータ (Stage Data)

ステージの定義と設定

```jsonc
{
  "stageId": "normal",  // ステージ識別子
  "name": "普通のアワアワ",  // ステージ名
  "description": "基本的な泡が出現するステージ",  // 説明文
  "difficulty": 2,  // 難易度レベル (1-10)
  "timeLimit": 300,  // 制限時間（秒）
  "unlockRequirement": {  // 解放条件
    "type": "tap",  // 条件タイプ
    "value": 0  // 必要値
  },
  "isUnlocked": true,  // 解放済みフラグ
  "bubbleConfig": {  // 泡生成設定
    "spawnRate": 1.5,  // 泡生成率（個/秒）
    "maxBubbles": 20,  // 最大同時泡数
    "availableTypes": [  // 出現する泡タイプと確率
      { "type": "normal", "weight": 70 },
      { "type": "stone", "weight": 15 },
      { "type": "rainbow", "weight": 3 },
      { "type": "pink", "weight": 4 },
      { "type": "clock", "weight": 3 },
      { "type": "score", "weight": 5 }
    ]
  },
  "specialEvents": [],  // 特殊イベント（ボスステージ用）
  "bestScore": 32500,  // ベストスコア
  "playCount": 15  // プレイ回数
}
```

## 5. アイテムデータ (Item Data)

ショップで購入可能なアイテムの定義

```jsonc
{
  "itemId": "scoreMultiplier",  // アイテム識別子
  "name": "スコア倍率アップ",  // アイテム名
  "description": "獲得スコアが増加します",  // 説明文
  "category": "permanent",  // カテゴリ (permanent/consumable)
  "baseCost": 75,  // 基本コスト
  "costMultiplier": 1.3,  // レベルアップ時のコスト倍率
  "maxLevel": 5,  // 最大レベル
  "currentLevel": 2,  // 現在のレベル
  "nextLevelCost": 127,  // 次レベルのコスト
  "effects": {  // レベル別効果
    "level1": { "multiplier": 1.3 },
    "level2": { "multiplier": 1.5 },
    "level3": { "multiplier": 1.7 },
    "level4": { "multiplier": 1.9 },
    "level5": { "multiplier": 2.1 }
  },
  "currentEffect": { "multiplier": 1.5 },  // 現在の効果
  "purchasedAt": "2025-08-15T10:00:00Z",  // 購入日時
  "lastUpgradedAt": "2025-08-25T14:00:00Z"  // 最終アップグレード日時
}
```

## 6. 実績データ (Achievement Data)

実績の定義と進行状況

```jsonc
{
  "achievementId": "bubbleMaster",  // 実績識別子
  "name": "泡マスター",  // 実績名
  "description": "1000個の泡を割る",  // 説明文
  "category": "basicPlay",  // カテゴリ
  "icon": "👑",  // アイコン
  "reward": 200,  // 報酬AP
  "condition": {  // 達成条件
    "type": "cumulative",  // 条件タイプ
    "target": "bubblesPopped",  // 対象
    "value": 1000  // 必要値
  },
  "progress": {  // 進行状況
    "current": 850,  // 現在値
    "required": 1000,  // 必要値
    "percentage": 85  // 進行率（%）
  },
  "isCompleted": false,  // 達成済みフラグ
  "completedAt": null,  // 達成日時
  "tier": 2,  // ティア（段階）
  "nextTier": {  // 次のティア情報
    "achievementId": "bubbleGod",
    "requirement": 10000
  }
}
```

## 7. セーブデータ (Save Data)

永続化用の統合データ構造

```jsonc
{
  "version": "1.0.0",  // セーブデータのバージョン
  "userData": {  // ユーザーデータ（前述）
    "userId": "user_001",
    "username": "プレイヤー1",
    "level": 15,
    "experience": 12500,
    "ap": 450,
    "tap": 25000,
    "totalScore": 580000,
    "highScore": 45000
  },
  "stageProgress": {  // ステージ進行状況
    "tutorial": { "unlocked": true, "bestScore": 5000, "playCount": 5 },
    "normal": { "unlocked": true, "bestScore": 32500, "playCount": 15 },
    "hard": { "unlocked": true, "bestScore": 28000, "playCount": 10 },
    "veryHard": { "unlocked": true, "bestScore": 25000, "playCount": 8 },
    "special": { "unlocked": true, "bestScore": 0, "playCount": 0 },
    "nightmare": { "unlocked": false, "bestScore": 0, "playCount": 0 }
  },
  "ownedItems": [  // 所持アイテムリスト
    { "itemId": "scoreMultiplier", "level": 2 },
    { "itemId": "hpBoost", "level": 1 },
    { "itemId": "revival", "level": 1 }
  ],
  "achievements": {  // 実績進行状況
    "firstBubble": { "completed": true, "completedAt": "2025-01-01T00:05:00Z" },
    "bubbleHunter": { "completed": true, "completedAt": "2025-01-05T10:00:00Z" },
    "bubbleMaster": { "completed": false, "progress": 850 },
    "firstThousand": { "completed": true, "completedAt": "2025-01-02T15:00:00Z" }
  },
  "statistics": {  // 統計データ
    "totalPlayTime": 18500,  // 総プレイ時間（秒）
    "longestCombo": 45,  // 最長コンボ
    "favoriteStage": "normal",  // 最もプレイしたステージ
    "totalDamageReceived": 1250,  // 総ダメージ量
    "totalHealingReceived": 800,  // 総回復量
    "bubbleTypeStats": {  // 泡タイプ別統計
      "normal": { "popped": 4500, "missedBursts": 120 },
      "stone": { "popped": 800, "missedBursts": 15 },
      "iron": { "popped": 250, "missedBursts": 8 }
    }
  },
  "lastSaved": "2025-09-01T14:30:00Z"  // 最終セーブ日時
}
```

## 8. 設定データ (Settings Data)

ゲーム設定の保存

```jsonc
{
  "audio": {  // 音声設定
    "masterVolume": 80,  // マスター音量 (0-100)
    "bgmVolume": 70,  // BGM音量 (0-100)
    "sfxVolume": 85,  // 効果音音量 (0-100)
    "isMuted": false  // ミュート状態
  },
  "graphics": {  // グラフィック設定
    "quality": "high",  // 品質 (low/medium/high)
    "particleEffects": true,  // パーティクルエフェクト
    "screenShake": true,  // 画面シェイク
    "showDamageNumbers": true,  // ダメージ数値表示
    "reducedMotion": false  // モーション軽減
  },
  "gameplay": {  // ゲームプレイ設定
    "difficulty": "normal",  // 難易度
    "autoSave": true,  // 自動セーブ
    "showTutorialHints": true,  // チュートリアルヒント表示
    "confirmPurchases": false  // 購入確認ダイアログ
  },
  "language": "ja",  // 言語設定

  "controls": {  // コントロール設定
    "mouseButton": "left",  // マウスボタン (left/right)
    "keyBindings": {  // キーバインディング
      "pause": "Escape",
      "confirm": "Enter",
      "cancel": "Escape",
      "navigate": ["ArrowKeys", "WASD"]
    }
  }
}
```

## 9. バブルタイプ定義 (Bubble Type Definition)

バブルタイプのマスターデータ

```jsonc
{
  "normal": {
    "id": "normal",
    "name": "通常泡",
    "hp": 1,
    "baseScore": 15,
    "color": "#4A90E2",
    "size": 40,
    "specialEffect": null,
    "movementPattern": "standard",  // 移動パターン
    "breathIntensity": 0.05,  // 呼吸強度
    "bounceCoefficient": 0.7,  // 反発係数
    "weight": 1.0,  // 重さ（移動に影響）
    "growthRate": 1.0,  // 成長速度
    "burstTime": 10000,  // 自動破裂時間（ミリ秒）
    "description": "最も基本的な泡",
    "rarity": "common"  // レア度
  },
  "rainbow": {
    "id": "rainbow",
    "name": "虹色泡",
    "hp": 1,
    "baseScore": 50,
    "color": "rainbow",  // 特殊レンダリング
    "size": 45,
    "specialEffect": {
      "type": "bonusTime",
      "duration": 5000,
      "multiplier": 2.0
    },
    "movementPattern": "floating",
    "breathIntensity": 0.07,
    "bounceCoefficient": 0.8,
    "weight": 0.8,
    "growthRate": 0.8,
    "burstTime": 8000,
    "description": "割ると短時間ボーナスタイムが発動",
    "rarity": "rare"
  },
  "boss": {
    "id": "boss",
    "name": "ボス泡",
    "hp": 10,
    "baseScore": 500,
    "color": "#8B0000",
    "size": 80,
    "specialEffect": {
      "type": "phaseChange",
      "phases": 3,  // 段階的に小さくなる
      "sizeReduction": 0.8  // 各段階でのサイズ縮小率
    },
    "movementPattern": "slow",
    "breathIntensity": 0.03,
    "bounceCoefficient": 0.5,
    "weight": 3.0,
    "growthRate": 0.5,
    "burstTime": 30000,
    "description": "10回クリックが必要な巨大泡",
    "rarity": "legendary"
  }
}
```



## データ構造の使用例と関連性

### ゲーム開始時のデータフロー
1. **セーブデータ読み込み** → ユーザーデータ、設定データを復元
2. **ステージ選択** → ステージデータから設定を読み込み
3. **セッション作成** → ゲームセッションデータを初期化
4. **アイテム効果適用** → 所持アイテムから効果を計算
5. **バブル生成** → バブルタイプ定義を基にバブルデータを作成

### スコア計算時のデータ参照
1. バブルデータから基本スコアと年齢倍率を取得
2. セッションデータからコンボ倍率を取得
3. アイテムデータから倍率効果を取得
4. 最終スコアを計算してセッションデータに反映

### 進行状況の保存
1. セッション終了時にユーザーデータを更新（経験値、TAP等）
2. 実績の進行状況をチェックして更新
3. ステージのベストスコアを更新
4. セーブデータとして永続化

これらのデータ構造は相互に関連し、ゲームの状態管理と進行を支えます。