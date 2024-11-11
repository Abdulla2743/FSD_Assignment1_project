import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null); // Changed to handle file
  const [imagePreview, setImagePreview] = useState(null); // For displaying the selected image

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // For image preview
    } else {
      alert("Please select a valid .jpg file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookData = {
      title,
      author,
      genre,
      condition,
      status,
    };

    
    const formData = new FormData();
    formData.append("bookData", JSON.stringify(bookData)); // Append book details as a JSON string
    if (image) {
      formData.append("image", image); // Append the selected image file
    }

    try {
      const response = await axios.post("http://localhost:5000/add-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart form data for file upload
        },
      });
      console.log("Book added:", response.data);
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add a New Book
        </h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="image"
          >
            Upload Book Cover (JPG Only)
          </label>
          <input
            type="file"
            id="image"
            accept="image/jpeg"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Book Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="genre"
          >
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="" disabled>
              Select genre
            </option>
            <option value="thriller">Thriller</option>
            <option value="horror">Horror</option>
            <option value="comedy">Comedy</option>
            <option value="biopic">Biopic</option>
            <option value="inspiring">Inspiring</option>
            <option value="knowledgeable">Knowledgeable</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="maths">Maths</option>
            <option value="comics">Comics</option>
            <option value="spiritual">Spiritual</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="condition"
          >
            Condition
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="" disabled>
              Select condition
            </option>
            <option value="very good">Very Good</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="usable">Usable</option>
            <option value="bad">Bad</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="available">Available</option>
            <option value="not available">Not Available</option>
          </select>
        </div>

        

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Add Book
        </button>
      </form>
    </>
  );
};

export default AddBook;
