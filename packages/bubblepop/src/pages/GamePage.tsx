import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';
import { GamePageParams } from '../types';

export const GamePage: React.FC = () => {
  const { stageId } = useParams() as unknown as GamePageParams;

  // パラメータ検証：ステージIDが1-10の数値であることを確認
  if (!stageId) {
    // パラメータが存在しない場合は404ページにリダイレクト
    return <Navigate to="/404" replace />;
  }

  const stageIdNum = parseInt(stageId, 10);
  const isValidStageId = !isNaN(stageIdNum) && stageIdNum >= 1 && stageIdNum <= 10;

  if (!isValidStageId) {
    // 無効なステージIDの場合は404ページにリダイレクト
    return <Navigate to="/404" replace />;
  }

  return (
    <Container maxWidth="lg">
      <h1>ゲームプレイ画面 - ステージ: {stageId}</h1>
      <Navigation />
    </Container>
  );
};