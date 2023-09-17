import { createTheme } from '@mui/material';

export const defaultTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'texgyreadventorbold',
        },
      },
    },
  },
});
