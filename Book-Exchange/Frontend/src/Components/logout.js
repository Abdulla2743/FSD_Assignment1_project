import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove JWT token
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
