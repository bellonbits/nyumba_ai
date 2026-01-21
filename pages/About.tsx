import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
            <Navbar />

            <div className="pt-32 pb-20 max-w-[1400px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-5xl font-bold mb-6">Revolutionizing Real Estate with AI</h1>
                        <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                            Nyumba AI is Kenya's first AI-powered real estate ecosystem. We were born out of a frustration with the traditional, manual, and often opaque property market.
                        </p>
                        <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                            Our mission is to make buying, selling, and renting properties as easy as sending a text message. By leveraging Large Language Models (LLMs) and local market data, we provide instant, accurate, and personalized service to thousands of Kenyans.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-3xl font-bold text-emerald-600">500+</h3>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Properties Sold</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-emerald-600">10k+</h3>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Users</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gray-100 rounded-[2.5rem] overflow-hidden aspect-square relative shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80" className="object-cover w-full h-full" alt="Team meeting" />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-black text-white p-8 rounded-3xl max-w-xs shadow-xl hidden md:block">
                            <p className="font-bold text-lg mb-4">"We are building the future of how Africans live and invest."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-500 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="CEO" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-bold">John Doe</div>
                                    <div className="text-gray-400">CEO, Nyumba AI</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
