import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const BlogPage: React.FC = () => {
    const posts = [
        {
            title: "Is 2026 the Best Time to Invest in Nairobi Real Estate?",
            excerpt: "Analysts predict a 15% surge in property values in Kilimani and Kileleshwa next year.",
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
            category: "Market Trends",
            date: "Jan 12, 2026"
        },
        {
            title: "How AI is Changing Property Viewing in Kenya",
            excerpt: "Virtual tours and AI chatbots are replacing traditional open house visits, saving time for both agents and buyers.",
            image: "https://images.unsplash.com/photo-1558036117-15ea4507c3dd?auto=format&fit=crop&w=800&q=80",
            category: "Technology",
            date: "Jan 08, 2026"
        },
        {
            title: "5 Tips for First-Time Home Buyers",
            excerpt: "From securing a mortgage to checking land titles, here is your ultimate checklist.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
            category: "Guides",
            date: "Dec 28, 2025"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
            <Navbar />

            <div className="pt-32 pb-20 max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">The Nyumba Blog</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Latest insights, market trends, and guides for Kenyan real estate investors.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all cursor-pointer">
                            <div className="h-64 overflow-hidden relative">
                                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="text-xs text-gray-400 font-bold mb-3">{post.date}</div>
                                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                                <div className="font-bold text-sm underline decoration-gray-300 underline-offset-4 group-hover:decoration-emerald-500">Read Article</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};
