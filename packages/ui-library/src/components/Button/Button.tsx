import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (disabled) return;
    onClick?.(event);
  };

  const handleMouseEnter = (): void => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = (): void => {
    if (!disabled) {
      setIsHovered(false);
    }
  };

  const getSizeStyles = (): { padding: string; borderRadius: string } => {
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

  const getVariantStyles = (): { backgroundColor: string; color: string; minWidth?: string } => {
    const getHoverColor = (baseColor: string, hoverColor: string): string => {
      return isHovered ? hoverColor : baseColor;
    };

    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: getHoverColor(theme.palette.secondary.main, theme.palette.secondary.dark),
          color: theme.palette.secondary.contrastText,
        };
      case 'icon':
        return {
          backgroundColor: getHoverColor('transparent', 'rgba(255, 255, 255, 0.1)'),
          color: theme.palette.text.primary,
          minWidth: 'auto',
        };
      default: // primary
        return {
          backgroundColor: getHoverColor(theme.palette.primary.main, theme.palette.primary.dark),
          color: theme.palette.primary.contrastText,
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
    textTransform: theme.typography.button.textTransform as React.CSSProperties['textTransform'],
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: startIcon || endIcon ? '8px' : 0,
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    width: fullWidth ? '100%' : 'auto',
    boxShadow: isHovered && !disabled ? '0px 4px 8px rgba(0, 0, 0, 0.3)' : '0px 2px 4px rgba(0, 0, 0, 0.2)',
    ...sizeStyles,
    ...variantStyles,
  };

  return (
    <button
      {...props}
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      style={buttonStyles as React.CSSProperties}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};
