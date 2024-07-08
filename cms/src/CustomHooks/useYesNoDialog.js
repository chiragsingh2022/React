import React, { useState, useCallback } from 'react';
import YesNoMessageDialog from '../Dialogs/YesNoMessageDialog';

function useYesNoDialog() {
  const [modalProps, setModalProps] = useState(null);
 console.log("yes no calling");
  const showYesNoDialog = useCallback((title, message) => {
    return new Promise((resolve) => {
      setModalProps({
        show: true,
        title,
        message,
        onYes: () => {
          setModalProps(null);
          resolve(true);
        },
        onNo: () => {
          setModalProps(null);
          resolve(false);
        },
        onHide: () => {
          setModalProps(null);
          resolve(false);
        },
      });
    });
  }, []);

  const YesNoDialogComponent = modalProps ? (
    <YesNoMessageDialog {...modalProps} />
  ) : null;

  return { showYesNoDialog, YesNoDialogComponent };
}

export default useYesNoDialog;
