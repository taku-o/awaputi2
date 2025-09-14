import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';
import { HelpDetailPageParams } from '../types';

export const HelpDetailPage: React.FC = () => {
  const { category, topic } = useParams() as unknown as HelpDetailPageParams;

  // パラメータ検証：カテゴリとトピックが存在することを確認
  // 有効なカテゴリの例（実際のヘルプコンテンツに応じて調整）
  const validCategories = ['gameplay', 'controls', 'items', 'settings', 'account', 'advanced', 'game guide'];
  const isValidCategory = category && (validCategories.includes(category) || /^[a-zA-Z0-9\s_-]+$/.test(category));
  const isValidTopic = topic && topic.length > 0 && /^[a-zA-Z0-9\s_-]+$/.test(topic);

  if (!isValidCategory || !isValidTopic) {
    // 無効なパラメータの場合は404ページにリダイレクト
    return <Navigate to="/404" replace />;
  }

  return (
    <Container maxWidth="lg">
      <h1>ヘルプ詳細 - {category} / {topic}</h1>
      <Navigation />
    </Container>
  );
};