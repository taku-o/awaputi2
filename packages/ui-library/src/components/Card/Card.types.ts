import { CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  hoverable?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined';
}