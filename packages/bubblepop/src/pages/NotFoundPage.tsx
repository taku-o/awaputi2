import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from '@bubblepop/ui-library';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>404 - ページが見つかりません</h1>
        <Button
          variant="primary"
          onClick={() => navigate('/')}
        >
          ホームに戻る
        </Button>
      </Card>
    </Container>
  );
};