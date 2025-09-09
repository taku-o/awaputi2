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
  - 12個のストーリーが実装済み（充実したバリエーション）
  - argTypesには既に説明文が設定済み
  - 各elevation、padding、variantの組み合わせを網羅

  改善が必要な箇所:
  1. 既存の充実したストーリー構成を維持
  2. 説明文の統一化とドキュメント記述の改善

  Container.stories.tsx

  現状:
  - 14個のストーリーが実装済み（包括的なレスポンシブ対応）
  - argTypesには説明文が設定済み
  - 各maxWidth、paddingの組み合わせを網羅

  改善が必要な箇所:
  1. 既存の包括的なストーリー構成を維持
  2. レスポンシブ対応の説明強化とドキュメント記述の改善
