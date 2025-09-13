import { renderHook, act } from '@testing-library/react';
import useUIStore from '../UIStore';

describe('UIStore', () => {
  beforeEach(() => {
    // 各テストの前にストアをリセット
    const store = useUIStore.getState();
    store.resetUIState();
  });

  describe('初期状態', () => {
    test('デフォルト値で初期化される', () => {
      const { result } = renderHook(() => useUIStore());

      expect(result.current.currentPage).toBe('/');
      expect(result.current.modals.isHelpOpen).toBe(false);
      expect(result.current.modals.isSettingsOpen).toBe(false);
      expect(result.current.modals.isShopOpen).toBe(false);
      expect(result.current.modals.isAccountOpen).toBe(false);
      expect(result.current.notifications).toEqual([]);
      expect(result.current.loading.isGameLoading).toBe(false);
      expect(result.current.loading.isDataLoading).toBe(false);
      expect(result.current.focus.currentElement).toBeNull();
      expect(result.current.focus.focusHistory).toEqual([]);
    });
  });

  describe('ページ管理', () => {
    test('現在のページを更新できる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setCurrentPage('/game');
      });

      expect(result.current.currentPage).toBe('/game');

      act(() => {
        result.current.setCurrentPage('/settings');
      });

      expect(result.current.currentPage).toBe('/settings');
    });
  });

  describe('モーダル管理', () => {
    test('モーダルを開くことができる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.openModal('isHelpOpen');
      });

      expect(result.current.modals.isHelpOpen).toBe(true);
      expect(result.current.modals.isSettingsOpen).toBe(false);
    });

    test('モーダルを閉じることができる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.openModal('isSettingsOpen');
      });

      expect(result.current.modals.isSettingsOpen).toBe(true);

      act(() => {
        result.current.closeModal('isSettingsOpen');
      });

      expect(result.current.modals.isSettingsOpen).toBe(false);
    });

    test('モーダルの開閉をトグルできる', () => {
      const { result } = renderHook(() => useUIStore());

      expect(result.current.modals.isShopOpen).toBe(false);

      act(() => {
        result.current.toggleModal('isShopOpen');
      });

      expect(result.current.modals.isShopOpen).toBe(true);

      act(() => {
        result.current.toggleModal('isShopOpen');
      });

      expect(result.current.modals.isShopOpen).toBe(false);
    });

    test('複数のモーダルを同時に開ける', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.openModal('isHelpOpen');
        result.current.openModal('isAccountOpen');
      });

      expect(result.current.modals.isHelpOpen).toBe(true);
      expect(result.current.modals.isAccountOpen).toBe(true);
      expect(result.current.modals.isSettingsOpen).toBe(false);
      expect(result.current.modals.isShopOpen).toBe(false);
    });
  });

  describe('通知管理', () => {
    test('通知を追加できる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: 'success',
          message: 'テスト通知',
          priority: 'medium',
          category: 'system',
        });
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].type).toBe('success');
      expect(result.current.notifications[0].message).toBe('テスト通知');
      expect(result.current.notifications[0].id).toBeDefined();
      expect(result.current.notifications[0].timestamp).toBeDefined();
    });

    test('複数の通知を追加できる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: 'info',
          message: '情報通知',
          priority: 'low',
          category: 'system',
        });
        result.current.addNotification({
          type: 'warning',
          message: '警告通知',
          priority: 'medium',
          category: 'system',
        });
        result.current.addNotification({
          type: 'error',
          message: 'エラー通知',
          priority: 'high',
          category: 'system',
        });
      });

      expect(result.current.notifications).toHaveLength(3);
      expect(result.current.notifications[0].type).toBe('info');
      expect(result.current.notifications[1].type).toBe('warning');
      expect(result.current.notifications[2].type).toBe('error');
    });

    test('特定の通知を削除できる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: 'info',
          message: '通知1',
          priority: 'medium',
          category: 'system',
        });
        result.current.addNotification({
          type: 'info',
          message: '通知2',
          priority: 'medium',
          category: 'system',
        });
      });

      const firstNotificationId = result.current.notifications[0].id;

      act(() => {
        result.current.removeNotification(firstNotificationId);
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].message).toBe('通知2');
    });

    test('すべての通知をクリアできる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: 'info',
          message: '通知1',
          priority: 'medium',
          category: 'system',
        });
        result.current.addNotification({
          type: 'info',
          message: '通知2',
          priority: 'medium',
          category: 'system',
        });
        result.current.addNotification({
          type: 'info',
          message: '通知3',
          priority: 'medium',
          category: 'system',
        });
      });

      expect(result.current.notifications).toHaveLength(3);

      act(() => {
        result.current.clearNotifications();
      });

      expect(result.current.notifications).toHaveLength(0);
    });
  });

  describe('ローディング状態管理', () => {
    test('ゲームローディング状態を設定できる', () => {
      const { result } = renderHook(() => useUIStore());

      expect(result.current.loading.isGameLoading).toBe(false);

      act(() => {
        result.current.setLoading('isGameLoading', true);
      });

      expect(result.current.loading.isGameLoading).toBe(true);

      act(() => {
        result.current.setLoading('isGameLoading', false);
      });

      expect(result.current.loading.isGameLoading).toBe(false);
    });

    test('データローディング状態を設定できる', () => {
      const { result } = renderHook(() => useUIStore());

      expect(result.current.loading.isDataLoading).toBe(false);

      act(() => {
        result.current.setLoading('isDataLoading', true);
      });

      expect(result.current.loading.isDataLoading).toBe(true);

      act(() => {
        result.current.setLoading('isDataLoading', false);
      });

      expect(result.current.loading.isDataLoading).toBe(false);
    });

    test('複数のローディング状態を個別に管理できる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setLoading('isGameLoading', true);
        result.current.setLoading('isDataLoading', false);
      });

      expect(result.current.loading.isGameLoading).toBe(true);
      expect(result.current.loading.isDataLoading).toBe(false);

      act(() => {
        result.current.setLoading('isGameLoading', false);
        result.current.setLoading('isDataLoading', true);
      });

      expect(result.current.loading.isGameLoading).toBe(false);
      expect(result.current.loading.isDataLoading).toBe(true);
    });
  });

  describe('フォーカス管理', () => {
    test('フォーカス要素を設定できる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setFocus('button-start');
      });

      expect(result.current.focus.currentElement).toBe('button-start');
      expect(result.current.focus.focusHistory).toContain('button-start');
    });

    test('フォーカス履歴が正しく記録される', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setFocus('element1');
        result.current.setFocus('element2');
        result.current.setFocus('element3');
      });

      expect(result.current.focus.currentElement).toBe('element3');
      expect(result.current.focus.focusHistory).toEqual([
        'element1',
        'element2',
        'element3',
      ]);
    });

    test('フォーカスをnullに設定できる', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setFocus('element1');
      });

      expect(result.current.focus.currentElement).toBe('element1');

      act(() => {
        result.current.setFocus(null);
      });

      expect(result.current.focus.currentElement).toBeNull();
      // nullの場合は履歴に追加されない
      expect(result.current.focus.focusHistory).toEqual(['element1']);
    });
  });

  describe('リセット機能', () => {
    test('UIState全体をリセットできる', () => {
      const { result } = renderHook(() => useUIStore());

      // 様々な状態を変更
      act(() => {
        result.current.setCurrentPage('/game');
        result.current.openModal('isHelpOpen');
        result.current.addNotification({
          type: 'info',
          message: 'テスト通知',
          priority: 'medium',
          category: 'system',
        });
        result.current.setLoading('isGameLoading', true);
        result.current.setFocus('test-element');
      });

      // 変更を確認
      expect(result.current.currentPage).toBe('/game');
      expect(result.current.modals.isHelpOpen).toBe(true);
      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.loading.isGameLoading).toBe(true);
      expect(result.current.focus.currentElement).toBe('test-element');

      // リセット
      act(() => {
        result.current.resetUIState();
      });

      // すべてがデフォルト値に戻ることを確認
      expect(result.current.currentPage).toBe('/');
      expect(result.current.modals.isHelpOpen).toBe(false);
      expect(result.current.notifications).toEqual([]);
      expect(result.current.loading.isGameLoading).toBe(false);
      expect(result.current.focus.currentElement).toBeNull();
      expect(result.current.focus.focusHistory).toEqual([]);
    });
  });
});