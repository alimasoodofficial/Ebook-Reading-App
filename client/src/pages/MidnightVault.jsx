import { useState, useEffect } from 'react';
import { Lock, Clock, AlertTriangle } from 'lucide-react';
import BookCard from '../components/BookCard';
import dummyBooks from '../data/dummyBooks';

const MidnightVault = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeLeft, setTimeLeft] = useState('');

    // Logic: Vault is open between 12:00 AM (00:00) and 3:00 AM (03:00)
    // For demo purposes, we might want to toggle this or mock it easily.
    const checkIfOpen = (date) => {
        const hours = date.getHours();
        return hours >= 0 && hours < 3;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setIsOpen(checkIfOpen(now));

            // Calculate time left until Midnight if closed, or until close if open
            if (!checkIfOpen(now)) {
                // Calculate time until next midnight
                const midnight = new Date(now);
                midnight.setHours(24, 0, 0, 0);
                const diff = midnight - now;
                const h = Math.floor(diff / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${h}h ${m}m ${s}s`);
            } else {
                const closeTime = new Date(now);
                closeTime.setHours(3, 0, 0, 0);
                const diff = closeTime - now;
                const h = Math.floor(diff / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${h}h ${m}m ${s}s`);
            }

        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const vaultItems = dummyBooks.filter(book => book.isVaultItem);

    // Debug helper to force open
    const toggleVault = () => setIsOpen(!isOpen);

    return (
        <div className={`min-h-screen ${isOpen ? 'bg-brand-dark' : 'bg-slate-900'} text-white transition-colors duration-1000 overflow-hidden relative`}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20 pointer-events-none"></div>
            {!isOpen && <div className="absolute inset-0 bg-black/60 z-10"></div>}

            <div className={`relative z-20 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen ${isOpen ? '' : ''}`}>

                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-block p-4 rounded-full border-2 border-brand-gold text-brand-gold mb-6 relative">
                        {isOpen ? <Lock size={48} className="text-brand-gold open-lock-anim" /> : <Lock size={48} />}
                        {isOpen && <div className="absolute inset-0 bg-brand-gold blur-xl opacity-40 animate-pulse"></div>}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-yellow-700 mb-4 tracking-wider">
                        MIDNIGHT VAULT
                    </h1>
                    <p className="text-slate-400 text-lg uppercase tracking-widest font-light">Exclusive Releases • Limited Stock</p>
                </div>

                {isOpen ? (
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                            <div className="flex items-center text-red-500 font-mono">
                                <AlertTriangle size={20} className="mr-2 animate-pulse" />
                                <span>CLOSING IN: {timeLeft}</span>
                            </div>
                            <span className="text-brand-gold text-sm">Access Granted</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {vaultItems.map(book => (
                                <BookCard key={book.id} book={{ ...book, cover_image: book.coverImage, stock_new: 5 }} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center z-30">
                        <div className="text-6xl md:text-8xl font-mono font-bold text-slate-700 tracking-tighter mb-4 tabular-nums">
                            {timeLeft || "00:00:00"}
                        </div>
                        <p className="text-slate-500 mb-8">The vault is currently sealed. Return at Midnight.</p>

                        <div className="p-6 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto backdrop-blur-sm">
                            <h3 className="font-serif text-xl mb-2 text-slate-300">Tonight's Drop</h3>
                            <p className="text-slate-500 italic">"Secrets whispered in the dark..."</p>
                        </div>

                        <button
                            onClick={toggleVault}
                            className="mt-12 text-xs text-slate-700 hover:text-slate-500 border border-slate-800 px-3 py-1 rounded"
                        >
                            [DEV: Force Open Vault]
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MidnightVault;
