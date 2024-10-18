import React, { useState } from 'react';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      title,
      author,
      publishedYear
    };

    fetch('/add-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <br />
      <label>
        Author:
        <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
      </label>
      <br />
      <label>
        Published Year:
        <input type="number" value={publishedYear} onChange={(event) => setPublishedYear(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;