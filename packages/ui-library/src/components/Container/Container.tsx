import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { ContainerProps } from './Container.types';

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  center = false,
  padding = 'medium',
  responsive = false,
  ...props
}) => {
  const theme = useTheme();
  
  // レスポンシブブレークポイントのチェック
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const getMaxWidthStyles = (): { maxWidth: string | undefined } => {
    if (maxWidth === false) {
      return { maxWidth: undefined };
    }

    const widthMap = {
      xs: '444px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    };

    return { maxWidth: widthMap[maxWidth] };
  };

  const getPaddingStyles = (): { padding: string } => {
    if (responsive) {
      // レスポンシブパディング
      if (isXs) return { padding: '16px' };
      if (isSm) return { padding: '24px' };
      if (isMd) return { padding: '32px' };
      if (isLg) return { padding: '48px' };
    }

    // 基本パディング
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

  const getCenterStyles = (): { margin: string } => {
    return center ? { margin: '0 auto' } : { margin: '0' };
  };

  const maxWidthStyles = getMaxWidthStyles();
  const paddingStyles = getPaddingStyles();
  const centerStyles = getCenterStyles();

  const containerStyles = {
    width: '100%',
    boxSizing: 'border-box' as const,
    ...maxWidthStyles,
    ...paddingStyles,
    ...centerStyles,
  };

  return (
    <div
      {...props}
      style={containerStyles as React.CSSProperties}
    >
      {children}
    </div>
  );
};