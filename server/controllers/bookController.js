const { sql } = require('../config/db');

// @desc    Get all books with optional filters
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    try {
        const { genre, author, search } = req.query;
        const pool = await sql.connect();

        let query = 'SELECT * FROM Books WHERE 1=1';

        if (genre) query += ` AND genre = '${genre}'`;
        if (author) query += ` AND author LIKE '%${author}%'`;
        if (search) query += ` AND (title LIKE '%${search}%' OR author LIKE '%${search}%')`;

        // Only show Vault items if they are released? (Handled in frontend or separate API)
        // For general shop, maybe exclude vault items or show them as "Locked"
        // query += ' AND is_vault_item = 0'; 

        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving books' });
    }
};

// @desc    Get single book by ISBN
// @route   GET /api/books/:isbn
// @access  Public
const getBookByIsbn = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('isbn', sql.NVarChar, req.params.isbn)
            .query('SELECT * FROM Books WHERE isbn = @isbn');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving book' });
    }
};

// @desc    Get series/bundle suggestions for a book
// @route   GET /api/books/:isbn/series
// @access  Public
const getSeriesSuggestions = async (req, res) => {
    try {
        const pool = await sql.connect();

        // Find logic entries where this book is the trigger
        const result = await pool.request()
            .input('isbn', sql.NVarChar, req.params.isbn)
            .query(`
                SELECT sl.bundle_discount_percent, b.* 
                FROM SeriesLogic sl
                JOIN Books b ON sl.suggested_book_isbn = b.isbn
                WHERE sl.trigger_book_isbn = @isbn
            `);

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving series suggestions' });
    }
};

// @desc    Add a book (Curator only)
// @route   POST /api/books
// @access  Private/Curator
const createBook = async (req, res) => {
    try {
        const { isbn, title, author, genre, price, stock_new, stock_used, is_vault_item, blind_date_tropes, cover_image } = req.body;

        const pool = await sql.connect();

        await pool.request()
            .input('isbn', sql.NVarChar, isbn)
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('genre', sql.NVarChar, genre)
            .input('price', sql.Decimal, price)
            .input('stock_new', sql.Int, stock_new || 0)
            .input('stock_used', sql.Int, stock_used || 0)
            .input('is_vault_item', sql.Bit, is_vault_item ? 1 : 0)
            .input('blind_date_tropes', sql.NVarChar, blind_date_tropes || null)
            .input('cover_image', sql.NVarChar, cover_image || null)
            .query(`
                INSERT INTO Books (isbn, title, author, genre, price, stock_new, stock_used, is_vault_item, blind_date_tropes, cover_image)
                VALUES (@isbn, @title, @author, @genre, @price, @stock_new, @stock_used, @is_vault_item, @blind_date_tropes, @cover_image)
            `);

        res.status(201).json({ message: 'Book created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a book (Curator only)
// @route   PUT /api/books/:isbn
// @access  Private/Curator
const updateBook = async (req, res) => {
    try {
        const { title, author, genre, price, stock_new, stock_used, is_vault_item, blind_date_tropes, cover_image } = req.body;
        const { isbn } = req.params;

        const pool = await sql.connect();

        await pool.request()
            .input('isbn', sql.NVarChar, isbn)
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('genre', sql.NVarChar, genre)
            .input('price', sql.Decimal, price)
            .input('stock_new', sql.Int, stock_new)
            .input('stock_used', sql.Int, stock_used)
            .input('is_vault_item', sql.Bit, is_vault_item ? 1 : 0)
            .input('blind_date_tropes', sql.NVarChar, blind_date_tropes || null)
            .input('cover_image', sql.NVarChar, cover_image || null)
            .query(`
                UPDATE Books 
                SET title = @title, author = @author, genre = @genre, price = @price, 
                    stock_new = @stock_new, stock_used = @stock_used, is_vault_item = @is_vault_item, 
                    blind_date_tropes = @blind_date_tropes, cover_image = @cover_image
                WHERE isbn = @isbn
            `);

        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating book' });
    }
};

// @desc    Delete a book (Curator only)
// @route   DELETE /api/books/:isbn
// @access  Private/Curator
const deleteBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const pool = await sql.connect();

        // Check if book has dependencies (ReadingTracker, etc.)
        // For simplicity, we'll just delete, but in production we might soft delete
        await pool.request()
            .input('isbn', sql.NVarChar, isbn)
            .query('DELETE FROM Books WHERE isbn = @isbn');

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting book' });
    }
};

module.exports = {
    getBooks,
    getBookByIsbn,
    getSeriesSuggestions,
    createBook,
    updateBook,
    deleteBook
};
