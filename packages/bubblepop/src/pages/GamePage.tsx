import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';
import { GamePageParams } from '../types';

export const GamePage: React.FC = () => {
  const { stageId } = useParams() as unknown as GamePageParams;

  // パラメータ検証：ステージIDが存在することを確認
  // 数値（1-10）または文字列（boss-stage等）を許可
  if (!stageId) {
    // パラメータが存在しない場合は404ページにリダイレクト
    return <Navigate to="/404" replace />;
  }

  const stageIdNum = parseInt(stageId, 10);
  const isNumericStageId = !isNaN(stageIdNum);
  const isValidNumericStageId = isNumericStageId && stageIdNum >= 1 && stageIdNum <= 10;
  const isValidStringStageId = /^[a-zA-Z0-9_-]+$/.test(stageId) || /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF0-9]+$/.test(stageId);

  if (!isValidNumericStageId && !isValidStringStageId) {
    // 無効なパラメータの場合は404ページにリダイレクト
    return <Navigate to="/404" replace />;
  }

  return (
    <Container maxWidth="lg">
      <h1>ゲームプレイ画面 - ステージ: {stageId}</h1>
      <Navigation />
    </Container>
  );
};