import { ContainerProps as MuiContainerProps } from '@mui/material';

export interface ContainerProps extends MuiContainerProps {
  center?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  responsive?: boolean;
}