import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TasksTable from './TasksTable.js';
import TaskInput from './TaskInput.js';

const SERVER_URL = 'http://127.0.0.1:5000'

function AddTask() {
    const [show, setShow] = useState(false);

    const [id, setId] = useState('');
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = async () => {
        const newTaskk = {
            id: parseInt(id,10),
            name: taskName,
            description: description,
            completion_percentage: 0
        }
        const response = await fetch(`${SERVER_URL}/addTask`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTaskk)
          });
          if (response.ok) {
            triggerTaskRefresh();
            setId(''); 
            setTaskName('');
            setDescription('');
            // handleClose();
          }
          if (!response.ok) {
            console.error('Failed to add task:', response.status);
          }
        
    }

    const [tasks, setTasks] = useState([]);
    const [refreshTasks, setRefreshTasks] = useState(false);

    const triggerTaskRefresh = () => {
        setRefreshTasks(prevState => !prevState);
    }

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                Check And Add Task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TasksTable tasks={tasks} setTasks={setTasks} refreshTasks={refreshTasks}/>
                    <br/>
                    <TaskInput id={id} setId={setId} taskName={taskName} setTaskName={setTaskName} description={description} setDescription={setDescription}/>

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
        </>
    );
}

export default AddTask;
