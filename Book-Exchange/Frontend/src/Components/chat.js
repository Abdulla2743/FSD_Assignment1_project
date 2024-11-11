import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
});

function Chat() {
    const [username, setUsername] = useState("");
    const [tempUsername, setTempUsername] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isUsernameSet, setIsUsernameSet] = useState(false); 
    
    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setChat((prevChat) => [...prevChat, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const handleUsernameSubmit = () => {
        if (tempUsername.trim()) {
            setUsername(tempUsername); // Set the username
            setIsUsernameSet(true); // Set flag to true
        } else {
            alert("Please enter a username!");
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { username, message });
            setMessage(""); // Clear input field after sending
        } else {
            alert("Please enter a message!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Chat Container */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 space-y-4">
                <h2 className="text-center text-2xl font-semibold text-gray-700">Live Chat</h2>

                {!isUsernameSet ? (
                    // Username Input Section
                    <div className="space-y-4">
                        <input
                            type="text"
                            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                        <button
                            onClick={handleUsernameSubmit}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Start Chat
                        </button>
                    </div>
                ) : (
                    // Chat Section
                    <>
                        {/* Chat Window */}
                        <div className="flex flex-col h-80 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-2">
                            {chat.map((msg, index) => (
                                <div key={index} className={`flex ${msg.username === username ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-xs p-3 rounded-lg ${msg.username === username ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                                        <p className="font-bold">{msg.username}:</p>
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input Section */}
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message"
                            />
                            <button
                                onClick={sendMessage}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chat;
