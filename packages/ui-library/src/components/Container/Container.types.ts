import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  center?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  responsive?: boolean;
}