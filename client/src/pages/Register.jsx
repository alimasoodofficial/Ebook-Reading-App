import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Feather } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Reader' // Default to Reader
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading('Creating account...');

        try {
            const result = await register(formData.name, formData.email, formData.password, formData.role);

            if (result.success) {
                toast.success('Welcome aboard!', { id: loadToast });
                navigate('/dashboard');
            } else {
                toast.error(result.message || 'Registration failed', { id: loadToast });
            }
        } catch (err) {
            toast.error('An unexpected error occurred', { id: loadToast });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-secondary to-brand-primary"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl"></div>

                <div className="p-8 sm:p-12">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-3 text-brand-primary rotate-3">
                            <Feather size={24} strokeWidth={1.5} />
                        </div>
                        <h1 className="text-2xl font-serif text-brand-dark">Membership Application</h1>
                        <p className="text-slate-500 text-sm">Join our community of literary enthusiasts.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Name</label>
                                <User className=" text-slate-400" size={18} />
                            </div>
                            <div className="relative">
                                <input
                                    name="name"
                                    type="text"
                                    className="input-field pl-10 py-2.5"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Email</label>
                                <Mail className=" text-slate-400" size={18} />
                            </div>
                            <div className="relative">
                                <input
                                    name="email"
                                    type="email"
                                    className="input-field pl-10 py-2.5"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                <Lock className=" text-slate-400" size={18} />
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type="password"
                                    className="input-field pl-10 py-2.5"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="flex bg-slate-100 p-1 rounded-lg mt-4">
                            <button
                                type="button"
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${formData.role === 'Reader' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setFormData({ ...formData, role: 'Reader' })}
                            >
                                Reader
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${formData.role === 'Curator' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setFormData({ ...formData, role: 'Curator' })}
                            >
                                Curator
                            </button>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 mt-6 font-semibold tracking-wide shadow-brand-primary/20">
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-sm">
                            Already a member?{' '}
                            <Link to="/login" className="text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
