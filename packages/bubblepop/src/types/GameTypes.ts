export type BubbleType = 
  | 'normal'     // 通常泡
  | 'stone'      // 石泡
  | 'iron'       // 鉄泡
  | 'diamond'    // ダイヤモンド泡
  | 'pink'       // 回復泡
  | 'poison'     // 毒泡
  | 'rainbow'    // 虹色泡
  | 'clock'      // 時計泡
  | 'score'      // スコア泡
  | 'spike'      // トゲ泡
  | 'electric'   // 電気泡
  | 'snowflake'  // 雪の結晶泡
  | 'magnet'     // 磁石泡
  | 'earthquake' // 地震泡
  | 'shield'     // シールド泡
  | 'phantom'    // 幻影泡
  | 'laser'      // レーザー泡
  | 'tornado';   // 竜巻泡

export interface BubbleData {
  id: string;
  type: BubbleType;
  hp: number;
  maxHp: number;
  score: number;
  position: Position;
  velocity: Velocity;
  size: number;
  isPopping: boolean;
  createdAt: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface BubbleSpawnSystem {
  spawnRate: number;
  maxBubbles: number;
  spawnPositions: Position[];
  bubbleTypes: BubbleType[];
  difficultyScaling: number;
}

export interface BubblePhysics {
  gravity: number;
  airResistance: number;
  bounceCoefficient: number;
  friction: number;
  maxVelocity: number;
  naturalMovement: NaturalMovement;
}

export interface NaturalMovement {
  enabled: boolean;
  baseSpeed: number;
  randomFactor: number;
  directionChange: number;
  smoothness: number;
}

export interface GameSession {
  sessionId: string;
  stageId: string;
  score: number;
  timeElapsed: number;
  bubblesPopped: number;
  combos: number;
  maxCombo: number;
  isActive: boolean;
  isPaused: boolean;
  startTime: number;
  endTime: number | null;
}

export interface StageData {
  stageId: string;
  stageName: string;
  difficulty: 'easy' | 'normal' | 'hard';
  targetScore: number;
  timeLimit: number;
  availableBubbleTypes: BubbleType[];
  spawnRate: number;
  maxBubbles: number;
}

export interface GameResult {
  sessionId: string;
  stageId: string;
  finalScore: number;
  bubblesPopped: number;
  maxCombo: number;
  timeElapsed: number;
  apEarned: number;
  experienceEarned: number;
  isCleared: boolean;
  rank: 'S' | 'A' | 'B' | 'C' | 'D';
}

export interface BubbleEffect {
  type: 'heal' | 'damage' | 'bonus' | 'time_stop' | 'score_multiplier';
  value: number;
  duration?: number;
}

export interface ComboData {
  count: number;
  multiplier: number;
  lastPopTime: number;
  comboTimeout: number;
}