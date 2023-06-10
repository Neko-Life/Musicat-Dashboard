import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import modalStyles from '@/assets/Modal.module.css';
import commonStyles from '@/assets/common.module.css';
import { ILayoutProps } from '@/interfaces/layouts';

interface IModalProps extends ILayoutProps {
  fullHeight?: boolean;
  show?: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({
  children,
  fullHeight,
  show,
  setShow,
}: IModalProps) {
  return (
    <div
      onClick={(e) => {
        if (
          (e.target as HTMLDivElement).className.includes(
            modalStyles.modalBackgroundContainer
          )
        ) {
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
