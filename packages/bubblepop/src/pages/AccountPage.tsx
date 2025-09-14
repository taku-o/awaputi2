import React from 'react';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const AccountPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>アカウント情報</h1>
      <Navigation />
    </Container>
  );
};