import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const genres = [
  'Thriller', 'Biopic', 'Science', 'Horror', 'Comedy', 'Inspiring', 'Knowledgeable',
  'Technology', 'Maths', 'Comics', 'Spiritual'
];

const conditions = ['Very Good', 'Good', 'Average', 'Usable', 'Bad'];

export default function BookSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (value) params.append(key, value);
    }

    setSearchParams(params);

    try {
      const response = await fetch(`http://localhost:5000/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <input
              type="text"
              name="query"
              defaultValue={searchParams.get('query') || ''}
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            name="genre"
            defaultValue={searchParams.get('genre') || ''}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

          <select
            name="condition"
            defaultValue={searchParams.get('condition') || ''}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Condition</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
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
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}
