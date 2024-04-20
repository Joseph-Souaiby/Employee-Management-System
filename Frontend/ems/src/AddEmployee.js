import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SERVER_URL = 'http://127.0.0.1:5000'



function AddEmployee({refreshEmployeesTable}) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [salary, setSalary] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [productivityScore, setProductivityScore] = useState('');
  const [email, setEmail] = useState('');

  const handleClose = () => setShow(false);
  const handleAdd = async () => {
    // Validate the input
    if (!id || !name || !age || !job || !salary || !strengths || !weaknesses || !productivityScore || !email) {
      alert('Please fill in all fields!');
      return;
    }
    // check if id is a number
    if (isNaN(id)) {
      alert('ID must be a number!');
      return;
    }
    // check if age is a number
    if (isNaN(age)) {
      alert('Age must be a number!');
      return;
    }
    // check if salary is a number
    if (isNaN(salary)) {
      alert('Salary must be a number!');
      return;
    }
    // check if productivity score is a number between 0 and 10
    if (isNaN(productivityScore) || productivityScore < 0 || productivityScore > 10) {
      alert('Productivity score must be a number between 0 and 10!');
      return;
    }
    // check if email is valid
    if (!email.includes('@')) {
      alert('Email must be valid!');
      return;
    }

    const newEmployee = {
      id: parseInt(id, 10),  // Assuming ID is a number
      name,
      email,
      age: parseInt(age, 10), // Assuming age is a number
      job,
      salary: parseFloat(salary), // Assuming salary is a decimal number
      strengths,
      weaknesses,
      productivity_score: parseInt(productivityScore, 10) // Assuming productivity score is a number
    };
    
    // Update the parent component's state
    const response = await fetch(`${SERVER_URL}/addEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    });
    if (!response.ok) {
      console.error('Failed to add employee:', response.status);
    }
    // Clear the form
    setId('');
    setName('');
    setAge('');
    setJob('');
    setSalary('');
    setStrengths('');
    setWeaknesses('');
    setProductivityScore('');
    setEmail('');

    // Refresh the employees table
    refreshEmployeesTable();


    // Close the modal
    setShow(false);




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
              <InputGroup.Text>ID</InputGroup.Text>
              <Form.Control
                value={id}
                onChange={e => setId(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Email</InputGroup.Text>
              <Form.Control
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Age</InputGroup.Text>
              <Form.Control
                value={age}
                onChange={e => setAge(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Job Title</InputGroup.Text>
              <Form.Control
                value={job}
                onChange={e => setJob(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Salary</InputGroup.Text>
              <Form.Control
                value={salary}
                onChange={e => setSalary(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Strengths</InputGroup.Text>
              <Form.Control
                value={strengths}
                onChange={e => setStrengths(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Weaknesses</InputGroup.Text>
              <Form.Control
                value={weaknesses}
                onChange={e => setWeaknesses(e.target.value)}
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Productivity Score</InputGroup.Text>
              <Form.Control
                value={productivityScore}
                onChange={e => setProductivityScore(e.target.value)}
                type="text"
              />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
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