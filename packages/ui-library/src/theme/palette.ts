import { PaletteOptions } from '@mui/material/styles';

export const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#4CAF50',        
    light: '#81C784',       
    dark: '#388E3C',        
    contrastText: '#FFFFFF' 
  },
  secondary: {
    main: '#FFD700',        
    light: '#FFF176',       
    dark: '#F57F17',        
    contrastText: '#000000' 
  },
  text: {
    primary: '#FFFFFF',     
    secondary: '#B0B0C0',   
    disabled: '#808080'     
  },
  background: {
    default: '#0F0F1E',     
    paper: '#2A2A3E'        
  },
  error: {
    main: '#FF6B6B'         
  },
  warning: {
    main: '#FF9800'         
  },
  info: {
    main: '#4A90E2'         
  },
  success: {
    main: '#4CAF50'         
  }
};