import { HelpCircle, Star } from 'lucide-react';

const BlindDateCard = ({ book }) => {
    // Parse tropes from string "Mystery, Victorian, Plot Twist"
    const tropes = book.blind_date_tropes ? book.blind_date_tropes.split(', ') : ['Mystery', 'Surprise'];

    return (
        <div className="bg-gradient-to-br from-brand-secondary to-purple-900 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="relative p-6 aspect-[2/3] flex flex-col text-center items-center justify-between text-white border-4 border-white/10 m-2 rounded-md">
                <div className="mt-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <HelpCircle size={32} />
                    </div>
                    <h3 className="font-serif font-bold text-2xl mb-2">Blind Date</h3>
                    <p className="text-white/80 text-sm italic">"Don't judge a book by its cover"</p>
                </div>

                <div className="space-y-2 w-full">
                    {tropes.map((trope, idx) => (
                        <div key={idx} className="bg-black/30 backdrop-blur-md py-1 px-3 rounded-full text-xs font-semibold tracking-wide border border-white/10">
                            {trope}
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <p className="text-3xl font-bold font-serif text-brand-gold drop-shadow-md">${book.price}</p>
                    <button className="mt-4 bg-white text-brand-dark px-6 py-2 rounded-full font-bold hover:bg-brand-gold hover:text-white transition-colors shadow-lg">
                        Risk It
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlindDateCard;
