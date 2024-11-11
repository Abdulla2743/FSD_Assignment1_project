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
                  {
                    (book.status === "Available")?
                    (<button  className="bg-green-500 p-1 text-sm text-gray-100 rounded">Request Book</button>):
                    (<button disabled className="bg-green-500 hover:bg-red-500 text-gray-100 hover:text-white p-1 text-sm rounded">Request Book</button>)

                  }
                  <span className="bg-blue-200 p-1 text-sm rounded-lg">{book.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
