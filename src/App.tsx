import React from 'react';
import Landing from '@/views/Landing';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from '@/styles/theme';
import commonStyles from '@/assets/common.module.css';
import '@/assets/fonts.css';
import '@/App.css';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className={`${commonStyles.App} App theme-dark`}>
        <Landing />
      </div>
    </ThemeProvider>
  );
}

export default App;
