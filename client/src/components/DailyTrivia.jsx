import { useState, useEffect } from 'react';
import { HelpCircle, X, Check, Award } from 'lucide-react';

const DailyTrivia = ({ isOpen, onClose }) => {
    // Mock Data
    const question = {
        text: "Which novel begins with the line 'Call me Ishmael'?",
        options: ["Moby Dick", "The Old Man and the Sea", "Ulysses", "Treasure Island"],
        correctAnswer: "Moby Dick"
    };

    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswer = (option) => {
        setSelected(option);
        setIsCorrect(option === question.correctAnswer);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X size={20} />
                </button>

                <div className="bg-brand-primary p-6 text-white text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <HelpCircle size={24} />
                    </div>
                    <h2 className="text-xl font-serif font-bold">Daily Trivia</h2>
                    <p className="text-brand-light text-sm">Test your knowledge, earn rewards.</p>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">{question.text}</h3>

                    <div className="space-y-3">
                        {question.options.map((option, idx) => {
                            let itemClass = "w-full p-3 rounded-lg border text-left transition-all font-medium ";

                            if (selected === null) {
                                itemClass += "border-slate-200 hover:border-brand-primary hover:bg-purple-50 text-slate-600";
                            } else if (option === question.correctAnswer) {
                                itemClass += "border-green-500 bg-green-50 text-green-700";
                            } else if (option === selected && option !== question.correctAnswer) {
                                itemClass += "border-red-500 bg-red-50 text-red-700";
                            } else {
                                itemClass += "border-slate-100 text-slate-400 opacity-50";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option)}
                                    disabled={selected !== null}
                                    className={itemClass}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{option}</span>
                                        {selected !== null && option === question.correctAnswer && <Check size={18} />}
                                        {selected === option && option !== question.correctAnswer && <X size={18} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {isCorrect === true && (
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start animate-fade-in">
                            <Award className="text-yellow-600 mr-3 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-yellow-800">Correct!</h4>
                                <p className="text-sm text-yellow-700">You've earned <span className="font-bold">50 Loyalty Points</span>.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyTrivia;
