import { PORTFOLIO_DATA } from '../constants';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block bg-slate-800 rounded-full px-5 py-2 border border-slate-700 mb-2"
                    >
                        <span className="text-slate-300 font-medium text-sm">
                            Portfolio & Resume
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white"
                    >
                        Hi, I'm <br className="md:hidden" />
                        <span>{PORTFOLIO_DATA.name}</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 h-[40px] font-medium mt-4"
                    >
                        <TypeAnimation
                            sequence={[
                                PORTFOLIO_DATA.roles[0], 2000,
                                PORTFOLIO_DATA.roles[1], 2000,
                                PORTFOLIO_DATA.roles[2], 2000,
                                PORTFOLIO_DATA.roles[3], 2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-primary"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed mt-4"
                    >
                        I build neat, performant, and scalable digital experiences. Let's create something extraordinary together.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
                    >
                        <a href="#projects" className="inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-primary rounded-lg transition-colors hover:bg-blue-600">
                            View Projects <FiArrowRight className="ml-2" />
                        </a>
                        <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg transition-colors hover:bg-slate-700">
                            <FiMail className="mr-2" /> Contact Me
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex gap-6 mt-12"
                    >
                        <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors text-2xl">
                            <FiGithub />
                        </a>
                        <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-secondary transition-colors text-2xl">
                            <FiLinkedin />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
