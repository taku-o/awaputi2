import { create } from 'zustand';
import { UIState } from '../types/StoreTypes';

/**
 * UI状態ストア
 */
export interface UIStore extends UIState {
  // Actions
  setCurrentPage: (page: string) => void;
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  toggleModal: (modal: keyof UIState['modals']) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (key: keyof UIState['loading'], isLoading: boolean) => void;
  setFocus: (element: string | null) => void;
  resetUIState: () => void;
}

// デフォルト値
const defaultUIState: UIState = {
  currentPage: '/',
  modals: {
    isHelpOpen: false,
    isSettingsOpen: false,
    isShopOpen: false,
    isAccountOpen: false,
  },
  notifications: [],
  loading: {
    isGameLoading: false,
    isDataLoading: false,
  },
  focus: {
    currentElement: null,
    focusHistory: [],
    isFocusVisible: false,
    focusMode: 'auto' as const,
  },
};

/**
 * UI状態ストア
 */
const useUIStore = create<UIStore>((set) => ({
  ...defaultUIState,
  
  setCurrentPage: (page): void => set({ currentPage: page }),
  
  openModal: (modal): void => set((state) => ({
    modals: { ...state.modals, [modal]: true },
  })),
  
  closeModal: (modal): void => set((state) => ({
    modals: { ...state.modals, [modal]: false },
  })),
  
  toggleModal: (modal): void => set((state) => ({
    modals: { ...state.modals, [modal]: !state.modals[modal] },
  })),
  
  addNotification: (notification): void => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        ...notification,
        id: `notification-${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
      },
    ],
  })),
  
  removeNotification: (id): void => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),
  
  clearNotifications: (): void => set({ notifications: [] }),
  
  setLoading: (key, isLoading): void => set((state) => ({
    loading: { ...state.loading, [key]: isLoading },
  })),
  
  setFocus: (element): void => set((state) => ({
    focus: {
      ...state.focus,
      currentElement: element,
      focusHistory: element
        ? [...state.focus.focusHistory, element]
        : state.focus.focusHistory,
    },
  })),
  
  resetUIState: (): void => set(defaultUIState),
}));

export default useUIStore;