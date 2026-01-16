import { ShoppingBag, BookOpen, Eye } from 'lucide-react';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
            <div className="relative aspect-[2/3] bg-slate-200 overflow-hidden">
                {book.is_vault_item ? (
                    <div className="absolute inset-0 bg-brand-dark/90 flex items-center justify-center text-brand-gold font-serif text-xl border-4 border-brand-gold m-2">
                        VAULT EXCLUSIVE
                    </div>
                ) : (
                    <img src={book.cover_image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300'}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-3">
                    <button className="bg-white text-brand-dark px-4 py-2 rounded-full font-semibold text-sm hover:bg-brand-gold hover:text-white transition-colors flex items-center">
                        <ShoppingBag size={16} className="mr-2" /> Add to Cart
                    </button>
                    <button className="text-white hover:text-brand-gold underline text-sm flex items-center">
                        <Eye size={16} className="mr-2" /> View Details
                    </button>
                </div>
            </div>

            <div className="p-4">
                <p className="text-xs font-semibold text-brand-secondary tracking-wider uppercase mb-1">{book.genre}</p>
                <h3 className="font-serif font-bold text-lg text-brand-dark leading-tight mb-1 truncate">{book.title}</h3>
                <p className="text-slate-500 text-sm mb-3">{book.author}</p>

                <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">${book.price}</span>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                        {book.stock_new > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
