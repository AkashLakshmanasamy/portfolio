import { PORTFOLIO_DATA } from '../constants';
import { FiAward, FiStar } from 'react-icons/fi';

const Achievements = () => {
    return (
        <section id="achievements" className="py-16 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                        Awards & Achievements
                    </h2>
                    <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {PORTFOLIO_DATA.achievements.map((ach, idx) => (
                        <div key={idx} className="glass-card p-5 rounded-xl flex items-start gap-4 hover:border-slate-500 transition-colors">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-400">
                                <FiAward size={18} />
                            </div>
                            <div>
                                <p className="text-slate-300 text-base leading-snug pt-1">
                                    {ach}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6 text-center text-white flex justify-center items-center gap-2">
                        <FiStar className="text-secondary" /> Certifications
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                            <div key={idx} className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl text-center">
                                <p className="text-slate-300 font-medium">
                                    {cert}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
