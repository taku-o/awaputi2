import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const GamePage: React.FC = () => {
  const { stageId } = useParams<{ stageId: string }>();

  return (
    <Container maxWidth="lg">
      <h1>ゲームプレイ画面 - ステージ: {stageId}</h1>
      <Navigation />
    </Container>
  );
};