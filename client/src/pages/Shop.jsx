import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import BlindDateCard from '../components/BlindDateCard';
import dummyBooks from '../data/dummyBooks';
import { Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Shop = () => {
    const { isLoggedIn, login, logout } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (err) {
                console.error('Error fetching books:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-12 px-4 md:px-8">
            <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-4xl font-serif text-brand-dark mb-2">The Collection</h1>
                    <p className="text-slate-500">Curated volumes for the discerning reader.</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <Link to="/dashboard" className="text-slate-500 hover:text-brand-primary">Dashboard</Link>
                        <Link to="/packages" className="bg-brand-light text-brand-primary px-3 py-1 rounded-full hover:bg-brand-primary hover:text-white transition-all">Buy Points</Link>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search title, author..." className="input-field py-2.5" />
                        </div>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-brand-primary hover:border-brand-primary transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="hidden lg:block space-y-8 h-fit sticky top-8">
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4 text-brand-dark border-b border-slate-200 pb-2">Categories</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex justify-between items-center cursor-pointer hover:text-brand-primary font-medium">
                                <span>All Books</span>
                                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">10</span>
                            </li>
                            <li className="flex justify-between items-center cursor-pointer hover:text-brand-primary">
                                <span>Fiction</span>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                        </div>
                    ) : books.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No books found in the collection.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {books.map((book) => {
                                const isBlindDate = !!book.blind_date_tropes;
                                const bookId = book.isbn; // Use ISBN as ID now

                                return isBlindDate ? (
                                    <Link to={`/books/${bookId}`} key={bookId}>
                                        <BlindDateCard book={{
                                            ...book,
                                            id: bookId,
                                            tropes: book.blind_date_tropes
                                        }} />
                                    </Link>
                                ) : (
                                    <Link to={`/books/${bookId}`} key={bookId}>
                                        <BookCard book={{
                                            ...book,
                                            id: bookId,
                                            cover_image: book.cover_image,
                                            stock_new: book.stock_new,
                                            is_vault_item: book.is_vault_item
                                        }} />
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
