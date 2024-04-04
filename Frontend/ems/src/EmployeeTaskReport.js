import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const SERVER_URL = 'http://127.0.0.1:5000'


function EmployeeTaskReport({empid,refresh}) {

  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => { fetchTasks(); }, [refresh]);

    const fetchTasks = async () => {
        const response = await fetch(`${SERVER_URL}/getTasksForEmployee?emp_id=${empid}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTasks(data);
        } else {
            console.error('Failed to fetch tasks:', response.status);
        }
    }

  return (


    <>
      <Button variant="primary" onClick={handleShow}>
        Task Report
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Task Name</th>
          <th>Task Description Name</th>
          <th>Completion Percentage</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.percent_completion}</td>
          </tr>
        ))}
        
      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmployeeTaskReport;