import React from 'react';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const HelpPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>ヘルプ</h1>
      <Navigation />
    </Container>
  );
};