import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="/user-images/book.png" className="w-8 h-8" alt="logo" />
            <span className="ml-3 text-xl">Book Exchange</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 font-bold hover:text-gray-900">Home</Link>
            <Link className="mr-5 font-bold hover:text-gray-900"> Request book</Link>
            <Link className="mr-5 font-bold hover:text-gray-900">Accept book</Link>
            <Link className="mr-5 font-bold hover:text-gray-900">Chat box</Link>
          </nav>

          <div className="relative md:mr-4 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-indigo-500"
            />
            <button className="absolute right-0 top-0 mt-1 mr-2 inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4"
                viewBox="0 0 24 24"
              >
                <path d="M15 15l6 6M6 6a9 9 0 1018 0 9 9 0 00-18 0z"></path>
              </svg>
            </button>
          </div>

          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
          </button>
        </div>
      </header>
      <body>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
      {books.map((book, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={`/user-images/${book.image}.jpg`}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {book.title}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                  {book.author}
                  </h2>
                </div>
              </div>
            ))};
            </div>
          </div>
        </section>
      </body>
    </>
  );
};

export default Home;
