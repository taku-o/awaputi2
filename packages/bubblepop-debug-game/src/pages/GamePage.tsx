import React from 'react';
import { Container } from '@bubblepop/ui-library';

export const GamePage: React.FC = () => {
  return (
    <Container>
      <h1>ゲームプレイ画面</h1>
      <div id="game-container">
        <p>ゲームコンテンツをここに表示</p>
      </div>
    </Container>
  );
};