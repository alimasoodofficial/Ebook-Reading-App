import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Users, Book, ShoppingBag, Plus, Search, Edit2, Trash2,
    X, TrendingUp, DollarSign, Package, Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stats');

    // Modal States
    const [showBookModal, setShowBookModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [bookForm, setBookForm] = useState({
        isbn: '', title: '', author: '', genre: '', price: '',
        stock_new: 0, stock_used: 0, is_vault_item: false,
        blind_date_tropes: '', cover_image: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'Curator') {
            toast.error('Unauthorized access');
            navigate('/dashboard');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, booksRes] = await Promise.all([
                fetch('http://localhost:5000/api/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/api/books')
            ]);

            const statsData = await statsRes.json();
            const booksData = await booksRes.json();

            setStats(statsData);
            setBooks(booksData);
        } catch (err) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleBookSubmit = async (e) => {
        e.preventDefault();
        const url = editingBook
            ? `http://localhost:5000/api/books/${editingBook.isbn}`
            : 'http://localhost:5000/api/books';
        const method = editingBook ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookForm)
            });

            if (res.ok) {
                toast.success(editingBook ? 'Book updated' : 'Book added');
                setShowBookModal(false);
                setEditingBook(null);
                fetchData();
            } else {
                toast.error('Operation failed');
            }
        } catch (err) {
            toast.error('Error connecting to server');
        }
    };

    const handleDeleteBook = async (isbn) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/books/${isbn}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                toast.success('Book deleted');
                fetchData();
            }
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const openEditModal = (book) => {
        setEditingBook(book);
        setBookForm({ ...book });
        setShowBookModal(true);
    };

    const openAddModal = () => {
        setEditingBook(null);
        setBookForm({
            isbn: '', title: '', author: '', genre: 'Fiction', price: 0,
            stock_new: 10, stock_used: 0, is_vault_item: false,
            blind_date_tropes: '', cover_image: ''
        });
        setShowBookModal(true);
    };

    if (loading && !stats) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div></div>;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-dark text-white p-6 hidden md:block">
                <div className="text-2xl font-serif font-bold mb-10 text-brand-gold">Curator Panel</div>
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'stats' ? 'bg-white/10 text-brand-gold' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <TrendingUp size={20} /> Dashboard Stats
                    </button>
                    <button
                        onClick={() => setActiveTab('books')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'books' ? 'bg-white/10 text-brand-gold' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <Book size={20} /> Inventory Management
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-white/10 text-brand-gold' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <Users size={20} /> User Registry
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h1>
                    <button onClick={() => navigate('/dashboard')} className="text-slate-500 hover:text-brand-primary font-medium">Exit Panel</button>
                </header>

                {/* Stats Tab */}
                {activeTab === 'stats' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard icon={<Users className="text-blue-500" />} label="Total Users" value={stats.userCount} />
                            <StatCard icon={<ShoppingBag className="text-green-500" />} label="Total Orders" value={stats.sales.total_orders} />
                            <StatCard icon={<Package className="text-purple-500" />} label="Package Sales" value={`$${stats.sales.total_package_sales || 0}`} />
                            <StatCard icon={<DollarSign className="text-brand-gold" />} label="Book Sales" value={`$${stats.sales.total_book_sales || 0}`} />
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-slate-400 border-b">
                                            <th className="pb-4 font-medium">User</th>
                                            <th className="pb-4 font-medium">Action</th>
                                            <th className="pb-4 font-medium">Amount</th>
                                            <th className="pb-4 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {stats.transactions.slice(0, 10).map((t) => (
                                            <tr key={t.id} className="text-sm">
                                                <td className="py-4 font-medium">{t.email}</td>
                                                <td className="py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${t.type === 'BookPurchase' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                        {t.type === 'BookPurchase' ? 'Bought: ' : 'Package: '}{t.item_id}
                                                    </span>
                                                </td>
                                                <td className="py-4 whitespace-nowrap font-bold">${t.amount}</td>
                                                <td className="py-4 whitespace-nowrap text-slate-400">{new Date(t.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Books Tab */}
                {activeTab === 'books' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="text" placeholder="Filter inventory..." className="bg-white border rounded-xl pl-10 pr-4 py-2 w-64 outline-none focus:ring-2 focus:ring-brand-primary/20" />
                            </div>
                            <button
                                onClick={openAddModal}
                                className="bg-brand-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-brand-dark transition-all"
                            >
                                <Plus size={20} /> Add New E-Book
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b">
                                    <tr className="text-slate-400 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-bold">Book Details</th>
                                        <th className="px-6 py-4 font-bold">Pricing</th>
                                        <th className="px-6 py-4 font-bold">Inventory</th>
                                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {books.map((book) => (
                                        <tr key={book.isbn} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={book.cover_image || 'https://via.placeholder.com/40x60'} alt="" className="w-10 h-14 object-cover rounded shadow-sm bg-slate-100" />
                                                    <div>
                                                        <div className="font-bold text-slate-800">{book.title}</div>
                                                        <div className="text-xs text-slate-400">{book.author} • {book.genre}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-600">${book.price}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-slate-500">New: <span className="text-slate-800 font-bold">{book.stock_new}</span></div>
                                                <div className="text-xs text-slate-500">Vault: <span className={book.is_vault_item ? 'text-brand-gold font-bold' : 'text-slate-400'}>{book.is_vault_item ? 'Yes' : 'No'}</span></div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => openEditModal(book)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDeleteBook(book.isbn)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b">
                                <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Registered Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Wallet Balance</th>
                                    <th className="px-6 py-4">Join Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {stats.users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="px-6 py-4 font-medium">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${u.role === 'Curator' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>{u.role}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-brand-primary">${u.wallet_balance}</td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">{new Date(u.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Book Modal */}
            {showBookModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                        <div className="p-8 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
                            <h3 className="text-2xl font-bold font-serif">{editingBook ? 'Edit Volume' : 'Add New E-Book'}</h3>
                            <button onClick={() => setShowBookModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleBookSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 uppercase">ISBN / Identifier</label>
                                    <input required disabled={!!editingBook} type="text" value={bookForm.isbn} onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })} className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50" placeholder="e.g. 978-01..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 uppercase">Book Title</label>
                                    <input required type="text" value={bookForm.title} onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })} className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="The Golden Compass" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 uppercase">Author Full Name</label>
                                    <input required type="text" value={bookForm.author} onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="Madeline Miller" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 uppercase">Genre</label>
                                    <select value={bookForm.genre} onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })} className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20">
                                        <option>Fiction</option>
                                        <option>Fantasy</option>
                                        <option>Classic</option>
                                        <option>Academic</option>
                                        <option>Adventure</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 uppercase">Price ($)</label>
                                    <input required type="number" step="0.01" value={bookForm.price} onChange={(e) => setBookForm({ ...bookForm, price: parseFloat(e.target.value) })} className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 uppercase">Condition (Stock)</label>
                                    <input required type="number" value={bookForm.stock_new} onChange={(e) => setBookForm({ ...bookForm, stock_new: parseInt(e.target.value) })} className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase">Cover Image (URL)</label>
                                <div className="flex gap-4">
                                    <div className="w-16 h-20 bg-slate-100 rounded flex items-center justify-center shrink-0">
                                        {bookForm.cover_image ? <img src={bookForm.cover_image} className="w-full h-full object-cover rounded" /> : <ImageIcon size={24} className="text-slate-300" />}
                                    </div>
                                    <input type="text" value={bookForm.cover_image} onChange={(e) => setBookForm({ ...bookForm, cover_image: e.target.value })} className="flex-1 bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="https://..." />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={bookForm.is_vault_item} onChange={(e) => setBookForm({ ...bookForm, is_vault_item: e.target.checked })} className="w-5 h-5 accent-brand-primary rounded" />
                                    <span className="font-bold text-slate-700">Add to Midnight Vault</span>
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase">Blind Date Tropes (Optional)</label>
                                <textarea value={bookForm.blind_date_tropes || ''} onChange={(e) => setBookForm({ ...bookForm, blind_date_tropes: e.target.value })} className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/20 h-24" placeholder="Keywords or emotional cues separated by commas..."></textarea>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button type="button" onClick={() => setShowBookModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20">
                                    {editingBook ? 'Update Volume' : 'Release to Catalog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
        <div>
            <div className="text-sm text-slate-400 font-medium">{label}</div>
            <div className="text-2xl font-bold text-slate-800">{value}</div>
        </div>
    </div>
);

export default AdminDashboard;
