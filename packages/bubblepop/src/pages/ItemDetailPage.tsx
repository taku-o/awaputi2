import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();

  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>アイテム詳細 - {itemId}</h1>
        <Navigation />
      </Card>
    </Container>
  );
};