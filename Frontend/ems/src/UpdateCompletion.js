import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


function UpdateCompletion({empid,taskid,refresh}) {

    const SERVER_URL = 'http://127.0.0.1:5000'

  const [show, setShow] = useState(false);
  const [percent, setPercent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleUpdate = async () => {
        console.log(percent);
        fetch(`${SERVER_URL}/updateCompletion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({empid: parseInt(empid,10),taskid: parseInt(taskid,10), completion: parseFloat(percent)}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            refresh();
            handleClose();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Completion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Completion Percentage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Completion Percentage
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />
      </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateCompletion;