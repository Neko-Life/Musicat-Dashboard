import React from 'react';
import { useSelector } from 'react-redux';
import Console from './Console';

export default function Footer() {
  const { showConsole } = useSelector((state) => state);

  return (
    <div>
      {showConsole && <Console />}
      <div className="main-footer"></div>
    </div>
  );
}
