import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../src/assets/logo.png';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Nyumba AI" className="h-10 w-auto object-contain" />
                    <span className="text-xl font-bold tracking-tight text-slate-900">NYUMBA AI</span>
                </Link>

                {/* Center Links (Pill Shape) */}
                <div className="hidden md:flex items-center bg-gray-100/50 rounded-full px-2 py-1.5 border border-gray-100">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Properties', path: '/properties' },
                        { name: 'Services', path: '/services' },
                        { name: 'About Us', path: '/about' },
                        { name: 'Blog', path: '/blog' }
                    ].map((link) => (
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

                {/* Right Action */}
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3"></path></svg>
                    </button>
                    <a href="https://t.me/nyumba_AiBot" target="_blank" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
                        Sign In <span className="text-gray-400">→</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};
