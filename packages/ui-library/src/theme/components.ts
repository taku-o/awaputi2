import { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
        borderRadius: '50px',
        padding: '16px 32px',
        fontSize: '28px',
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          backgroundColor: '#45a049',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)'
        }
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#2A2A3E',
        color: '#FFFFFF',
        padding: '24px',
        border: '1px solid #3D3D55',
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: '#3D3D55',
          borderColor: '#4CAF50'
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: '#FFFFFF'
      }
    }
  }
};