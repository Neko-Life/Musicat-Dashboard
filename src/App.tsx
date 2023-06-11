import React from 'react';
import Landing from '@/views/Landing';
import commonStyles from '@/assets/common.module.css';
import '@/App.css';

function App() {
  return (
    <div className={`${commonStyles.App} App theme-dark`}>
      <Landing />
    </div>
  );
}

export default App;
