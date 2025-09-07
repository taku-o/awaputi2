import React, { useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 1,
  hoverable = false,
  onClick,
  padding = 'medium',
  variant = 'default',
  ...props
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    onClick?.(event);
  };

  const handleMouseEnter = useCallback((): void => {
    if (hoverable) {
      setIsHovered(true);
    }
  }, [hoverable]);

  const handleMouseLeave = useCallback((): void => {
    if (hoverable) {
      setIsHovered(false);
    }
  }, [hoverable]);

  const getPaddingStyles = (): { padding: string } => {
    switch (padding) {
      case 'none':
        return { padding: '0' };
      case 'small':
        return { padding: '16px' };
      case 'large':
        return { padding: '32px' };
      default: // medium
        return { padding: '24px' };
    }
  };

  const getElevationStyles = (): { boxShadow: string } => {
    const shadows = [
      'none',
      '0px 1px 3px rgba(0, 0, 0, 0.2)',
      '0px 2px 6px rgba(0, 0, 0, 0.25)',
      '0px 4px 12px rgba(0, 0, 0, 0.3)',
      '0px 8px 24px rgba(0, 0, 0, 0.35)',
    ];
    return { boxShadow: shadows[elevation] || shadows[1] };
  };

  const getVariantStyles = (): { backgroundColor: string; color: string; border: string } => {
    const baseColor = isHovered && hoverable ? '#3D3D55' : '#2A2A3E';
    const baseBorder = 
      variant === 'outlined' 
        ? (isHovered && hoverable ? '1px solid #4CAF50' : '1px solid #3D3D55')
        : 'none';

    return {
      backgroundColor: baseColor,
      color: theme.palette.text.primary,
      border: baseBorder,
    };
  };

  const paddingStyles = getPaddingStyles();
  const elevationStyles = getElevationStyles();
  const variantStyles = getVariantStyles();

  const cardStyles = {
    borderRadius: '12px',
    transition: 'all 0.2s ease-in-out',
    display: 'block',
    width: '100%',
    cursor: (hoverable && onClick) ? 'pointer' : 'default',
    ...paddingStyles,
    ...elevationStyles,
    ...variantStyles,
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyles as React.CSSProperties}
    >
      {children}
    </div>
  );
};