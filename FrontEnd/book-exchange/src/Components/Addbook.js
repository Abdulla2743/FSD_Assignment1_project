import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(1);


    const handleSubmit = async (e) => {
        e.preventDefault();
            setImage(e => e + 1);
            if(image === 18){
                setImage(1)
            }
        console.log(image);
        const bookData = {
            title,
            author,
            genre,
            condition,
            status,
            image
        };
   
        try {
            const response = await axios.post('http://localhost:5000/add-book', bookData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Book added:', response.data);
        } catch (error) {
            console.error('Failed to add book:', error);
        }
    };
   

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
            <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Condition" required />
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" required />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
