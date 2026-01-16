const express = require('express');
const router = express.Router();
const { getBooks, getBookByIsbn, getSeriesSuggestions, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getBooks);
router.get('/:isbn', getBookByIsbn);
router.get('/:isbn/series', getSeriesSuggestions);
router.post('/', protect, admin, createBook); // Only accessable by Curator
router.put('/:isbn', protect, admin, updateBook);
router.delete('/:isbn', protect, admin, deleteBook);

module.exports = router;
