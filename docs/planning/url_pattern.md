# BubblePop URLパターン定義

## 概要
このドキュメントでは、BubblePopゲームの画面遷移で使用されるURLパターンを定義しています。各画面へのアクセス方法と、パラメータの使用方法を明確化し、一貫したURL設計を実現します。

## URLパターン一覧

### メイン画面
- **http://example.com/**
  - /top/
  - /game/{stage_id}/
  - /settings/
    - /settings/{category}/
  - /help/
    - /help/{category}/
      - /help/{category}/{topic}/
  - /account/
  - /shop/
    - /shop/{item_id}/
