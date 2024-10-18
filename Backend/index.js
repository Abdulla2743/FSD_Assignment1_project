const expres = require("express");
const mongoose = require("mongoose");

const app = expres();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
mongoose.connect("mongodb://localhost:27017/books");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  condition: String,
  status: String,
});

const Book = mongoose.model("Book", bookSchema);

app.post("/add-book", (req, res) => {
  const book = new Book(req.body);
  book.save((err, book) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(book);
    }
  });
});
