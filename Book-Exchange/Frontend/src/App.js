import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import User from './Components/User';
import { AppProvider } from './Components/AppContext';

function App() {
    return (
        <AppProvider>
            <Router>
                <div>
                    <ConditionalNavbar />
                    <Routes>
                        <Route path="/add-book" element={<AddBook />} />
                        <Route path="/book/:id" element={<BookDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat-two" element={<ChatTwo />} />
                        <Route path="/search" element={<AdvanceSearch />} />
                        <Route path="/user" element={<User />} />
                    </Routes>
                </div>
            </Router>
        </AppProvider>
    );
}

function ConditionalNavbar() {
    const location = useLocation();

    const hideNavbarRoutes = ['/login', '/register'];

    if (hideNavbarRoutes.includes(location.pathname)) {
        return null;
    }

    return <Navbar />; 
}

export default App;
