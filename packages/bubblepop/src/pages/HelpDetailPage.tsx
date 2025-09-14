import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const HelpDetailPage: React.FC = () => {
  const { category, topic } = useParams<{ category: string; topic: string }>();

  return (
    <Container maxWidth="lg">
      <h1>ヘルプ詳細 - {category} / {topic}</h1>
      <Navigation />
    </Container>
  );
};