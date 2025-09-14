import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container, Card } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';
import { ItemDetailPageParams } from '../types';

export const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams() as unknown as ItemDetailPageParams;

  // パラメータ検証：アイテムIDが存在し、有効な形式であることを確認
  // アイテムIDは通常、英数字とハイフン、アンダースコアのみを含む
  const isValidItemId = itemId && /^[a-zA-Z0-9_-]+$/.test(itemId) && itemId.length <= 50;

  if (!isValidItemId) {
    // 無効なパラメータの場合は404ページにリダイレクト
    return <Navigate to="/404" replace />;
  }

  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>アイテム詳細 - {itemId}</h1>
        <Navigation />
      </Card>
    </Container>
  );
};