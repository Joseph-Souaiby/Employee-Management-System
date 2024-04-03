import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeTable from './EmployeesTable.js';
import AddEmployee from './AddEmployee.tsx';
import AddTask from "./AddTask.js";

// const SERVER_URL = 'http://127.0.0.1:5000'


function App() {
  const [employees, setEmployees] = useState([]);
  const [refreshEmployees, setRefreshEmployees] = useState(false);
  const triggerEmployeeRefresh = () => {
    setRefreshEmployees(prevState => !prevState);
  };



  


  return (
    <div className="App">
      <div className="App-header">
        <hr />
        <h1>Employee Management System</h1>
        <hr />   
      </div>
      <div className="employee-table">
        <EmployeeTable employeesProp = {employees} setEmployeesProp= {setEmployees} triggerEmployeeValue= {refreshEmployees}/>
      </div>
      <div className="add-employee">
        <AddEmployee refreshEmployeesTable = {triggerEmployeeRefresh}/>
      </div>
      <br></br>
      <div className="add-task">
        <AddTask />
      </div>


    </div>
  );
}

export default App;
