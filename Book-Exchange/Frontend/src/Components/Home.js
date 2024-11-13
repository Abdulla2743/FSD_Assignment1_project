import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState(null);
  const [id, setId] = useState();

  // Fetch books initially and whenever needed
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleRequestBook = async (bookId) => {
    try {
      const response = await axios.post(`http://localhost:5000/request-book`, { bookId });
      console.log(response.data.message); // Display success message
      setId(response.data.id); // Set the request ID to trigger status fetch
      
      // Update the local state for the requested book status
      setBooks((prevBooks) => 
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, status: "Pending" } : book
        )
      );

      // Change status to "Accepted Request" after 5 seconds
      setTimeout(() => {
        setBooks((prevBooks) => 
          prevBooks.map((book) =>
            book._id === bookId ? { ...book, status: "Not Available" } : book
          )
        );
      }, 5000); // 5 seconds delay

    } catch (error) {
      console.error('Error requesting book:', error);
    }
  };

  // Fetch the request status when the ID changes
  useEffect(() => {
    const fetchStatus = async () => {
      if (!id) return; // Only fetch if ID is set
      try {
        const response = await axios.get(`/request-status/${id}`);
        setStatus(response.data.status);
      } catch (err) {
        console.log("Error fetching status:", err);
      }
    };

    fetchStatus();
  }, [id]);

  // Fetch books on initial render
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap gap-2 justify-around -m-4">
            {books.map((book) => (
              <div key={book._id} className="lg:w-1/5 bg-gray-200 mt-4 shadow-lg md:w-1/2 p-4 w-full">
                <Link to={`/book/${book._id}`} className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="book img"
                    className="object-cover object-center w-full h-full block"
                    src={`/user-images/${book.imagePath}.jpg`}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {book.title}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {book.author}
                  </h2>
                  <div className="flex items-center justify-between">
                    {book.status === "Available" ? (
                      <button
                        onClick={() => handleRequestBook(book._id)}
                        className="bg-blue-700 p-1 text-sm text-gray-100 rounded"
                      >
                        Request Book
                      </button>
                    ) : book.status === "Not Available" ? (
                      <button
                        disabled
                        className="bg-gray-500 p-1 text-sm text-gray-100 rounded"
                      >
                        Accepted Request
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-400 p-1 text-sm text-gray-100 rounded"
                      >
                        {book.status}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
