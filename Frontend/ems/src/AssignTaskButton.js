import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AssignableTasksTable from './AssignableTasksTable';

const SERVER_URL = 'http://127.0.0.1:5000'


function AssignTaskButton({emp_id}) {
  const [show, setShow] = useState(false);
  const [task_id, setTask_id] = useState('');
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(prevState => !prevState);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAssign = () => {
    // Assign task to employee with a post request to assignTask

    fetch(`${SERVER_URL}/assignTask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            empid: parseInt(emp_id,10),
            taskid: parseInt(task_id,10),
            percent_completion: 0.0
        })
        }).then((response) => {
        if (response.ok) {
            triggerRefresh();
            handleClose();

        } else {
            console.error('Failed to assign task:', response);
        }
        }).catch(console.error);
    }


  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Assign Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assignable Taks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AssignableTasksTable emp_id = {emp_id} setTask_id = {setTask_id} refresh={refresh}></AssignableTasksTable>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAssign}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssignTaskButton;