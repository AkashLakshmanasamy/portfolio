import { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-16 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                        Featured Projects
                    </h2>
                    <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PORTFOLIO_DATA.projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="glass-card p-6 rounded-xl flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-slate-500 transition-all duration-300"
                            onClick={() => setSelectedProject(project)}
                        >
                            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                            <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                {project.tech.map(t => (
                                    <span key={t} className="px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded text-xs font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center z-10 pt-4 border-t border-slate-700/50">
                                <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                    <FiGithub /> <span className="text-sm">Repo</span>
                                </a>
                                <span className="text-primary text-sm font-medium flex items-center gap-1">Details <FiExternalLink /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-slate-800 w-full max-w-2xl rounded-2xl p-8 border border-slate-700 relative shadow-xl"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 pr-8">{selectedProject.title}</h3>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-slate-700 text-slate-200 text-sm font-medium rounded-md">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-700 mb-8">
                                <h4 className="text-lg font-semibold text-white mb-2">Overview</h4>
                                <p className="text-slate-400 text-base leading-relaxed">{selectedProject.description}</p>
                            </div>

                            <div className="flex">
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium transition-colors flex items-center gap-2"
                                >
                                    <FiGithub /> Source Code
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
