import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from '@bubblepop/ui-library';

export const ResultPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>プレイ結果</h1>
        <Button
          variant="primary"
          onClick={() => navigate('/main')}
        >
          メニューに戻る
        </Button>
      </Card>
    </Container>
  );
};