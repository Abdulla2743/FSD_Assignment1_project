// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
<<<<<<< HEAD
import HomePage from './Components/HomePage';
import Admin from './Components/Admin';
=======
import GetBook from './Components/GetBook';
>>>>>>> 1778b0deb62f310135b8eeb452216eab5fe4a756

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/add-book" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
<<<<<<< HEAD
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/admin" element={<Admin />} />

=======
                    <Route path="/get-books" element={<GetBook />} />
>>>>>>> 1778b0deb62f310135b8eeb452216eab5fe4a756
                </Routes>
            </div>
        </Router>
    );
}

export default App;
