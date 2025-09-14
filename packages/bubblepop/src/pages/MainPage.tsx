import React from 'react';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const MainPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>メイン画面</h1>
      <Navigation />
    </Container>
  );
};