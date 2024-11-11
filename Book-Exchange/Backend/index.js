const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const socket = require("./socket");
const http = require("http");

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json()); 

mongoose.connect("mongodb://localhost:27017/books");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    condition: String,
    status: String,
    image: String
});

const Book = mongoose.model("Book", bookSchema);

// Endpoint to add a book
// Endpoint to add a book
app.post("/add-book", async (req, res) => {
    try {
        const { title, author, genre, condition, status, image } = req.body;

        const bookData = {
            title,
            author,
            genre,
            condition,
            status,
            image
        };

        const book = new Book(bookData);
        const savedBook = await book.save();
        res.status(201).send(savedBook);
    } catch (err) {
        console.error("Error saving book:", err);
        res.status(400).send({ error: 'Failed to add book', details: err });
    }
});


// Endpoint to get all books
app.get("/get-books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve books', details: err });
    }
});

// User authentication routes
const users = [];
const SECRET_KEY = 'jkldfvhiilas1264@';

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
    res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/logout', (req, res) => {
    res.status(200).send('User logged out');
});

const server = http.createServer(app);
socket(server);

server.listen(5000, () => console.log('Server running on port 5000'));
