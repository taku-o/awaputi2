import React, { useEffect, useRef } from 'react';
import { AppRouter } from './router/Router';
import { loadPersistedData, setupAutoPersistence } from './stores/persistence';

function App(): React.ReactElement {
  const initialized = useRef(false);

  useEffect(() => {
    // React.StrictModeによる重複実行を防ぐ
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    // アプリケーション起動時のデータ読み込み
    try {
      loadPersistedData();
      console.log('Persisted data loaded successfully');
    } catch (error) {
      console.error('Failed to load persisted data:', error);
      // データ読み込み失敗時はデフォルト値で初期化されている状態のまま続行
    }

    // 自動保存機能の設定
    const cleanup = setupAutoPersistence();

    // クリーンアップ関数を返す
    return cleanup;
  }, []);

  return <AppRouter />;
}

export default App;
