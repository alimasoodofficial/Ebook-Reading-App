import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, KeyRound, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading('Signing in...');

        try {
            const result = await login(email, password);

            if (result.success) {
                toast.success('Welcome to Lexicon Lounge!', { id: loadToast });
                navigate('/dashboard');
            } else {
                toast.error(result.message || 'Login failed', { id: loadToast });
            }
        } catch (err) {
            toast.error('An unexpected error occurred', { id: loadToast });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-secondary to-brand-primary"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl"></div>

                <div className="p-8 sm:p-12">
                    <div className="text-center mb-10">
                        <div className="mx-auto w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 text-brand-primary">
                            <BookOpen size={32} strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-serif text-brand-dark mb-2">Lexicon Lounge</h1>
                        <p className="text-slate-500 text-sm tracking-wide uppercase font-semibold">Curated Literary Experience</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                                <Mail className=" text-slate-400" size={18} />
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="input-field pl-10"
                                    placeholder="reader@lexicon.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                                <KeyRound className=" text-slate-400" size={18} />
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 font-semibold tracking-wide">
                            Enter the Lounge
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            New to the lounge?{' '}
                            <Link to="/register" className="text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                                Apply for Membership
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
