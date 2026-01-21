import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import * as db from '../services/database';
import { Bed, Bath } from 'lucide-react';

export const PropertiesPage: React.FC = () => {
    const [properties, setProperties] = useState<any[]>([]);

    useEffect(() => {
        setProperties(db.db_get_all_properties());
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
            <Navbar />

            <div className="pt-32 pb-20 max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">Our Properties</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Explore our exclusive list of premium homes, apartments, and land available for sale and rent across Kenya.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map(p => (
                        <div key={p.id} className="group bg-white rounded-3xl p-3 shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all border border-gray-100">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                                <img src={p.imageUrl || p.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                                    {p.type}
                                </div>
                            </div>
                            <div className="px-2 pb-2">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg leading-tight w-2/3 truncate">{p.title}</h3>
                                    <div className="font-bold text-emerald-600 text-sm">
                                        ${(p.price / 100).toLocaleString()} <span className="text-gray-400 font-normal">/mo</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs mb-4 truncate">{p.location}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                                        <span className="flex items-center gap-1"><Bed size={14} /> {p.bedrooms}</span>
                                        <span className="flex items-center gap-1"><Bath size={14} /> 2</span>
                                    </div>
                                    <a href="https://t.me/nyumba_AiBot" className="text-xs font-bold bg-black text-white px-4 py-2 rounded-full group-hover:bg-emerald-500 transition-colors">
                                        Book Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};
