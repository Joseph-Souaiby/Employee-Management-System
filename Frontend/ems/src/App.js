import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeTable from './EmployeesTable.tsx';

const SERVER_URL = 'http://127.0.0.1:5000'

function App() {

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


    </div>
  );
}

export default App;
