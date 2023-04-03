import React from 'react';
import '../assets/Modal.css';
import '../assets/common.css';

export default function Modal({ children, fullHeight, show, setShow }) {
  return (
    <div
      onClick={(e) => {
        if (e.target.className.includes('modal-background-container')) {
          setShow(false);
        }
      }}
      className={`modal-background-container ${
        fullHeight ? 'full-height' : ''
      } ${show ? '' : 'hidden'}`}
    >
      <div className="shadow-light modal-container">{children}</div>
    </div>
  );
}
