import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees'); // Adjust the URL as needed
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setEmployees(data); // Assuming the response body is the array of employees
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]); // Update locally for now
  };

  return (
    <div className="App">
      <div className="App-header">
        <hr />
        <h1>Employee Management System</h1>
        <hr />   
      </div>
      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
}

export default App;
