import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-book/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError('Book not found');
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`/user-images/${book.imagePath}.jpg`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="">
                Title: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.title}</span>
              </h2>
              <h1 className="">
                Author: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.author}</span>
              </h1>
              <h1 className="">
                Genre: <span className='text-gray-900 text-xl title-font font-medium mb-1'>{book.genre}</span>
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
    </div>
  );
};

export default BookDetails;
