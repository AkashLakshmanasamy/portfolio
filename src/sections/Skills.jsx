import { PORTFOLIO_DATA } from '../constants';
import { motion } from 'framer-motion';
import { 
    FaJava, 
    FaJs, 
    FaHtml5, 
    FaCss3Alt, 
    FaReact, 
    FaPhp, 
    FaNodeJs, 
    FaFigma, 
    FaGitAlt, 
    FaDocker, 
    FaAws, 
    FaTerminal,
    FaPython
} from 'react-icons/fa';
import { 
    SiTailwindcss, 
    SiExpress, 
    SiMysql, 
    SiSupabase, 
    SiFramer, 
    SiWebflow, 
    SiC,
    SiPostgresql,
    SiMongodb
} from 'react-icons/si';
import { VscServerEnvironment } from "react-icons/vsc";
import { DiPhotoshop, DiIllustrator } from 'react-icons/di';

// Metadata mapping for brand icons, custom colors, and glowing shadow effects
const SKILL_DETAILS = {
    "Java": { 
        icon: FaJava, 
        iconColor: "text-slate-400 group-hover:text-[#f89820] transition-colors duration-300", 
        glowClass: "hover:border-[#f89820]/40 hover:shadow-[0_0_15px_rgba(248,152,32,0.25)]" 
    },
    "C": { 
        icon: SiC, 
        iconColor: "text-slate-400 group-hover:text-[#00599c] transition-colors duration-300", 
        glowClass: "hover:border-[#00599c]/40 hover:shadow-[0_0_15px_rgba(0,89,156,0.25)]" 
    },
    "JavaScript": { 
        icon: FaJs, 
        iconColor: "text-slate-400 group-hover:text-[#f7df1e] transition-colors duration-300", 
        glowClass: "hover:border-[#f7df1e]/40 hover:shadow-[0_0_15px_rgba(247,223,30,0.25)]" 
    },
    "Python": { 
        icon: FaPython, 
        iconColor: "text-slate-400 group-hover:text-[#3776ab] transition-colors duration-300", 
        glowClass: "hover:border-[#3776ab]/40 hover:shadow-[0_0_15px_rgba(55,118,171,0.25)]" 
    },
    "HTML": { 
        icon: FaHtml5, 
        iconColor: "text-slate-400 group-hover:text-[#e34f26] transition-colors duration-300", 
        glowClass: "hover:border-[#e34f26]/40 hover:shadow-[0_0_15px_rgba(227,79,38,0.25)]" 
    },
    "CSS": { 
        icon: FaCss3Alt, 
        iconColor: "text-slate-400 group-hover:text-[#1572b6] transition-colors duration-300", 
        glowClass: "hover:border-[#1572b6]/40 hover:shadow-[0_0_15px_rgba(21,114,182,0.25)]" 
    },
    "Tailwind CSS": { 
        icon: SiTailwindcss, 
        iconColor: "text-slate-400 group-hover:text-[#06b6d4] transition-colors duration-300", 
        glowClass: "hover:border-[#06b6d4]/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
    },
    "React.js": { 
        icon: FaReact, 
        iconColor: "text-slate-400 group-hover:text-[#61dafb] transition-colors duration-300", 
        glowClass: "hover:border-[#61dafb]/40 hover:shadow-[0_0_15px_rgba(97,218,251,0.25)]" 
    },
    "PHP": { 
        icon: FaPhp, 
        iconColor: "text-slate-400 group-hover:text-[#777bb4] transition-colors duration-300", 
        glowClass: "hover:border-[#777bb4]/40 hover:shadow-[0_0_15px_rgba(119,123,180,0.25)]" 
    },
    "Node.js": { 
        icon: FaNodeJs, 
        iconColor: "text-slate-400 group-hover:text-[#339933] transition-colors duration-300", 
        glowClass: "hover:border-[#339933]/40 hover:shadow-[0_0_15px_rgba(51,153,51,0.25)]" 
    },
    "Express.js": { 
        icon: SiExpress, 
        iconColor: "text-slate-400 group-hover:text-white transition-colors duration-300", 
        glowClass: "hover:border-slate-500/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
    },
    "MySQL": { 
        icon: SiMysql, 
        iconColor: "text-slate-400 group-hover:text-[#4479a1] transition-colors duration-300", 
        glowClass: "hover:border-[#4479a1]/40 hover:shadow-[0_0_15px_rgba(68,121,161,0.25)]" 
    },
    "Supabase": { 
        icon: SiSupabase, 
        iconColor: "text-slate-400 group-hover:text-[#3ecf8e] transition-colors duration-300", 
        glowClass: "hover:border-[#3ecf8e]/40 hover:shadow-[0_0_15px_rgba(62,207,142,0.25)]" 
    },
    "Neon DB": { 
        icon: SiPostgresql, 
        iconColor: "text-slate-400 group-hover:text-[#00e599] transition-colors duration-300", 
        glowClass: "hover:border-[#00e599]/40 hover:shadow-[0_0_15px_rgba(0,229,153,0.25)]" 
    },
    "MongoDB": { 
        icon: SiMongodb, 
        iconColor: "text-slate-400 group-hover:text-[#47a248] transition-colors duration-300", 
        glowClass: "hover:border-[#47a248]/40 hover:shadow-[0_0_15px_rgba(71,162,72,0.25)]" 
    },
    "AWS": { 
        icon: FaAws, 
        iconColor: "text-slate-400 group-hover:text-[#ff9900] transition-colors duration-300", 
        glowClass: "hover:border-[#ff9900]/40 hover:shadow-[0_0_15px_rgba(255,153,0,0.25)]" 
    },
    "Figma": { 
        icon: FaFigma, 
        iconColor: "text-slate-400 group-hover:text-[#f24e1e] transition-colors duration-300", 
        glowClass: "hover:border-[#f24e1e]/40 hover:shadow-[0_0_15px_rgba(242,78,30,0.25)]" 
    },
    "Framer": { 
        icon: SiFramer, 
        iconColor: "text-slate-400 group-hover:text-[#0055ff] transition-colors duration-300", 
        glowClass: "hover:border-[#0055ff]/40 hover:shadow-[0_0_15px_rgba(0,85,255,0.25)]" 
    },
    "Webflow": { 
        icon: SiWebflow, 
        iconColor: "text-slate-400 group-hover:text-[#146ef5] transition-colors duration-300", 
        glowClass: "hover:border-[#146ef5]/40 hover:shadow-[0_0_15px_rgba(20,110,245,0.25)]" 
    },
    "XAMPP": { 
        icon: VscServerEnvironment, 
        iconColor: "text-slate-400 group-hover:text-[#fb7a24] transition-colors duration-300", 
        glowClass: "hover:border-[#fb7a24]/40 hover:shadow-[0_0_15px_rgba(251,122,36,0.25)]" 
    },
    "Illustrator": { 
        icon: DiIllustrator, 
        iconColor: "text-slate-400 group-hover:text-[#ff9a00] transition-colors duration-300", 
        glowClass: "hover:border-[#ff9a00]/40 hover:shadow-[0_0_15px_rgba(255,154,0,0.25)]" 
    },
    "Photoshop": { 
        icon: DiPhotoshop, 
        iconColor: "text-slate-400 group-hover:text-[#31a8ff] transition-colors duration-300", 
        glowClass: "hover:border-[#31a8ff]/40 hover:shadow-[0_0_15px_rgba(49,168,255,0.25)]" 
    },
    "Git & GitHub": { 
        icon: FaGitAlt, 
        iconColor: "text-slate-400 group-hover:text-[#f05032] transition-colors duration-300", 
        glowClass: "hover:border-[#f05032]/40 hover:shadow-[0_0_15px_rgba(240,80,50,0.25)]" 
    },
    "Docker": { 
        icon: FaDocker, 
        iconColor: "text-slate-400 group-hover:text-[#2496ed] transition-colors duration-300", 
        glowClass: "hover:border-[#2496ed]/40 hover:shadow-[0_0_15px_rgba(36,150,237,0.25)]" 
    },
    "Basic DevOps": { 
        icon: FaTerminal, 
        iconColor: "text-slate-400 group-hover:text-[#14b8a6] transition-colors duration-300", 
        glowClass: "hover:border-[#14b8a6]/40 hover:shadow-[0_0_15px_rgba(20,184,166,0.25)]" 
    }
};

const SKILL_CATEGORIES = [
    { label: 'Languages', data: PORTFOLIO_DATA.skills.languages },
    { label: 'Frontend', data: PORTFOLIO_DATA.skills.frontend },
    { label: 'Backend', data: PORTFOLIO_DATA.skills.backend },
    { label: 'Database', data: PORTFOLIO_DATA.skills.database },
    { label: 'Tools & Cloud', data: PORTFOLIO_DATA.skills.tools },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 relative z-10 overflow-hidden">
            {/* Background glowing decorations */}
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4 text-center text-white">
                        Technical Skills
                    </h2>
                    <p className="text-slate-400 text-center max-w-xl text-base md:text-lg">
                        A comprehensive display of my tech stack, frameworks, cloud services, and design tools. Hover on each card to trigger its native brand glow.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-5" />
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="bg-slate-900/35 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-start shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-slate-700/60 transition-all duration-300"
                        >
                            <h3 className="text-lg font-outfit font-bold mb-6 text-white border-b border-slate-800/80 pb-3 flex items-center justify-between">
                                <span>{category.label}</span>
                                <span className="text-xs bg-slate-800/60 px-2 py-0.5 rounded text-slate-400 font-medium font-sans">
                                    {category.data.length} skills
                                </span>
                            </h3>

                            {/* Skills in category list */}
                            <div className="grid grid-cols-2 gap-3.5">
                                {category.data.map((skill) => {
                                    const skillMeta = SKILL_DETAILS[skill] || {
                                        icon: FaTerminal,
                                        iconColor: "text-slate-400 group-hover:text-primary",
                                        glowClass: "hover:border-primary/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                                    };
                                    const IconComponent = skillMeta.icon;

                                    return (
                                        <motion.div
                                            key={skill}
                                            whileHover={{ scale: 1.05 }}
                                            className={`flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/20 border border-slate-800/80 cursor-default group transition-all duration-300 select-none ${skillMeta.glowClass}`}
                                        >
                                            <div className="flex-shrink-0">
                                                <IconComponent className={`text-xl md:text-2xl ${skillMeta.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                                            </div>
                                            <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors duration-300 line-clamp-1 font-sans">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
