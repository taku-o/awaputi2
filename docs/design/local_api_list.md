# BubblePop ローカルAPI一覧

## 概要
BubblePopアプリケーションで使用するAPIエンドポイントURLとHTTPメソッドの一覧です。実装時の指針として使用してください。

## API一覧

- GET /api/user 現在のユーザー情報を取得
- PUT /api/user ユーザー情報を更新
- POST /api/user 新規ユーザーを作成
- POST /api/game/session 新しいゲームセッションを開始
- GET /api/game/session/{sessionId} 指定されたセッションの情報を取得
- PUT /api/game/session/{sessionId} ゲームセッションの状態を更新
- POST /api/game/session/{sessionId}/end ゲームセッションを終了し、結果を保存
- GET /api/stages 利用可能なステージ一覧を取得
- GET /api/stages/{stageId} 指定されたステージの詳細情報を取得
- POST /api/stages/{stageId}/unlock ステージの解放状態を更新
- POST /api/scores ゲーム結果のスコアを保存
- GET /api/scores/highscore ユーザーのハイスコアを取得
- GET /api/scores/history スコア履歴を取得
- GET /api/achievements 実績一覧を取得
- GET /api/achievements/progress 実績の進行状況を取得
- PUT /api/achievements/progress 実績の進行状況を更新
- POST /api/achievements/check 実績達成条件をチェック
- GET /api/items ショップで購入可能なアイテム一覧を取得
- GET /api/items/{itemId} 指定されたアイテムの詳細情報を取得
- POST /api/items/{itemId}/purchase アイテムを購入
- GET /api/items/owned ユーザーが所持しているアイテム一覧を取得
- POST /api/items/reset 全アイテム効果をリセット
- GET /api/settings ユーザーの設定情報を取得
- PUT /api/settings 設定情報を保存
- POST /api/settings/reset 設定をデフォルト値にリセット
- GET /api/save セーブデータを読み込み
- POST /api/save セーブデータを保存
- DELETE /api/save セーブデータを削除
- GET /api/statistics プレイヤーの統計情報を取得
- PUT /api/statistics 統計情報を更新
- GET /api/notifications 通知一覧を取得
- POST /api/notifications 通知を送信
- PUT /api/notifications/{notificationId}/read 通知を既読にする
- GET /api/bubble-types 利用可能なバブルタイプ一覧を取得
- GET /api/bubble-types/{typeId} 指定されたバブルタイプの詳細情報を取得

## 認証方式

APIに対して認証は不要です。全てのAPIエンドポイントは認証なしでアクセス可能です。
