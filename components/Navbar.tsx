import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Properties', path: '/properties' },
        { name: 'Services', path: '/services' },
        { name: 'About Us', path: '/about' },
        { name: 'Blog', path: '/blog' }
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50 relative">
                    <img src={logo} alt="Nyumba AI" className="h-10 w-auto object-contain" />
                    <span className="text-xl font-bold tracking-tight text-slate-900">NYUMBA AI</span>
                </Link>

                {/* Desktop Center Links */}
                <div className="hidden md:flex items-center bg-gray-100/50 rounded-full px-2 py-1.5 border border-gray-100">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive(link.path)
                                ? 'bg-black text-white shadow-lg'
                                : 'text-gray-500 hover:text-black'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Action & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:block p-2 rounded-full hover:bg-gray-100">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3"></path></svg>
                    </button>
                    <a href="https://t.me/nyumba_AiBot" target="_blank" className="hidden md:flex bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all items-center gap-2">
                        Sign In <span className="text-gray-400">→</span>
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-gray-100 z-50 relative"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-40 pt-24 px-6 md:hidden flex flex-col gap-6"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-2xl font-bold ${isActive(link.path) ? 'text-black' : 'text-gray-400'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-gray-100" />
                        <a
                            href="https://t.me/nyumba_AiBot"
                            className="bg-black text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            Sign In with Telegram
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
