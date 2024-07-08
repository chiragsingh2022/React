import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function YesNoMessageDialog(props) {
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
        <Stack direction='horizontal' gap={3}>
          <Button style={{ width: '10vh', backgroundColor: "#007BFF" }} onClick={props.onYes}>Yes</Button>
          <Button style={{ width: '10vh', backgroundColor: "#007BFF" }} onClick={props.onNo}>No</Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

export default YesNoMessageDialog;