# BubblePop ページフロー図

## 概要
このドキュメントでは、BubblePopゲームの画面遷移フローをMermaidフローチャートで表現しています。各画面間の遷移関係と、画面内で利用可能な操作を視覚的に示しています。

## メイン画面遷移フロー

### タイトル画面からゲームトップへの遷移
```mermaid
flowchart TD
    TITLE(["タイトル画面"])
    TOP(["ゲームトップ"])
    GAME(["ゲームプレイ"])
    SETTING(["設定画面"])
    HELP(["ヘルプ"])
    ACCOUNT(["アカウント情報"])
    SHOP(["ショップ"])
    TITLE ==> TOP
    TOP ==> GAME
    TOP ==> SETTING
    TOP ==> HELP
    TOP ==> ACCOUNT
    TOP ==> SHOP

    subgraph タイトル画面
        A(["ゲームスタート"])
    end

    subgraph ゲームトップ
        B1(["ステージ選択"])
        B2(["設定"])
        B3(["ヘルプ"])
        B4(["アカウント情報"])
        B5(["ショップ"])
    end
```

## ゲームプレイフロー

### ゲームプレイから結果画面への遷移
```mermaid
flowchart TD
    TOP(["ゲームトップ"])
    GAME(["ゲームプレイ"])
    GAME_RESULT(["プレイ結果"])
    TOP ==> GAME
    GAME ==> GAME_RESULT
    GAME_RESULT ==> TOP

    subgraph ゲームプレイ
        A(["ギブアップ"])
    end

    subgraph プレイ結果
        B1(["もう一度"])
        B2(["メニューに戻る"])
    end
```

## 設定画面フロー

### 設定画面の遷移
```mermaid
flowchart TD
    TOP(["ゲームトップ"])
    SETTING(["設定画面"])
    TOP ==> SETTING
    SETTING ==> TOP

    subgraph 設定画面
        A1(["設定保存"])
        A2(["メニューに戻る"])
    end
```

## ヘルプ画面フロー

### ヘルプ画面の遷移
```mermaid
flowchart TD
    TOP(["ゲームトップ"])
    HELP(["ヘルプ"])
    TOP ==> HELP
    HELP ==> TOP

    subgraph ヘルプ画面
        A(["メニューに戻る"])
    end
```

## アカウント情報画面フロー

### アカウント情報画面の遷移
```mermaid
flowchart TD
    TOP(["ゲームトップ"])
    ACCOUNT(["アカウント情報"])
    TOP ==> ACCOUNT
    ACCOUNT ==> TOP

    subgraph アカウント情報
        A(["メニューに戻る"])
    end
```

## ショップ画面フロー

### ショップからアイテム詳細、購入結果への遷移
```mermaid
flowchart TD
    TOP(["ゲームトップ"])
    SHOP(["ショップ"])
    ITEM_DETAIL(["アイテム詳細"])
    BUY_RESULT(["購入結果"])
    TOP ==> SHOP
    SHOP ==> TOP
    SHOP ==> ITEM_DETAIL
    ITEM_DETAIL ==> BUY_RESULT
    BUY_RESULT ==> SHOP

    subgraph ショップ
        A(["アイテム詳細"])
    end

    subgraph アイテム詳細
        B(["購入結果"])
    end
```

## フロー図の説明

### 画面遷移の特徴
- **放射状構造**: ゲームトップを中心とした画面遷移
- **一貫した戻り方**: 各画面からゲームトップへの統一された戻り
- **シンプルな流れ**: 複雑な画面遷移を避けた直感的な設計

### 操作要素の説明
- **ボタン・リンク**: `([])`で囲まれた画面遷移用の要素
- **subgraph**: 各画面内で利用可能な操作をグループ化
- **矢印**: 画面間の遷移関係を示す

### 主要な遷移パターン
1. **タイトル → ゲームトップ**: ゲーム開始
2. **ゲームトップ → 各機能画面**: メニュー選択
3. **各機能画面 → ゲームトップ**: メニューに戻る
4. **ゲームプレイ → 結果 → ゲームトップ**: ゲームループ
5. **ショップ → 詳細 → 結果**: 購入フロー

## 技術実装への活用

### React Router での実装
- 各画面をRouteとして定義
- フローチャートに基づく画面遷移の実装
- ブラウザの戻るボタンとの連携

### 状態管理
- 画面遷移時の状態保持
- 画面間でのデータ受け渡し
- ユーザーの操作履歴管理

