const express = require('express');
const { addBook, getBooks } = require('../controllers/bookController');
const router = express.Router();

router.post('/add-book', addBook);
router.get('/get-books', getBooks);

module.exports = router;
