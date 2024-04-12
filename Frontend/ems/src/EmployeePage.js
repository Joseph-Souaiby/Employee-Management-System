import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
import UpdateCompletion from './UpdateCompletion';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function EmployeePage() {

    const SERVER_URL = 'http://127.0.0.1:5000'

    const navigate = useNavigate();

    let location = useLocation();
    let emp_id = location.state?.emp_id; // Accessing the passed state

    const [tasks, setTasks] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const refreshTasks = () => {
        setRefresh(prevValue => !prevValue);
    }
// eslint-disable-next-line
    useEffect(() => { fetchTasks(); }, [refresh]);

    const fetchTasks = async () => {
        const response = await fetch(`${SERVER_URL}/getTasksForEmployee?emp_id=${emp_id}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTasks(data);
        } else {
            console.error('Failed to fetch tasks:', response.status);
        }
    }

  return (
    <div className='App'>
      <div className='App-header'>
        <hr />
        <h1>Employee ID {emp_id} Task Report</h1>
        <hr />
      </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Completion Percentage</th>
          <th>Add Percentage</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.percent_completion}</td>
            <td><UpdateCompletion empid= {emp_id} taskid = {task.id} refresh = {refreshTasks}/></td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Button variant="danger" onClick={() => navigate('/')} className = "mt-3">Logout</Button>
    </div>
  );
}

export default EmployeePage;