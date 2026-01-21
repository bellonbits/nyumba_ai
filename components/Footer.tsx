import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../src/assets/logo.png';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-20 border-t border-white/10 text-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                <div className="col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <img src={logo} alt="Nyumba AI" className="h-12 w-auto object-contain" />
                        <span className="text-xl font-bold text-white tracking-tight">nyumba.ai</span>
                    </div>
                    <p className="text-slate-500 max-w-xs mb-8 leading-relaxed">
                        The #1 AI Sales Agent for Kenyan Real Estate. Automate your sales, save time, and close more deals.
                    </p>
                    <div className="flex gap-4 text-slate-400">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Product</h4>
                    <ul className="space-y-4 text-slate-500">
                        <li><Link to="/properties" className="hover:text-emerald-400 transition-colors">Properties</Link></li>
                        <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
                        <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Company</h4>
                    <ul className="space-y-4 text-slate-500">
                        <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About</Link></li>
                        <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                        <li><Link to="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Legal</h4>
                    <ul className="space-y-4 text-slate-500">
                        <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy</Link></li>
                        <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-slate-600">
                © 2026 Nyumba AI. All rights reserved.
            </div>
        </footer>
    );
};
