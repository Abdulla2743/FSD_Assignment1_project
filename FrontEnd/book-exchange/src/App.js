// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import GetBook from './Components/GetBook';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/add-book" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/get-books" element={<GetBook />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
