import React from 'react';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const ShopPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>ショップ</h1>
      <Navigation />
    </Container>
  );
};