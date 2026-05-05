import { PORTFOLIO_DATA } from '../constants';
import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
    { label: 'Languages', data: PORTFOLIO_DATA.skills.languages },
    { label: 'Frontend', data: PORTFOLIO_DATA.skills.frontend },
    { label: 'Backend', data: PORTFOLIO_DATA.skills.backend },
    { label: 'Database', data: PORTFOLIO_DATA.skills.database },
    { label: 'Tools', data: PORTFOLIO_DATA.skills.tools },
];

const Skills = () => {
    return (
        <section id="skills" className="py-16 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                        Technical Skills
                    </h2>
                    <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-6 rounded-2xl flex flex-col items-start hover:border-slate-500 transition-colors"
                        >
                            <h3 className="text-lg font-semibold mb-4 text-white">
                                {category.label}
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {category.data.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-md text-sm transition-colors hover:text-white"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
