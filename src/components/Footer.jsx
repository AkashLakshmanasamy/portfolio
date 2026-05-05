import { PORTFOLIO_DATA } from '../constants';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="relative border-t border-white/10 bg-bg-900/50 py-8 overflow-hidden">
            {/* Animated line effects */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-2xl font-outfit font-bold relative group">
                    <span className="text-gradient">Akash</span> L.
                </div>

                <p className="text-slate-400 font-sora text-sm flex items-center gap-2">
                    Designed & Developed by {PORTFOLIO_DATA.name}
                </p>

                <div className="flex gap-4">
                    <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                        GitHub
                    </a>
                    <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-secondary transition-colors">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
