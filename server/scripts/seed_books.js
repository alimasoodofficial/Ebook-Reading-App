const { sql, connectDB } = require('../config/db');

const seedBooks = async () => {
    try {
        await connectDB();
        console.log('Clearing existing books...');
        await sql.query('DELETE FROM Books');

        console.log('Seeding new books...');
        const books = [
            {
                isbn: '978-0143126383',
                title: 'The Secret History',
                author: 'Donna Tartt',
                genre: 'Fiction',
                price: 18.99,
                stock_new: 15,
                stock_used: 5,
                is_vault_item: 0,
                cover_image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451546929i/29044.jpg',
                blind_date_tropes: null
            },
            {
                isbn: '978-0525565192',
                title: 'Circe',
                author: 'Madeline Miller',
                genre: 'Fantasy',
                price: 16.50,
                stock_new: 12,
                stock_used: 2,
                is_vault_item: 0,
                cover_image: 'https://m.media-amazon.com/images/I/81SSTFToX1L._AC_UF1000,1000_QL80_.jpg',
                blind_date_tropes: null
            },
            {
                isbn: 'VAULT-001',
                title: 'The Great Gatsby (Limited Edition)',
                author: 'F. Scott Fitzgerald',
                genre: 'Classic',
                price: 150.00,
                stock_new: 5,
                stock_used: 0,
                is_vault_item: 1,
                cover_image: 'https://m.media-amazon.com/images/I/71u9vX+w6pL._AC_UF1000,1000_QL80_.jpg',
                blind_date_tropes: null
            },
            {
                isbn: 'BLIND-001',
                title: 'Anonymous Adventure',
                author: 'Mystery Author',
                genre: 'Adventure',
                price: 12.00,
                stock_new: 10,
                stock_used: 0,
                is_vault_item: 0,
                cover_image: null,
                blind_date_tropes: 'Stolen identities, High-speed chases, Hidden treasure'
            }
        ];

        for (const book of books) {
            await sql.query(`
                INSERT INTO Books (isbn, title, author, genre, price, stock_new, stock_used, is_vault_item, blind_date_tropes, cover_image)
                VALUES (
                    '${book.isbn}', 
                    '${book.title.replace(/'/g, "''")}', 
                    '${book.author.replace(/'/g, "''")}', 
                    '${book.genre}', 
                    ${book.price}, 
                    ${book.stock_new}, 
                    ${book.stock_used}, 
                    ${book.is_vault_item}, 
                    ${book.blind_date_tropes ? `'${book.blind_date_tropes.replace(/'/g, "''")}'` : 'NULL'}, 
                    ${book.cover_image ? `'${book.cover_image}'` : 'NULL'}
                )
            `);
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedBooks();
