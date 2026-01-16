import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Zap, Crown, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
    const { user, token, checkLoggedIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const packages = [
        {
            id: 'starter',
            name: 'Initiate Pack',
            points: 1000,
            price: 9.99,
            icon: <Zap size={24} />,
            color: 'bg-blue-500',
            features: ['1000 Premium Points', 'Access to Shop', 'Basic Support']
        },
        {
            id: 'pro',
            name: 'Scholar Collection',
            points: 5000,
            price: 39.99,
            icon: <Zap size={24} />,
            color: 'bg-brand-primary',
            popular: true,
            features: ['5000 Premium Points', 'Exclusive Badge', 'Scholar Role', 'Priority Support']
        },
        {
            id: 'elite',
            name: 'Grand Curator',
            points: 15000,
            price: 99.99,
            icon: <Crown size={24} />,
            color: 'bg-brand-gold',
            features: ['15000 Premium Points', 'Vault Access Card', 'Elite Support', 'No Ad-breaks']
        }
    ];

    const handlePurchase = async (pkg) => {
        if (!user) {
            toast.error('Please login to purchase packages');
            navigate('/login');
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading(`Processing ${pkg.name}...`);

        try {
            const response = await fetch('http://localhost:5000/api/stats/purchase-credits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: pkg.points / 100, // Assuming 100 points = $1 logic for wallet_balance
                    packageName: pkg.name
                })
            });

            if (response.ok) {
                toast.success(`${pkg.name} purchased! Points added to wallet.`, { id: loadingToast });
                await checkLoggedIn(); // Update profile data
            } else {
                toast.error('Purchase failed. Please try again.', { id: loadingToast });
            }
        } catch (error) {
            console.error(error);
            toast.error('Connection error.', { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif text-brand-dark mb-4">Enhance Your Library</h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Purchase Lexicon Points to unlock rare manuscripts, exclusive vault items, and premium curator features.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${pkg.popular ? 'border-brand-primary shadow-xl scale-105 z-10' : 'border-slate-100 shadow-sm hover:border-brand-light'}`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className={`${pkg.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                {pkg.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-1">{pkg.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-extrabold text-slate-900">${pkg.price}</span>
                                <span className="text-slate-400 font-medium">/ one-time</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePurchase(pkg)}
                                disabled={loading}
                                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${pkg.popular ? 'bg-brand-primary text-white hover:bg-brand-dark shadow-brand-primary/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                Get Points
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-brand-light p-4 rounded-2xl text-brand-primary">
                            <CreditCard size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">Secure Payments</h4>
                            <p className="text-slate-500 text-sm">All transactions are encrypted and processed securely.</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xs text-center md:text-right">
                        By purchasing, you agree to our Terms of Service. Points are non-refundable and valid for 1 year.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Packages;
