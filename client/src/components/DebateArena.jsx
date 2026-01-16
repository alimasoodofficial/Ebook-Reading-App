import { useState } from 'react';
import { Swords, ThumbsUp } from 'lucide-react';

const DebateArena = () => {
    // Mock Data
    const [topic, setTopic] = useState({
        question: "Who is the greater villain?",
        optionA: "Voldemort",
        optionB: "Sauron",
        votesA: 1243,
        votesB: 892,
        userVoted: null // 'A' or 'B' or null
    });

    const handleVote = (option) => {
        if (topic.userVoted) return;

        setTopic(prev => ({
            ...prev,
            votesA: option === 'A' ? prev.votesA + 1 : prev.votesA,
            votesB: option === 'B' ? prev.votesB + 1 : prev.votesB,
            userVoted: option
        }));
    };

    const totalVotes = topic.votesA + topic.votesB;
    const percentA = ((topic.votesA / totalVotes) * 100).toFixed(1);
    const percentB = ((topic.votesB / totalVotes) * 100).toFixed(1);

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden my-12">
            <div className="bg-brand-dark p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-brand-gold to-blue-500"></div>
                <Swords className="mx-auto mb-3 text-brand-gold animate-pulse" size={32} />
                <h2 className="text-2xl font-serif font-bold tracking-wide">Literary Debate Arena</h2>
                <p className="text-white/60 text-sm">Cast your vote and defend your stance.</p>
            </div>

            <div className="p-8">
                <h3 className="text-xl font-bold text-center text-slate-800 mb-8">{topic.question}</h3>

                <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
                    {/* Option A */}
                    <button
                        onClick={() => handleVote('A')}
                        disabled={topic.userVoted !== null}
                        className={`flex-1 p-6 rounded-xl border-2 transition-all relative overflow-hidden group ${topic.userVoted === 'A'
                                ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                                : 'border-slate-200 hover:border-red-400 hover:bg-slate-50'
                            }`}
                    >
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg text-slate-800 group-hover:text-red-600 transition-colors">{topic.optionA}</h4>
                            {topic.userVoted && (
                                <div className="mt-2 text-red-600 font-bold text-2xl animate-fade-in">{percentA}%</div>
                            )}
                        </div>
                        {topic.userVoted === 'A' && <ThumbsUp className="absolute top-4 right-4 text-red-500 opacity-20" size={48} />}
                    </button>

                    {/* VS Badge */}
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">VS</div>
                    </div>

                    {/* Option B */}
                    <button
                        onClick={() => handleVote('B')}
                        disabled={topic.userVoted !== null}
                        className={`flex-1 p-6 rounded-xl border-2 transition-all relative overflow-hidden group ${topic.userVoted === 'B'
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                            }`}
                    >
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{topic.optionB}</h4>
                            {topic.userVoted && (
                                <div className="mt-2 text-blue-600 font-bold text-2xl animate-fade-in">{percentB}%</div>
                            )}
                        </div>
                        {topic.userVoted === 'B' && <ThumbsUp className="absolute top-4 right-4 text-blue-500 opacity-20" size={48} />}
                    </button>
                </div>

                {topic.userVoted && (
                    <div className="mt-8">
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                            <div className="h-full bg-red-500 transition-all duration-1000 ease-out" style={{ width: `${percentA}%` }}></div>
                            <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${percentB}%` }}></div>
                        </div>
                        <p className="text-center text-xs text-slate-400 mt-2">{totalVotes} votes cast this week</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DebateArena;
