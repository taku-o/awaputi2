import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';
import { ButtonProps } from './Button.types';

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  textTransform: 'none',
  borderRadius: theme.spacing(1.5),
  width: fullWidth ? '100%' : 'auto',
  '&.MuiButton-sizeSmall': {
    padding: '8px 16px',
    borderRadius: '8px',
  },
  '&.MuiButton-sizeMedium': {
    padding: '12px 24px',
    borderRadius: '12px',
  },
  '&.MuiButton-sizeLarge': {
    padding: '16px 32px',
    borderRadius: '16px',
  },
  '&.MuiButton-text': {
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {
  const getMuiVariant = (): 'contained' | 'outlined' | 'text' => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'outlined';
      case 'icon':
        return 'text';
      default:
        return 'contained';
    }
  };

  const getMuiColor = (): 'primary' | 'secondary' => {
    switch (variant) {
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <StyledButton
      {...props}
      variant={getMuiVariant()}
      color={getMuiColor()}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </StyledButton>
  );
};
