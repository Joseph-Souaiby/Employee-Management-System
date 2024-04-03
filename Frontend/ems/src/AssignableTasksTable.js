import { useEffect , useState} from 'react';
import Form from 'react-bootstrap/Form';

const SERVER_URL = 'http://127.0.0.1:5000'


function AssignableTasksTable({emp_id,setTask_id,refresh}) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`${SERVER_URL}/getAssignableTasks?emp_id=${emp_id}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTasks(data);
          } else {
            console.error('Failed to fetch tasks:', response.status);
          }
        };
    
        fetchData().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [refresh]);
    
      const handleSelectChange = (event) => {
        setTask_id(event.target.value); // Update task_id in the parent component
    };

  return (
    <Form.Select aria-label="Default select example" onChange={handleSelectChange}>
        {tasks.map((task) => (
            <option key={task.id} value={task.id}>
            ID: {task.id} | Task Name: {task.name} | Description: {task.description}
        </option>

        ))}

    </Form.Select>
  );
}

export default AssignableTasksTable;