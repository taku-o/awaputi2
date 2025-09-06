import React from 'react';
import { TestImport } from './components/TestImport';

function App(): React.ReactElement {
  return (
    <div className="App">
      <h1>BubblePop - 泡々ぷちぷち</h1>
      <p>ゲームアプリケーションの基盤が構築されました。</p>
      <TestImport />
    </div>
  );
}

export default App;
