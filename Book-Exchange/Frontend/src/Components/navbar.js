import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const genres = [
  "Thriller",
  "Biopic",
  "Science",
  "Horror",
  "Comedy",
  "Inspiring",
  "Knowledgeable",
  "Technology",
  "Maths",
  "Comics",
  "Spiritual",
];

const status = ["Available", "Not Available"];

const conditions = ["Very Good", "Good", "Average", "Usable", "Bad"];

const Navbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [click, setClick] = useState(false);
    const location = useLocation();
  
    const handleSearch = async (e) => {
      e.preventDefault();
      setClick(true);
      const formData = new FormData(e.currentTarget);
      const params = new URLSearchParams();
  
      for (const [key, value] of formData.entries()) {
        if (value) params.append(key, value);
      }
  
      setSearchParams(params);
  
      try {
        const response = await fetch(
          `http://localhost:5000/search?${params.toString()}`
        );
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error("Failed to fetch books");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
  
    useEffect(() => {
      setBooks([]);
      setClick(false);
    }, [location]);

    const hideSearchForm = location.pathname.includes('book') ;

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <header className="text-gray-600 flex items-center body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link
              to="/"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <img src="/user-images/book.png" className="w-8 h-8" alt="logo" />
              <span className="ml-3 text-xl">Book Exchange</span>
            </Link>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
              <Link to="/" className="mr-5 font-bold hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/request-book"
                className="mr-5 font-bold hover:text-gray-900"
              >
                Request book
              </Link>
              <Link
                to="/accept-book"
                className="mr-5 font-bold hover:text-gray-900"
              >
                Accept book
              </Link>
              <Link to="/chat" className="mr-5 font-bold hover:text-gray-900">
                Chat box
              </Link>
              <Link
                to="/add-book"
                className="mr-5 font-bold hover:text-gray-900"
              >
                Add Book
              </Link>
            </nav>
          </div>
          {!hideSearchForm && (
            <div>
              <input
                type="text"
                name="query"
                defaultValue={searchParams.get("query") || ""}
                placeholder="Search books..."
                className="w-[300px] pl-4 pr-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>)}
        </header>
        {!hideSearchForm && (
        <div className="grid gap-4 md:grid-cols-4">
          <select
            name="genre"
            defaultValue={searchParams.get("genre") || ""}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            name="status"
            defaultValue={searchParams.get("status") || ""}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Status</option>
            {status.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            name="condition"
            defaultValue={searchParams.get("condition") || ""}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Condition</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>)}
      </form>

      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book._id} className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p>{book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Condition: {book.condition}</p>
                <p>Status: {book.status}</p>
              </li>
            ))}
          </ul>
        ) : click && books.length === 0 ? (
          <p>No books found</p>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
