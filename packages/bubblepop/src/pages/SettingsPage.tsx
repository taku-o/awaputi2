import React from 'react';
import { Container } from '@bubblepop/ui-library';
import { Navigation } from '../components/Navigation';

export const SettingsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>設定</h1>
      <Navigation />
    </Container>
  );
};