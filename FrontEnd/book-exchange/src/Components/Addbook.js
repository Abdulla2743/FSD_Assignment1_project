import React, { useState } from "react";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      title,
      author,
      genre,
      condition,
      status,
    };

    fetch("/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </label>
      <br />
      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
      </label>
      <br />
      <label for="condition">Condition:</label>
      <select
        id="condition"
        name="condition"
        required
        value={condition}
        onChange={(event) => setCondition(event.target.value)}
      >
        <option value="">--------</option>
        <option value="new">New</option>
        <option value="used">Used</option>
        <option value="damaged">Damaged</option>
      </select>
      <br />
      <label for="status">Availability Status:</label>
      <select
        id="status"
        name="status"
        required
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="">--------</option>
        <option value="available">Available</option>
        <option value="checked out">Checked Out</option>
        <option value="reserved">Reserved</option>
      </select>
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
