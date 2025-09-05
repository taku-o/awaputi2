# エラーハンドリング方針

## 概要
BubblePopアプリケーションにおけるエラーハンドリングの統一的な方針を定義します。エラーの種類に応じて適切な対応を行い、ユーザーエクスペリエンスを向上させます。

## 基本方針

### 1. アプリ外部への通信が失敗した場合

#### 対応内容
- **エラーログを出力する**
- **エラーが起きたことをエラーページ、もしくはエラーダイアログでユーザーに通知する**

#### 対象となる通信
- 外部サービス連携
- ネットワーク通信
- ファイルダウンロード/アップロード

#### 実装指針
```typescript
// 例：外部サービス連携失敗時の処理
try {
  const response = await fetch('https://external-api.com/data');
  if (!response.ok) {
    throw new Error(`External API Error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  // エラーログ出力
  console.error('外部サービス通信エラー:', error);
  
  // ユーザーにエラー通知
  showErrorDialog('外部サービスとの通信に失敗しました。しばらく時間をおいてから再度お試しください。');
  
  throw error; // 処理を終了
}
```

### 2. それ以外のエラー

#### 対応内容
- **エラーログを出力する**
- **そのエラーが発生したい時点で処理を終了させる**
- **リトライはしない**
- **フォールバックもしない**
- **エラー回避もしない**

#### 対象となるエラー
- API呼び出しエラー
- アプリケーション内部のロジックエラー
- データ処理エラー
- 設定ファイル読み込みエラー
- メモリ不足エラー
- その他の予期しないエラー

#### 実装指針
```typescript
// 例：API呼び出しエラー時の処理
try {
  const response = await fetch('/api/game-data');
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  // エラーログ出力
  console.error('API呼び出しエラー:', error);
  
  // 処理を即座に終了（リトライ・フォールバックなし）
  throw error;
}

// 例：内部処理エラー時の処理
function processGameData(data: GameData) {
  try {
    // データ処理
    const result = validateAndProcess(data);
    return result;
  } catch (error) {
    // エラーログ出力
    console.error('データ処理エラー:', error);
    
    // 処理を即座に終了（リトライ・フォールバックなし）
    throw error;
  }
}
```

## エラーログ出力仕様

### ログレベル
- **ERROR**: エラー発生時
- **WARN**: 警告（エラーではないが注意が必要）
- **INFO**: 一般的な情報
- **DEBUG**: デバッグ情報

### ログ出力形式
```typescript
interface ErrorLog {
  timestamp: string;        // ISO 8601形式
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  message: string;          // エラーメッセージ
  error?: Error;           // エラーオブジェクト
  context?: {              // コンテキスト情報
    userId?: string;
    sessionId?: string;
    component?: string;
    action?: string;
  };
  stack?: string;          // スタックトレース
}
```

### ログ出力例
```typescript
// エラーログ出力の例
console.error('API呼び出しエラー:', {
  timestamp: new Date().toISOString(),
  level: 'ERROR',
  message: 'Failed to fetch game data',
  error: error,
  context: {
    userId: 'user_123',
    sessionId: 'session_456',
    component: 'GameDataService',
    action: 'fetchGameData'
  },
  stack: error.stack
});
```

## ユーザー通知仕様

### エラーページ
- 重大なエラーでアプリケーションが継続できない場合
- ページ全体をエラー表示に置き換える
- ユーザーが手動でリロードまたは再試行できるようにする

### エラーダイアログ
- 一時的なエラーでアプリケーションが継続できる場合
- モーダルダイアログでエラーを表示
- ユーザーが確認後に操作を継続できるようにする

### エラーメッセージの要件
- **分かりやすい日本語で記述**
- **エラーの原因を簡潔に説明**
- **ユーザーが取るべき行動を明示**
- **技術的な詳細は含めない**

### エラーメッセージ例
```
❌ エラーが発生しました
アプリケーションでエラーが発生しました。
ページを再読み込みしてお試しください。

[再読み込み] [メニューに戻る]
```

## 実装時の注意事項

### 1. エラーハンドリングの統一
- 全てのエラーハンドリングでこの方針に従う
- 独自のエラー処理ロジックを追加しない
- 例外処理の一貫性を保つ

### 2. ログ出力の徹底
- 全てのエラーでログを出力する
- ログレベルを適切に選択する
- コンテキスト情報を含める

### 3. ユーザー通知の適切な選択
- エラーの重大度に応じてページ/ダイアログを選択
- ユーザーが次に取るべき行動を明確にする
- エラーメッセージは分かりやすく簡潔に

### 4. 処理終了の徹底
- エラー発生時は即座に処理を終了する
- リトライ機能を実装しない
- フォールバック機能を実装しない
- エラー回避機能を実装しない

## テスト要件

### 単体テスト
- エラー発生時のログ出力をテスト
- エラー発生時の処理終了をテスト
- ユーザー通知の表示をテスト

### 統合テスト
- 実際のエラーシナリオでの動作確認
- エラーページ/ダイアログの表示確認
- ログ出力の確認

この方針に従ってエラーハンドリングを実装することで、アプリケーションの安定性とユーザーエクスペリエンスを向上させます。
