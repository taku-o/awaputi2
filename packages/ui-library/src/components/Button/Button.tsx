import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ButtonProps } from './Button.types';

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
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 16px',
          borderRadius: '8px',
        };
      case 'large':
        return {
          padding: '16px 32px',
          borderRadius: '16px',
        };
      default: // medium
        return {
          padding: '12px 24px',
          borderRadius: '12px',
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        };
      case 'icon':
        return {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        };
      default: // primary
        return {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const buttonStyles = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    lineHeight: theme.typography.button.lineHeight,
    textTransform: theme.typography.button.textTransform,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: startIcon || endIcon ? '8px' : 0,
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    width: fullWidth ? '100%' : 'auto',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    ...sizeStyles,
    ...variantStyles,
    '&:hover': disabled ? {} : {
      ...variantStyles['&:hover'],
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <button
      {...props}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      style={buttonStyles as React.CSSProperties}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};
