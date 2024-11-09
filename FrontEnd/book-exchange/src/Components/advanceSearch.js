import React from 'react';
import { useSearchParams } from 'react-router-dom';

const genres = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction',
  'Fantasy', 'Romance', 'Thriller', 'Biography',
  'History', 'Science', 'Poetry', 'Self-Help'
];

const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Fair', 'Poor'];

export default function AdvanceSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    
    for (const [key, value] of formData.entries()) {
      if (value) params.append(key, value.toString());
    }
    
    setSearchParams(params);
  };

  return (
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8h.01M12 8h.01M16 8h.01M9 12h6m-7 4h8m-4 8a9 9 0 100-18 9 9 0 000 18z" />
          </svg>
        </div>

        <select
          name="genre"
          defaultValue={searchParams.get('genre') || ''}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <select
          name="condition"
          defaultValue={searchParams.get('condition') || ''}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any Condition</option>
          {conditions.map(condition => (
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
  );
}
