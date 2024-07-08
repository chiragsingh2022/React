import React, { useState, useCallback } from 'react';
import MessageDialog from '../Dialogs/MessageDialog';

function useMessageDialog() {
  const [modalProps, setModalProps] = useState(null);
 
  const showMessageDialog = useCallback((title, message) => {
    return new Promise((resolve) => {
      setModalProps({
        show: true,
        title,
        message,
        onHide: () => {
          setModalProps(null);
          resolve(false);
        },
      });
    });
  }, []);

  const DialogComponent = modalProps ? (
    <MessageDialog {...modalProps} />
  ) : null;

  return { showMessageDialog, DialogComponent };
}

export default useMessageDialog;
