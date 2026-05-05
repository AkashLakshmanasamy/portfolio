import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Journey', href: '#journey' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg-900/80 backdrop-blur-md shadow-glass py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <a href="#home" className="text-2xl font-outfit font-bold relative group">
                    <span className="text-gradient">Akash</span> L.
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-slate-300 hover:text-primary transition-colors text-sm uppercase tracking-wider font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Button  */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="space-y-2">
                        <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-bg-800/95 backdrop-blur-xl shadow-glass flex flex-col items-center py-8 gap-6 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-outfit text-white hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
