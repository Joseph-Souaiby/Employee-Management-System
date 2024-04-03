import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function AddEmployee({employeesProp, setEmployeesProp}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleAdd = () => {
    setShow(false);
    // I want to chnage the state of the parent component here
    



}

  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        Add Employee
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Name
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddEmployee;