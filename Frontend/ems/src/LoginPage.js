import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function LoginPage() {
    let navigate = useNavigate();

    const handleLoginManager = () => {
        navigate('/app'); // Navigates to the main app
    };

    const handleLoginEmployee = () => {
        navigate('/employeeLogin'); // Navigates to the main app
    }

    return (
        <div>
            <h1>Login Page</h1>
            <Button variant="primary" onClick={handleLoginManager}>Login As Manager</Button>
            <Button variant="primary" onClick={handleLoginEmployee}>Login As Employee</Button>
        </div>
    );
}

export default LoginPage;
