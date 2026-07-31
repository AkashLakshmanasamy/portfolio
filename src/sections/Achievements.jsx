import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiAward, 
    FiStar, 
    FiChevronLeft, 
    FiChevronRight, 
    FiX, 
    FiMaximize2, 
    FiDownload, 
    FiExternalLink 
} from 'react-icons/fi';

// Realistic SVG push pin for certificates
const PushPin = ({ color = "#ef4444" }) => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none filter drop-shadow-[0_4px_5px_rgba(0,0,0,0.4)]">
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-12"
        >
            {/* Glossy Red Head */}
            <ellipse cx="12" cy="7" rx="5" ry="3.5" fill={color} />
            <path d="M7 8 C 7 5.5, 17 5.5, 17 8 L 15.5 13.5 L 8.5 13.5 Z" fill={color} />
            {/* Highlight line */}
            <path d="M9 7.5 C 9.5 7, 14.5 7, 15 7.5" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" />
            {/* Metal Pin Shaft */}
            <line x1="12" y1="13.5" x2="12" y2="21" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
            {/* Tip Shadow */}
            <circle cx="12" cy="21.5" r="1.5" fill="#000000" opacity="0.3" />
        </svg>
    </div>
);

// Realistic Silver Thumbtack for sticky notes
const ThumbTack = () => (
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Pin head (metallic silver) */}
            <circle cx="12" cy="10" r="6" fill="#cbd5e1" />
            <circle cx="12" cy="10" r="4.5" fill="#94a3b8" />
            <circle cx="10" cy="8.5" r="1.5" fill="#f8fafc" opacity="0.8" />
            {/* Shadow under tack */}
            <circle cx="12" cy="17" r="2" fill="#000000" opacity="0.25" />
            {/* Pin shaft */}
            <line x1="12" y1="14" x2="12" y2="17" stroke="#475569" strokeWidth="2" />
        </svg>
    </div>
);

const Achievements = () => {
    const [activeCertIdx, setActiveCertIdx] = useState(null);
    const certificates = PORTFOLIO_DATA.certificatesData || [];

    // Press Escape to close lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveCertIdx(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const nextCertificate = () => {
        if (activeCertIdx === null) return;
        setActiveCertIdx((prev) => (prev + 1) % certificates.length);
    };

    const prevCertificate = () => {
        if (activeCertIdx === null) return;
        setActiveCertIdx((prev) => (prev - 1 + certificates.length) % certificates.length);
    };

    // Other achievements represented as Sticky Notes
    const stickyNotes = [
        {
            title: "First Prize",
            event: "Design-It-Right",
            desc: "Won first place in the Department Level UI Design Competition. Focused on creative problem solving and sleek user experiences.",
            color: "yellow",
            date: "Sept 2025"
        },
        {
            title: "Second Prize",
            event: "Game-a-thon 2025",
            desc: "Awarded second place in the Institution Level Game Design Competition at E-HORIZON 2025 for innovative gameplay mechanics.",
            color: "blue",
            date: "Feb 2025"
        },
        {
            title: "LeetCode Milestone",
            event: "200+ Problems",
            desc: "Solved over 200 data structure and algorithm challenges, establishing strong algorithmic efficiency and logical skills.",
            color: "purple",
            date: "Continuous"
        },
        {
            title: "NPTEL Certification",
            event: "Privacy & Security",
            desc: "Successfully completed 'Privacy And Security in Online Social Media' course from NPTEL with distinction (Jul–Oct 2025).",
            color: "teal",
            date: "Oct 2025"
        },
        {
            title: "NPTEL Certification",
            event: "HCI Course",
            desc: "Successfully completed 'Design & Implementation of Human-Computer Interfaces' course from NPTEL (Jul–Oct 2024).",
            color: "orange",
            date: "Oct 2024"
        }
    ];

    // Tailwind styles mapping for sticky notes
    const getStickyStyles = (color) => {
        switch (color) {
            case 'yellow':
                return 'bg-[#fef9c3] text-[#713f12] border-yellow-300';
            case 'blue':
                return 'bg-[#dbeafe] text-[#1e3a8a] border-blue-200';
            case 'purple':
                return 'bg-[#f3e8ff] text-[#581c87] border-purple-200';
            case 'teal':
                return 'bg-[#ccfbf1] text-[#115e59] border-teal-200';
            case 'orange':
                return 'bg-[#ffedd5] text-[#7c2d12] border-orange-200';
            default:
                return 'bg-white text-slate-800 border-slate-200';
        }
    };

    // Predefined rotation/tilt classes for paper aesthetic
    const rotations = [
        'rotate-[-2deg] hover:rotate-0',
        'rotate-[1.5deg] hover:rotate-0',
        'rotate-[-1.5deg] hover:rotate-0',
        'rotate-[2deg] hover:rotate-0',
        'rotate-[-2.5deg] hover:rotate-0'
    ];

    return (
        <section id="achievements" className="py-20 relative z-10 overflow-hidden">
            {/* Subtle background blob */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4 text-center text-white">
                        Board of Achievements
                    </h2>
                    <p className="text-slate-400 text-center max-w-xl text-base md:text-lg">
                        Interact with the certificates pinned below or browse my other highlights and credentials pinned to the bulletin board.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-5" />
                </div>

                {/* Corkboard / Pegboard Board Canvas */}
                <div className="relative bg-slate-950/40 border-[6px] border-slate-800 rounded-3xl p-6 md:p-10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] bg-[size:32px_32px]">
                    
                    {/* Pegboard frame accents */}
                    <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-slate-700/60 shadow-inner" />

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Column 1 & 2: Pinned Certificates */}
                        <div className="lg:col-span-2">
                            <h3 className="text-xl md:text-2xl font-outfit font-bold text-white mb-8 flex items-center gap-3">
                                <FiAward className="text-primary text-2xl" /> Pinned Certificates
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
                                {certificates.map((cert, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`relative bg-[#fafaf9] p-3 pb-5 rounded shadow-xl cursor-pointer group select-none border border-[#e7e5e4] ${rotations[idx % rotations.length]} transition-all duration-300`}
                                        whileHover={{ scale: 1.04, y: -8, zIndex: 20 }}
                                        onClick={() => setActiveCertIdx(idx)}
                                    >
                                        {/* Certificate pin */}
                                        <PushPin color={idx % 2 === 0 ? "#ef4444" : "#3b82f6"} />

                                        {/* Certificate Preview Image */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 rounded border border-stone-200">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                            {/* Hover Zoom overlay */}
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                                <FiMaximize2 className="text-white text-3xl drop-shadow" />
                                            </div>
                                        </div>

                                        {/* Card Caption details (typewriter / handwritten feel) */}
                                        <div className="mt-4 px-1">
                                            <div className="flex justify-between items-start gap-2 mb-1.5">
                                                <span className="text-[10px] tracking-wider uppercase bg-stone-200 text-stone-700 font-bold px-1.5 py-0.5 rounded">
                                                    {cert.tag}
                                                </span>
                                                <span className="text-[10px] font-medium text-stone-500 font-sans">
                                                    {cert.date}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-stone-800 font-sans leading-tight line-clamp-1">
                                                {cert.title}
                                            </h4>
                                            <p className="text-[11px] text-stone-500 mt-0.5 font-sans leading-snug line-clamp-1">
                                                {cert.subtitle}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Sticky Notes (Other achievements) */}
                        <div className="lg:col-span-1">
                            <h3 className="text-xl md:text-2xl font-outfit font-bold text-white mb-8 flex items-center gap-3">
                                <FiStar className="text-secondary text-2xl animate-pulse" /> Board Notes & Highlights
                            </h3>

                            <div className="flex flex-col gap-8">
                                {stickyNotes.map((note, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`relative p-5 pb-6 border rounded-sm shadow-md cursor-default select-none ${getStickyStyles(note.color)} ${rotations[(idx + 2) % rotations.length]} transition-all duration-300`}
                                        whileHover={{ scale: 1.03, y: -4, rotate: 0, zIndex: 10 }}
                                    >
                                        {/* Thumbtack pin */}
                                        <ThumbTack />

                                        {/* Date and tag */}
                                        <div className="flex justify-between items-center mb-2.5">
                                            <span className="text-[9px] font-bold uppercase tracking-wider opacity-70 border-b border-current pb-0.5">
                                                {note.title}
                                            </span>
                                            <span className="text-[9px] font-bold opacity-60">
                                                {note.date}
                                            </span>
                                        </div>

                                        {/* Sticky note content */}
                                        <h4 className="font-outfit font-bold text-base leading-tight mb-2">
                                            {note.event}
                                        </h4>
                                        <p className="text-xs font-medium leading-relaxed opacity-85">
                                            {note.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Immersive Framer Motion Lightbox Modal */}
            <AnimatePresence>
                {activeCertIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md"
                        onClick={() => setActiveCertIdx(null)}
                    >
                        {/* Modal container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top Bar with actions */}
                            <div className="flex justify-between items-center px-6 py-4 bg-slate-900 border-b border-slate-800">
                                <div>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                        {certificates[activeCertIdx].tag}
                                    </span>
                                    <h3 className="text-lg font-outfit font-bold text-white leading-snug">
                                        {certificates[activeCertIdx].title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Download button */}
                                    <a
                                        href={certificates[activeCertIdx].image}
                                        download={certificates[activeCertIdx].title}
                                        title="Download certificate"
                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                    >
                                        <FiDownload size={18} />
                                    </a>
                                    {/* View Original */}
                                    <a
                                        href={certificates[activeCertIdx].image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="View full resolution"
                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                    >
                                        <FiExternalLink size={18} />
                                    </a>
                                    {/* Close */}
                                    <button
                                        onClick={() => setActiveCertIdx(null)}
                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-1"
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Main Body (Image + Details) */}
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center gap-6">
                                {/* Navigation arrows overlaid on preview */}
                                <div className="relative w-full max-h-[55vh] flex items-center justify-center bg-slate-950 rounded-xl overflow-hidden p-2 group/viewer">
                                    <img
                                        src={certificates[activeCertIdx].image}
                                        alt={certificates[activeCertIdx].title}
                                        className="max-w-full max-h-[50vh] object-contain rounded"
                                    />

                                    {/* Previous Arrow Button */}
                                    <button
                                        onClick={prevCertificate}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-800 text-white shadow-lg transition-all border border-slate-700 opacity-80 hover:opacity-100 hover:scale-105"
                                    >
                                        <FiChevronLeft size={24} />
                                    </button>

                                    {/* Next Arrow Button */}
                                    <button
                                        onClick={nextCertificate}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-800 text-white shadow-lg transition-all border border-slate-700 opacity-80 hover:opacity-100 hover:scale-105"
                                    >
                                        <FiChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Meta details footer inside modal */}
                                <div className="w-full text-left bg-slate-950/40 border border-slate-800/80 p-5 rounded-xl">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <span className="text-xs font-bold text-slate-400">Award/Competition</span>
                                            <p className="text-sm font-medium text-slate-200 mt-0.5">
                                                {certificates[activeCertIdx].subtitle}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-slate-400">Issued By</span>
                                            <p className="text-sm font-medium text-slate-200 mt-0.5">
                                                {certificates[activeCertIdx].issuer}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-800/50 flex justify-between items-center text-xs text-slate-400">
                                        <span>Issued: <strong>{certificates[activeCertIdx].date}</strong></span>
                                        <span>Certificate <strong>{activeCertIdx + 1}</strong> of <strong>{certificates.length}</strong></span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Achievements;
