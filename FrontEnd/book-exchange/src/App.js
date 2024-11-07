// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import HomePage from './Components/HomePage';
import Admin from './Components/Admin';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/add-book" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/admin" element={<Admin />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
