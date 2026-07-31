import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiGithub, 
    FiExternalLink, 
    FiX, 
    FiChevronLeft, 
    FiChevronRight, 
    FiMaximize2, 
    FiLayers 
} from 'react-icons/fi';

// Realistic SVG Binder Clip to clamp files
const BinderClip = () => (
    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none filter drop-shadow-[0_3px_4px_rgba(0,0,0,0.5)]">
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Wire Loop handles */}
            <path
                d="M9.5 8.5 L9.5 2.5 C9.5 1.5, 10 1, 10.5 1 C11 1, 11.5 1.5, 11.5 2.5 L11.5 8.5"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M14.5 8.5 L14.5 2.5 C14.5 1.5, 14 1, 13.5 1 C13 1, 12.5 1.5, 12.5 2.5 L12.5 8.5"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
            />
            {/* Main clamp body */}
            <path
                d="M5 15 L7.5 8 L16.5 8 L19 15 Z"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="1.2"
            />
            {/* Inner shadows */}
            <path
                d="M7 9 L17 9 L15.5 14 L8.5 14 Z"
                fill="#0f172a"
            />
            {/* Glossy reflect */}
            <line x1="7.5" y1="8.5" x2="16.5" y2="8.5" stroke="#64748b" strokeWidth="0.8" />
        </svg>
    </div>
);



const Projects = () => {
    const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
    const projects = PORTFOLIO_DATA.projects || [];

    // Press Escape to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedProjectIdx(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const nextProject = () => {
        if (selectedProjectIdx === null) return;
        setSelectedProjectIdx((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        if (selectedProjectIdx === null) return;
        setSelectedProjectIdx((prev) => (prev - 1 + projects.length) % projects.length);
    };

    // Predefined blueprint sheet rotations
    const sheetRotations = [
        'rotate-[-1.5deg] hover:rotate-0',
        'rotate-[1.8deg] hover:rotate-0',
        'rotate-[-2deg] hover:rotate-0',
        'rotate-[1.2deg] hover:rotate-0',
        'rotate-[-1.2deg] hover:rotate-0'
    ];

    return (
        <section id="projects" className="py-20 relative z-10 overflow-hidden">
            {/* Visual background decorations */}
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12">
                
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4 text-center text-white">
                        Projects Draftboard
                    </h2>
                    <p className="text-slate-400 text-center max-w-xl text-base md:text-lg">
                        Browse the technical blueprints of application builds clamped onto my development drafting table. Click any sheet to view full specifications.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-5" />
                </div>

                {/* Drafting Table Canvas Container */}
                <div className="relative bg-[#0d1624]/60 border-[6px] border-slate-800 rounded-3xl p-6 md:p-10 shadow-[inset_0_4px_25px_rgba(0,0,0,0.9),0_10px_40px_rgba(0,0,0,0.6)] bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] bg-[size:28px_28px]">
                    
                    {/* Corner Drafting screws */}
                    <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                className={`relative bg-[#081222]/90 border border-blue-900/60 rounded-xl p-5 pb-6 flex flex-col group select-none shadow-xl transition-all duration-300 cursor-pointer ${sheetRotations[idx % sheetRotations.length]}`}
                                whileHover={{ 
                                    scale: 1.04, 
                                    y: -8, 
                                    zIndex: 20,
                                    borderColor: "rgba(6,182,212,0.6)",
                                    boxShadow: "0 15px 35px -10px rgba(6,182,212,0.25)"
                                }}
                                onClick={() => setSelectedProjectIdx(idx)}
                            >
                                {/* Binder Clip */}
                                <BinderClip />

                                {/* Drafting annotations label top */}
                                <div className="flex justify-between items-center mb-4 text-[9px] font-mono text-cyan-500/60 font-bold uppercase tracking-wider">
                                    <span>DWG NO: 0{idx + 1}</span>
                                    <span>SCALE: 1:1</span>
                                </div>

                                {/* Project Schematic Drawing Box */}
                                <div className="relative aspect-[16/10] w-full bg-[#030a14]/95 rounded-lg border border-cyan-950/70 overflow-hidden group-hover:bg-[#030a14] transition-colors mb-5">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                    {/* Hover Maximize overlay */}
                                    <div className="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                        <FiMaximize2 className="text-cyan-400 text-2xl drop-shadow" />
                                    </div>
                                </div>

                                {/* Sheet details */}
                                <h3 className="text-base font-outfit font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6">
                                    {project.description}
                                </p>

                                {/* Technologies summary list */}
                                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-2 py-0.5 bg-slate-900/60 border border-slate-800 text-slate-400 rounded text-[9px] font-semibold font-mono tracking-wide">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Project Action Footer */}
                                <div className="flex justify-between items-center pt-3 border-t border-slate-900 text-xs">
                                    <span className="text-cyan-500 font-bold tracking-wide uppercase text-[10px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                        View Schematic <FiLayers />
                                    </span>
                                    <span className="text-slate-500 font-mono text-[9px]">Akash L.</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Immersive Projects Blueprint detailed overlay */}
            <AnimatePresence>
                {selectedProjectIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md"
                        onClick={() => setSelectedProjectIdx(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                            className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center px-6 py-4 bg-slate-900 border-b border-slate-800">
                                <div>
                                    <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest font-mono">
                                        DWG FILE NO. 0{selectedProjectIdx + 1}
                                    </span>
                                    <h3 className="text-xl font-outfit font-bold text-white leading-snug">
                                        {projects[selectedProjectIdx].title}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setSelectedProjectIdx(null)}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {/* Modal Content Scrollable */}
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                                {/* Schematic Vector view */}
                                <div className="relative w-full max-h-[35vh] flex items-center justify-center bg-[#020812] rounded-xl border border-cyan-950 overflow-hidden">
                                    <img 
                                        src={projects[selectedProjectIdx].image} 
                                        alt={projects[selectedProjectIdx].title} 
                                        className="max-w-full max-h-[32vh] object-contain rounded"
                                    />

                                    {/* Prev Arrow */}
                                    <button
                                        onClick={prevProject}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-800 text-white shadow-lg border border-slate-700 transition-all opacity-80 hover:opacity-100 hover:scale-105"
                                    >
                                        <FiChevronLeft size={20} />
                                    </button>

                                    {/* Next Arrow */}
                                    <button
                                        onClick={nextProject}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-800 text-white shadow-lg border border-slate-700 transition-all opacity-80 hover:opacity-100 hover:scale-105"
                                    >
                                        <FiChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Project Description Card */}
                                <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-xl text-left">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                                        Structural Overview
                                    </h4>
                                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                                        {projects[selectedProjectIdx].description}
                                    </p>
                                </div>

                                {/* Tech stack section */}
                                <div className="text-left">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
                                        Drafting Technologies
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {projects[selectedProjectIdx].tech.map((t) => (
                                            <span key={t} className="px-3.5 py-1.5 bg-slate-800 border border-slate-750 text-slate-300 rounded-lg text-xs font-medium font-sans">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer Links */}
                            <div className="flex justify-end items-center gap-4 px-6 py-4 bg-slate-950/60 border-t border-slate-800">
                                <a
                                    href={projects[selectedProjectIdx].github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors flex items-center gap-2"
                                >
                                    <FiGithub size={14} /> Source Code
                                </a>
                                {projects[selectedProjectIdx].live && (
                                    <a
                                        href={projects[selectedProjectIdx].live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                                    >
                                        <FiExternalLink size={14} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
