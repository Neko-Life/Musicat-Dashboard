import React from 'react';
import modalStyles from '../assets/Modal.module.css';
import commonStyles from '../assets/common.module.css';

export default function Modal({ children, fullHeight, show, setShow }) {
  return (
    <div
      onClick={(e) => {
        if (e.target.className.includes(modalStyles.modalBackgroundContainer)) {
          setShow(false);
        }
      }}
      className={`${modalStyles.modalBackgroundContainer} ${
        fullHeight ? modalStyles.fullHeight : ''
      } ${show ? '' : modalStyles.hidden}`}
    >
      <div
        className={`${commonStyles.shadowLight} ${modalStyles.modalContainer}`}
      >
        {children}
      </div>
    </div>
  );
}
