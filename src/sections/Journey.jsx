import { PORTFOLIO_DATA } from '../constants';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Journey = () => {
    return (
        <section id="journey" className="py-16 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                        My Journey
                    </h2>
                    <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Experience Items */}
                    {PORTFOLIO_DATA.experience.map((exp, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center mt-1 pt-1">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300">
                                    <FaBriefcase />
                                </div>
                                {index < PORTFOLIO_DATA.experience.length - 1 && (
                                    <div className="w-[1px] h-full bg-slate-800 my-2"></div>
                                )}
                            </div>
                            <div className="glass-card p-6 rounded-xl flex-1 hover:border-slate-500">
                                <span className="text-primary text-sm font-medium">{exp.duration}</span>
                                <h3 className="text-xl font-semibold text-white mt-1">{exp.title}</h3>
                                <h4 className="text-slate-400 font-medium mb-3">{exp.company}</h4>
                                <ul className="text-slate-500 text-sm space-y-1 list-disc list-inside">
                                    {exp.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {/* Education Items */}
                    <div className="pt-4"></div>
                    {PORTFOLIO_DATA.education.map((edu, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center mt-1 pt-1">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300">
                                    <FaGraduationCap />
                                </div>
                                {index < PORTFOLIO_DATA.education.length - 1 && (
                                    <div className="w-[1px] h-full bg-slate-800 my-2"></div>
                                )}
                            </div>
                            <div className="glass-card p-6 rounded-xl flex-1 hover:border-slate-500">
                                <span className="text-secondary text-sm font-medium">{edu.year}</span>
                                <h3 className="text-xl font-semibold text-white mt-1">{edu.degree}</h3>
                                <h4 className="text-slate-400 font-medium mb-1">{edu.institution}</h4>
                                <p className="text-slate-500 text-sm">{edu.score}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;
