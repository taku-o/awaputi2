import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4;
  hoverable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  padding?: 'none' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined';
}