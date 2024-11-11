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
    imagePath: String
});

const Book = mongoose.model("Book", bookSchema);

app.post("/add-book", async (req, res) => {
    try {
        const { title, author, genre, condition, status, imagePath } = req.body;

        const bookData = {
            title,
            author,
            genre,
            condition,
            status,
            imagePath
        };


        const book = new Book(bookData);
        const savedBook = await book.save();
        res.status(201).send(savedBook);
    } catch (err) {
        console.error("Error saving book:", err);
        res.status(400).send({ error: 'Failed to add book', details: err });
    }
});

app.get('/search', async (req, res) => {
    const { query, genre, condition, status } = req.query;
    const filter = {};
  
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ];
    }
    if (genre) {
      filter.genre = genre;
    }
    if (condition) {
      filter.condition = condition;
    }
    if (status) {
      filter.status = status;
    }
  
    try {
      const books = await Book.find(filter);
      res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Failed to fetch books' });
    }
  });


app.get("/get-books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve books', details: err });
    }
});

app.get('/get-book/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book in backend:', error); // Check this log for more details
        res.status(500).send({ error: 'Failed to fetch book details' });
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
