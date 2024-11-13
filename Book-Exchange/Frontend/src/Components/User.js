import axios from "axios";
import React, { useEffect, useState } from "react";

const User = ({ refreshBooks }) => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleAcceptRequest = async (requestId, bookId) => {
    try {
      // Accept the request
      await axios.post(`http://localhost:5000/accept-request`, { requestId });

      // Update the book status to "Available"
      await axios.post('http://localhost:5000/update-book-status', { bookId, status: "Available" });

      // Refresh the book list on the Home page
      refreshBooks();

      // Manually remove the accepted request from the state
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId, bookId) => {
    try {
      // Reject the request
      await axios.post(`http://localhost:5000/reject-request`, { requestId });

      // Optionally update the book status to "Available"
      await axios.post('http://localhost:5000/update-book-status', { bookId, status: "Available" });

      // Refresh the book list on the Home page
      refreshBooks();

      // Manually remove the rejected request from the state
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [requests]); // Runs once when the component mounts

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Book Requests</h1>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p>No requests available</p>
        ) : (
          requests.map((request) => (
            <div key={request._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Book: {request.bookTitle}</h2>
              <p>Status: {request.status}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleAcceptRequest(request._id, request.bookId)}
                  className="bg-green-500 p-1 text-sm text-gray-100 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(request._id, request.bookId)}
                  className="bg-red-500 p-1 text-sm text-gray-100 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default User;
