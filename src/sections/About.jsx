import { PORTFOLIO_DATA } from '../constants';
import { motion } from 'framer-motion';
import { FiCode, FiDatabase } from 'react-icons/fi';

const About = () => {
    return (
        <section id="about" className="py-16 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                        About Me
                    </h2>
                    <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative w-full max-w-sm mx-auto aspect-square bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center overflow-hidden">
                            <span className="text-4xl text-slate-600 font-bold tracking-widest opacity-30">A K A S H</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-semibold text-white">Career Objective</h3>
                        <p className="text-slate-400 text-base leading-relaxed">
                            {PORTFOLIO_DATA.careerObjective}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <div className="glass-card p-6 rounded-xl hover:border-slate-500 hover:bg-slate-800/80 transition-all">
                                <FiCode className="text-2xl text-primary mb-3" />
                                <h4 className="font-semibold text-white mb-1">Frontend</h4>
                                <p className="text-slate-500 text-sm">React, Tailwind, Clean UI</p>
                            </div>
                            <div className="glass-card p-6 rounded-xl hover:border-slate-500 hover:bg-slate-800/80 transition-all">
                                <FiDatabase className="text-2xl text-secondary mb-3" />
                                <h4 className="font-semibold text-white mb-1">Backend</h4>
                                <p className="text-slate-500 text-sm">Node.js, PHP, Supported DBs</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
