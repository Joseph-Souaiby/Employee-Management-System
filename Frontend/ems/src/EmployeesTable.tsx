import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
const SERVER_URL = 'http://127.0.0.1:5000'


function EmployeeTable({employeesProp,setEmployeesProp}) {
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
  }, []);

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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
