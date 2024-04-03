import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import AssignTaskButton from './AssignTaskButton';
const SERVER_URL = 'http://127.0.0.1:5000'


function EmployeeTable({employeesProp,setEmployeesProp,triggerEmployeeValue}) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/getEmployees`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEmployeesProp(data);
      } else {
        console.error('Failed to fetch employees:', response.status);
      }
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerEmployeeValue]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Job Title</th>
          <th>Salary</th>
          <th>Strengths</th>
          <th>Weaknesses</th>
          <th>Productivity Score</th>
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>
        {employeesProp.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.age}</td>
            <td>{employee.job_title}</td>
            <td>{employee.salary}</td>
            <td>{employee.strengths}</td>
            <td>{employee.weaknesses}</td>
            <td>{employee.productivity_score}</td>
            <td><AssignTaskButton emp_id={employee.id} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
