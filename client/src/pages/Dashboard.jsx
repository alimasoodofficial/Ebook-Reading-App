import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, LayoutDashboard, LogOut, Wallet, ShieldCheck, PlusCircle } from 'lucide-react';
import DebateArena from '../components/DebateArena';
import DailyTrivia from '../components/DailyTrivia';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    // Fallback if user is null (loading handled by protected route wrapper usually)
    const displayUser = user || {
        name: 'Guest',
        role: 'Reader',
        wallet_balance: 0.00,
        badges_json: '[]'
    };

    const [showTrivia, setShowTrivia] = useState(false);
    const toggleTrivia = () => setShowTrivia(!showTrivia);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-dark text-white fixed h-full hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-serif tracking-wide">Lexicon</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="text-xs uppercase text-brand-secondary font-semibold tracking-wider mb-2 mt-4 ml-2">Menu</div>
                    <button onClick={() => navigate('/dashboard')} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${window.location.pathname === '/dashboard' ? 'bg-white/10 text-white font-bold' : 'text-slate-300 hover:bg-white/5'}`}>
                        <LayoutDashboard size={20} className="mr-3" />
                        Dashboard
                    </button>
                    <button onClick={() => navigate('/shop')} className="flex items-center w-full px-4 py-3 hover:bg-white/5 rounded-lg text-slate-300 transition-colors">
                        <Book size={20} className="mr-3" />
                        My Library
                    </button>
                    <button onClick={() => navigate('/packages')} className="flex items-center w-full px-4 py-3 hover:bg-white/5 rounded-lg text-slate-300 transition-colors">
                        <Wallet size={20} className="mr-3" />
                        Buy Packages
                    </button>
                    {displayUser.role === 'Curator' && (
                        <button onClick={() => navigate('/admin')} className="flex items-center w-full px-4 py-3 bg-brand-primary/20 border border-brand-primary/30 rounded-lg text-brand-gold transition-colors mt-4">
                            <ShieldCheck size={20} className="mr-3" />
                            Admin Panel
                        </button>
                    )}
                </nav>

                <div className="p-4 border-t border-white/10 bg-black/20">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-white font-bold">
                            {displayUser.role?.[0] || 'G'}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">Logged in as</p>
                            <p className="text-xs text-brand-light">{displayUser.role}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center text-sm text-slate-400 hover:text-white transition-colors">
                        <LogOut size={16} className="mr-2" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif text-brand-dark">Welcome back, {displayUser.role}</h1>
                        <p className="text-slate-500 mt-1">Here is what's happening in your literary world.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center text-brand-gold font-semibold">
                            <Wallet size={18} className="mr-2" />
                            ${(parseFloat(displayUser.wallet_balance) || 0).toFixed(2)}
                        </div>
                    </div>
                </header>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stat Card 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-light rounded-lg text-brand-primary">
                                <Book size={24} />
                            </div>
                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">+2 new</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">12</h3>
                        <p className="text-slate-500 text-sm">Books currently reading</p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-light rounded-lg text-brand-secondary">
                                <Wallet size={24} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">350</h3>
                        <p className="text-slate-500 text-sm">Loyalty Points</p>
                    </div>

                    {/* Curator Only Card or Placeholder */}
                    <div className="bg-gradient-to-br from-brand-primary to-brand-dark p-6 rounded-xl shadow-lg text-white relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold font-serif mb-2">Midnight Vault</h3>
                            <p className="text-brand-light text-sm mb-4">Next drop in 04:23:12</p>
                            <span className="text-xs font-bold border border-white/30 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-brand-primary transition-all">View Access</span>
                        </div>
                        <div className="absolute -right-4 -bottom-4 bg-white/10 w-24 h-24 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                </div>

                {/* Recent Activity / Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">
                                {displayUser.role === 'Curator' ? 'Inventory Quick Actions' : 'Continue Reading'}
                            </h2>
                            <button className="text-brand-primary text-sm font-semibold hover:underline">View All</button>
                        </div>

                        {displayUser.role === 'Curator' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all"
                                >
                                    <PlusCircle size={32} className="mb-2" />
                                    <span className="font-medium">Manage Inventory</span>
                                </button>
                                {/* Functionality coming in Phase B/C */}
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="font-semibold text-slate-700">Pending Buybacks</h4>
                                    <p className="text-slate-500 text-sm mt-1">No pending requests.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Reading List Item */}
                                <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-brand-primary/30 transition-colors">
                                    <div className="w-12 h-16 bg-slate-300 rounded shadow-sm flex-shrink-0"></div> {/* Cover Placeholder */}
                                    <div className="ml-4 flex-1">
                                        <h4 className="font-bold text-slate-800">The Secret History</h4>
                                        <p className="text-sm text-slate-500">Donna Tartt</p>
                                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                                            <div className="bg-brand-primary h-1.5 rounded-full w-2/3"></div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-brand-primary bg-brand-light px-2 py-1 rounded">66%</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Interactive Widgets */}
                    <div>
                        <button
                            onClick={toggleTrivia}
                            className="w-full mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
                        >
                            <span className="font-bold text-lg flex items-center">
                                <span className="bg-white/20 p-2 rounded-lg mr-3 group-hover:rotate-12 transition-transform">?</span>
                                Daily Trivia Challenge
                            </span>
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Play Now</span>
                        </button>

                        <DebateArena />
                    </div>
                </div>
            </main>

            <DailyTrivia isOpen={showTrivia} onClose={() => setShowTrivia(false)} />
        </div>
    );
};

export default Dashboard;
