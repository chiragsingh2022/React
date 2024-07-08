import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MessageDialog(props) {
  return (
    <Modal
      {...props}
      size="md" 
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <Modal.Header style={{ backgroundColor: "#007BFF", color: "white", height: "3rem" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        
          {props.message}
       
      </Modal.Body>
      <Modal.Footer style={{ padding: 0 }}>
        <Button style={{width: '10vh',backgroundColor: "#007BFF" }} onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageDialog;