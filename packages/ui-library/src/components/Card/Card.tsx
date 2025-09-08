import React from 'react';
import { Card as MuiCard, CardContent, styled } from '@mui/material';
import { CardProps } from './Card.types';

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'hoverable',
})<{ hoverable?: boolean }>(({ theme, hoverable }) => ({
  cursor: hoverable ? 'pointer' : 'default',
  backgroundColor: '#2A2A3E',
  borderRadius: '12px',
  transition: theme.transitions.create(['box-shadow', 'background-color', 'border'], {
    duration: theme.transitions.duration.short,
  }),
  ...(hoverable && {
    '&:hover': {
      backgroundColor: '#3D3D55',
      boxShadow: theme.shadows[8],
    },
  }),
  '&.MuiCard-outlined': {
    border: '1px solid #3D3D55',
    ...(hoverable && {
      '&:hover': {
        border: '1px solid #4CAF50',
      },
    }),
  },
}));

const StyledCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== 'padding',
})<{ padding?: 'none' | 'small' | 'medium' | 'large' }>(({ padding = 'medium' }) => {
  const getPadding = (): string => {
    switch (padding) {
      case 'none':
        return '0';
      case 'small':
        return '16px';
      case 'large':
        return '32px';
      default: // medium
        return '24px';
    }
  };

  return {
    padding: getPadding(),
    '&:last-child': {
      paddingBottom: getPadding(),
    },
  };
});

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 1,
  hoverable = false,
  onClick,
  padding = 'medium',
  variant = 'default',
  ...props
}) => {
  return (
    <StyledCard
      {...props}
      elevation={variant === 'outlined' ? 0 : elevation}
      variant={variant === 'outlined' ? 'outlined' : 'elevation'}
      hoverable={hoverable}
      onClick={onClick}
    >
      <StyledCardContent padding={padding}>
        {children}
      </StyledCardContent>
    </StyledCard>
  );
};