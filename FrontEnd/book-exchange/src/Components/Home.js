import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:5000/add-book', bookData);
        alert('Book added successfully!');
        setBookData({
            title: '',
            author: '',
            genre: '',
            condition: '',
            status: '',
        });
    } catch (error) {
        console.error(error);
        alert('Error adding book. Please try again.');
    } finally {
        setLoading(false);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={bookData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={bookData.author} onChange={handleChange} required />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" name="genre" value={bookData.genre} onChange={handleChange} required />
      </div>
      <div>
        <label>Condition:</label>
        <input type="text" name="condition" value={bookData.condition} onChange={handleChange} required />
      </div>
      <div>
        <label>Status:</label>
        <input type="text" name="status" value={bookData.status} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Book'}</button>
    </form>
  );
};

export default Home;
