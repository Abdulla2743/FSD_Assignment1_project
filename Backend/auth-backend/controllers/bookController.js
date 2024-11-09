const Book = require('../models/bookModel');

exports.addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).send(savedBook);
    } catch (err) {
        res.status(400).send({ error: 'Failed to add book', details: err });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve books', details: err });
    }
};
