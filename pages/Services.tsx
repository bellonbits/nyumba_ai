import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Bot, Building2, BarChart3, Glasses, Scale, Wallet } from 'lucide-react';

export const ServicesPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
            <Navbar />

            <div className="pt-32 pb-20 max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">We combine real estate expertise with cutting-edge AI to deliver seamless experiences.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: 'AI Sales Agent', desc: '24/7 automated property inquiries and viewing scheduling via WhatsApp & Telegram.', icon: <Bot size={28} className="text-emerald-500" /> },
                        { title: 'Property Management', desc: 'End-to-end management of your listings, tenants, and maintenance requests.', icon: <Building2 size={28} className="text-emerald-500" /> },
                        { title: 'Market Analytics', desc: 'Data-driven insights on pricing, demand, and investment opportunities in Kenya.', icon: <BarChart3 size={28} className="text-emerald-500" /> },
                        { title: 'Virtual Tours', desc: 'Immersive 3D walkthroughs of properties to attract premium international buyers.', icon: <Glasses size={28} className="text-emerald-500" /> },
                        { title: 'Legal Support', desc: 'Drafting lease agreements, sale contracts, and handling land transfers.', icon: <Scale size={28} className="text-emerald-500" /> },
                        { title: 'Financial Advice', desc: 'Mortgage brokerage and investment structuring for high-net-worth clients.', icon: <Wallet size={28} className="text-emerald-500" /> },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">{s.icon}</div>
                            <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};
