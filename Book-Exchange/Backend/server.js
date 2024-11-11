const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");

const connectDB = require("./config/db");
const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");
const socket = require("./socket");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();
app.use("/books", bookRoute);

const users = [];
const SECRET_KEY = 'jkldfvhiilas1264@';

app.get('/api/books', async (req, res) => {
    try {
      const { query, genre, condition } = req.query;
      let filter = {};
  
      if (query) {
        filter.title = { $regex: query, $options: 'i' }; // Case-insensitive search in title
      }
      if (genre) {
        filter.genre = genre;
      }
      if (condition) {
        filter.condition = condition;
      }
  
      const books = await Book.find(filter);
      res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send({ error: "Invalid password" });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

app.post("/logout", (req, res) => {
  res.status(200).send("User logged out");
});

// Create an HTTP server and setup socket.io
const server = http.createServer(app);
socket(server);

server.listen(5000, () => console.log("Server running on port 5000"));
