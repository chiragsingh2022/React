import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MessageDialog(props) {
  return (
    <Modal
      {...props}
      size="md" backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          {props.message}
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageDialog;