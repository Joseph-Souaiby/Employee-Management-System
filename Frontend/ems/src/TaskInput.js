import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function TaskInput({id, setId, taskName, setTaskName, description, setDescription}){


  return (
    <>
        <InputGroup className="mb-3">
              <InputGroup.Text>ID</InputGroup.Text>
              <Form.Control
                value={id}
                onChange={e => setId(e.target.value)}
                type="text"
              />
        </InputGroup>
        <InputGroup className="mb-3">
              <InputGroup.Text>Task Name</InputGroup.Text>
              <Form.Control
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                type="text"
              />
        </InputGroup>
        <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="text"
              />
        </InputGroup>


    </>
  );
}

export default TaskInput;