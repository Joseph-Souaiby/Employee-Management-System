import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeTable from './EmployeesTable.tsx';
import AddEmployee from './AddEmployee.tsx';

const SERVER_URL = 'http://127.0.0.1:5000'

interface Employee {
  id: number;
  name: string;
  age: number;
  job_title: string;
  salary: number;
  strengths: string;
  weaknesses: string;
  productivity_score: number;
}

function App() {
  // const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    fectchEmployees();
  }, []);

  function fectchEmployees(){
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/getEmployees`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Failed to fetch employees:', response.status);
        return null;
      }
    };

    fetchData().catch(console.error);
  }


  return (
    <div className="App">
      <div className="App-header">
        <hr />
        <h1>Employee Management System</h1>
        <hr />   
      </div>
      <div className="employee-table">
        <EmployeeTable />
      </div>
      <div className="add-employee">
        <AddEmployee />
      </div>


    </div>
  );
}

export default App;
