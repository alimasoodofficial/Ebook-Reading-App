import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dummyBooks from '../data/dummyBooks';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ShoppingCart, BookOpen, Lock } from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams(); // This is the ISBN
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (err) {
                console.error('Error fetching book details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    const handleReadClick = () => {
        if (isLoggedIn) {
            // "Opens the actual eBook reader" - Mocked
            alert(`Opening reader for "${book.title}"... Enjoy your reading!`);
        } else {
            // Redirect to login
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/shop')}
                    className="flex items-center text-slate-500 hover:text-brand-primary mb-8 transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" /> Back to Catalog
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
                    {/* Cover Image Section */}
                    <div className="w-full md:w-1/3 bg-slate-100 relative">
                        {book.is_vault_item && (
                            <div className="absolute top-4 left-4 bg-brand-dark text-brand-gold px-3 py-1 font-serif text-xs border border-brand-gold z-10 shadow-lg">
                                VAULT EXCLUSIVE
                            </div>
                        )}
                        <img
                            src={book.cover_image || 'https://via.placeholder.com/400x600?text=No+Cover'}
                            alt={book.title}
                            className="w-full h-full object-cover min-h-[400px]"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col">
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-serif text-brand-dark font-bold mb-2">{book.title}</h1>
                                    <p className="text-lg text-slate-500 font-medium mb-4">{book.author}</p>
                                </div>
                                <div className="text-2xl font-bold text-slate-800 bg-slate-50 px-4 py-2 rounded-lg">
                                    ${book.price}
                                </div>
                            </div>

                            <div className="my-6 space-y-2">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-light text-brand-primary mr-2">
                                    {book.genre}
                                </div>
                                {book.stockStatus && (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                        {book.stockStatus}
                                    </div>
                                )}
                            </div>

                            <div className="prose prose-slate max-w-none mb-8">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">Synopsis</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {book.synopsis}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row gap-4">
                            {/* Primary Action Button - Conditional Logic */}
                            <button
                                onClick={handleReadClick}
                                className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${isLoggedIn
                                    ? 'bg-brand-primary text-white hover:bg-brand-dark hover:shadow-brand-primary/30'
                                    : 'bg-slate-800 text-white hover:bg-slate-900 border-2 border-slate-800'
                                    }`}
                            >
                                {isLoggedIn ? (
                                    <>
                                        <BookOpen className="mr-2" size={24} />
                                        Read Now
                                    </>
                                ) : (
                                    <>
                                        <Lock className="mr-2" size={20} />
                                        Login to Read
                                    </>
                                )}
                            </button>

                            <button className="flex-1 sm:flex-none px-6 py-4 rounded-xl font-bold text-brand-dark border-2 border-brand-dark/10 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-light transition-all flex items-center justify-center">
                                <ShoppingCart className="mr-2" size={20} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Series Suggestion Mockup */}
                {book.isSeries && (
                    <div className="mt-12">
                        <h3 className="text-2xl font-serif text-brand-dark mb-6">More in the {book.seriesName}</h3>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                {/* Bundle Preview */}
                                <div className="flex -space-x-12 overflow-hidden py-4 px-2">
                                    {dummyBooks
                                        .filter(b => b.seriesName === book.seriesName)
                                        .map((seriesBook, idx) => (
                                            <img
                                                key={seriesBook.id}
                                                src={seriesBook.coverImage}
                                                alt={seriesBook.title}
                                                className={`w-24 h-36 object-cover rounded shadow-lg border-2 border-white transform transition-transform hover:-translate-y-2 relative z-${idx * 10} hover:z-50 cursor-pointer`}
                                                title={seriesBook.title}
                                                onClick={() => navigate(`/books/${seriesBook.id}`)}
                                            />
                                        ))}
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="font-bold text-lg text-slate-800">Complete the {book.seriesName}</h4>
                                    <p className="text-slate-500 text-sm mb-4">Get all books in this series and dive deeper into the lore.</p>
                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                        <div className="text-right">
                                            <span className="block text-xs text-slate-400 line-through">$29.98</span>
                                            <span className="block text-2xl font-bold text-brand-primary">$24.99</span>
                                        </div>
                                        <button className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-800 transition-colors shadow-lg">
                                            Buy Bundle (-15%)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
