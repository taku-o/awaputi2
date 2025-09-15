import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from '@bubblepop/ui-library';

export const DebugGameTopPage: React.FC = () => {
  const navigate = useNavigate();
  const port = import.meta.env.VITE_DEBUG_PORT || 8001;

  const handleNavigateToGame = (): void => {
    navigate('/game');
  };

  return (
    <Container>
      <h1>ゲームプレイデバッグアプリ</h1>
      <p>ポート: {port}</p>
      <p>ゲームプレイ画面の動作確認を行います。</p>

      <Card>
        <h3>ゲームプレイ画面</h3>
        <p>ゲームロジックのテスト、パフォーマンス測定が可能です。</p>
        <Button onClick={handleNavigateToGame}>
          ゲームプレイ画面を開く
        </Button>
      </Card>
    </Container>
  );
};