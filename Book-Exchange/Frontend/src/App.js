// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import BookDetails from './Components/BookDetails';
import AddBook from './Components/AddBook';
import Chat from './Components/chat';
import ChatTwo from './Components/chatTwo';
// import ProtectedRoute from './Components/protectRoute';
import Logout from './Components/logout';
import AdvanceSearch from './Components/advanceSearch';
import Navbar from './Components/navbar';

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={ <Home /> } />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/chat-two" element={<ChatTwo />} />
                    <Route path="/search" element={<AdvanceSearch />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
