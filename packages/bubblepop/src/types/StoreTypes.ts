export interface PlayerState {
  userId: string;
  username: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  ap: number;
  tap: number;
  totalScore: number;
  highScore: number;
  gamesPlayed: number;
  totalBubblesPopped: number;
  createdAt: string;
  lastPlayedAt: string;
}

export interface AudioSettings {
  masterVolume: number;
  bgmVolume: number;
  sfxVolume: number;
  isMuted: boolean;
}

export interface GraphicsSettings {
  quality: 'auto' | 'low' | 'medium' | 'high' | 'ultra';
  particleEffects: boolean;
  screenShake: boolean;
  showDamageNumbers: boolean;
  reducedMotion: boolean;
}

export interface GameplaySettings {
  difficulty: 'normal';
  autoSave: boolean;
  showTutorialHints: boolean;
  confirmPurchases: boolean;
}

export interface ControlSettings {
  mouseButton: 'left' | 'right';
  keyBindings: Record<string, string | string[]>;
}

export interface SettingsState {
  audio: AudioSettings;
  graphics: GraphicsSettings;
  gameplay: GameplaySettings;
  language: 'ja' | 'en';
  controls: ControlSettings;
}

export interface ModalState {
  isHelpOpen: boolean;
  isSettingsOpen: boolean;
  isShopOpen: boolean;
  isAccountOpen: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

export interface LoadingState {
  isGameLoading: boolean;
  isDataLoading: boolean;
}

export interface FocusState {
  currentElement: string | null;
  focusHistory: string[];
}

export interface UIState {
  currentPage: string;
  modals: ModalState;
  notifications: Notification[];
  loading: LoadingState;
  focus: FocusState;
}

export interface PlayerStatistics {
  totalScore?: number;
  highScore?: number;
  gamesPlayed?: number;
  totalBubblesPopped?: number;
}