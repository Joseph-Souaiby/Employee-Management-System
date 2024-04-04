import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function EmployeeLogin() {

    const [employeeID, setEmployeeID] = useState('');
    const navigate = useNavigate(); 

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Employee ID
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
            value={employeeID}
          onChange={(e) => {setEmployeeID(e.target.value)}}
        />
      </InputGroup>
      <Button variant="secondary" onClick={() => navigate('/employeePage',{state: {emp_id : employeeID}})}>Login</Button>
    </>
  );
}

export default EmployeeLogin;