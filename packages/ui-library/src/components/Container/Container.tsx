import React from 'react';
import { Container as MuiContainer, styled } from '@mui/material';
import { ContainerProps } from './Container.types';

const StyledContainer = styled(MuiContainer, {
  shouldForwardProp: (prop) => prop !== 'center' && prop !== 'padding' && prop !== 'responsive',
})<{ center?: boolean; padding?: 'none' | 'small' | 'medium' | 'large'; responsive?: boolean }>(
  ({ theme, center, padding = 'medium', responsive }) => {
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

    const basePadding = getPadding();

    return {
      ...(center === false && {
        marginLeft: 0,
        marginRight: 0,
      }),
      padding: basePadding,
      ...(responsive && {
        [theme.breakpoints.only('xs')]: {
          padding: '16px',
        },
        [theme.breakpoints.only('sm')]: {
          padding: '24px',
        },
        [theme.breakpoints.only('md')]: {
          padding: '32px',
        },
        [theme.breakpoints.up('lg')]: {
          padding: '48px',
        },
      }),
    };
  }
);

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  center = false,
  padding = 'medium',
  responsive = false,
  ...props
}) => {
  return (
    <StyledContainer
      {...props}
      maxWidth={maxWidth}
      center={center}
      padding={padding}
      responsive={responsive}
    >
      {children}
    </StyledContainer>
  );
};