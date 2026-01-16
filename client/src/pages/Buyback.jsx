import { useState } from 'react';
import { Upload, CheckCircle, Camera, Book } from 'lucide-react';

const Buyback = () => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3); // Success state
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif font-bold text-brand-dark mb-2">Book Re-Homing Program</h1>
                    <p className="text-slate-500">Give your beloved books a second life and earn store credit.</p>
                </div>

                {step === 3 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-green-100 animate-fade-in-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Request Submitted!</h2>
                        <p className="text-slate-500 mb-8">Our curators will review your submission within 48 hours. You will be notified via email.</p>
                        <button onClick={() => window.location.href = '/dashboard'} className="btn-primary">Return to Dashboard</button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                        {/* Progress Bar */}
                        <div className="flex border-b border-slate-100">
                            <div className={`flex-1 p-4 text-center text-sm font-semibold ${step === 1 ? 'text-brand-primary bg-purple-50' : 'text-slate-400'}`}>
                                1. Book Details
                            </div>
                            <div className={`flex-1 p-4 text-center text-sm font-semibold ${step === 2 ? 'text-brand-primary bg-purple-50' : 'text-slate-400'}`}>
                                2. Photos & Condition
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            {step === 1 && (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">ISBN (13 digit)</label>
                                        <input type="text" placeholder="978-..." className="input-field" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Book Title</label>
                                        <input type="text" placeholder="e.g. The Great Gatsby" className="input-field" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Author</label>
                                        <input type="text" placeholder="e.g. F. Scott Fitzgerald" className="input-field" />
                                    </div>
                                    <div className="pt-4">
                                        <button type="button" onClick={() => setStep(2)} className="btn-primary w-full">Next Step</button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Condition Assessment</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {['Like New', 'Good', 'Fair'].map((cond) => (
                                                <button type="button" key={cond} className="p-3 border border-slate-200 rounded-lg hover:border-brand-primary hover:bg-purple-50 text-sm font-medium transition-all text-slate-600 focus:ring-2 focus:ring-brand-primary">
                                                    {cond}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Upload Photo</label>
                                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-brand-primary hover:bg-purple-50 transition-colors cursor-pointer group">
                                            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white text-slate-400 group-hover:text-brand-primary">
                                                <Camera size={24} />
                                            </div>
                                            <p className="text-sm text-slate-500">Click to upload cover photo</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-slate-200 rounded-lg text-slate-600 font-semibold hover:bg-slate-50">Back</button>
                                        <button type="submit" className="flex-1 btn-primary">Submit Request</button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Buyback;
