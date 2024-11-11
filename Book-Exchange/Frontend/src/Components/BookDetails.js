import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookDetails = () => {
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
        {books.map((book, index) => (
      <section key={index} className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="">
              Title: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.title}</span>
              </h2>
              <h1 className="">
              Author: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.author}</span>
              </h1>
              <h1 className="">
              Generation: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.genre}</span>
              </h1>
              <h1 className="">
              Condition: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.condition}</span>
              </h1>
              <h1 className="">
              Status: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.status}</span>
              </h1>
              <p className="leading-relaxed">
                Good Book
              </p>
              <div className="flex gap-5">
                <button className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                  Button
                </button>
                <button className="flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      ))}
    </div>
  );
};

export default BookDetails;
