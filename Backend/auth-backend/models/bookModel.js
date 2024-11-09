const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    condition: String,
    status: String,
});

module.exports = mongoose.model("Book", bookSchema);
