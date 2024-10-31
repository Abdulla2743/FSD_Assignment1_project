import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-books');
            setBooks(response.data); 
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []); 

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <strong>Title:</strong> {book.title}, <strong>Author:</strong> {book.author}, 
                        <strong>Genre:</strong> {book.genre}, <strong>Condition:</strong> {book.condition},
                        <strong>Status:</strong> {book.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
