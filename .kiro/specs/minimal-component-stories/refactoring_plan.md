Task 1: 既存ストーリーファイルの確認と分析結果

  Button.stories.tsx

  現状:
  - 基本的な5つのストーリー（Primary、Secondary、Icon、Disabled、FullWidth）が実装済み
  - argTypesは定義されているが、説明文（description）が不足している

  改善が必要な箇所:
  1. argTypesに説明文を追加
  2. 各ストーリーにパラメータでdescriptionを追加

  Card.stories.tsx

  現状:
  - 12個のストーリーが実装済み（設計書で指定された最小限の4つより多い）
  - argTypesには既に説明文が設定済み

  改善が必要な箇所:
  1. ストーリーを最小限の4つに絞り込む（Default、Hoverable、Outlined、NoPadding）
  2. 不要な8つのストーリーを削除

  Container.stories.tsx

  現状:
  - 14個のストーリーが実装済み（設計書で指定された最小限の4つより多い）
  - argTypesには説明文が設定済み

  改善が必要な箇所:
  1. ストーリーを最小限の4つに絞り込む（Default、Centered、FullWidth、ResponsivePadding）
  2. 不要な10個のストーリーを削除
