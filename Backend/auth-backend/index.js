const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/books");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Book Schema and Model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  condition: String,
  status: String,
});

const Book = mongoose.model("Book", bookSchema);

// Route to add a book
app.post("/add-book", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).send(savedBook);
  } catch (err) {
    res.status(400).send({ error: 'Failed to add book', details: err });
  }
});

// User Authentication
const users = [];
const SECRET_KEY = 'jkldfvhiilas1264@';

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
