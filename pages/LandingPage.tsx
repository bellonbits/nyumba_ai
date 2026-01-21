import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import * as db from '../services/database';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  MapPin,
  Bed,
  Bath,
  Star,
  Check,
  Waves,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface LandingPageProps {
  onAdminClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('Buy');

  useEffect(() => {
    setProperties(db.db_get_all_properties().slice(0, 4));
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-black selection:text-white">

      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Discover Fresh <br />
              Visions of Your <br />
              Ideal Perfect <span className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full ml-2 -rotate-12"><ArrowUpRight size={32} /></span> Home
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-gray-500 max-w-md leading-relaxed">
              Discover hand-picked properties, expert agents, and a seamless journey to your perfect place.
            </motion.p>

            {/* Agent Card (Floating) */}
            <motion.div
              variants={fadeInUp}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="inline-flex items-center gap-4 p-4 bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-50 mt-8"
            >
              <div className="h-12 w-12 bg-gray-200 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Agent" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold">Dianne Russell</div>
                <div className="text-xs text-gray-400">Top Agent</div>
              </div>
              <a href="https://t.me/nyumba_AiBot" className="ml-4 h-10 w-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Images Grid */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gray-100 rounded-[2.5rem] overflow-hidden aspect-[4/3] relative shadow-2xl shadow-gray-200"
            >
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" alt="Modern Home" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />

              {/* Review Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-white/50"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-gray-800 flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.8 (10k Reviews)
                </div>
              </motion.div>
            </motion.div>

            {/* Smaller Images Below */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              {[
                'https://images.unsplash.com/photo-1613977257363-707ba9348227', // Pool view
                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b', // Modern interior
                'https://images.unsplash.com/photo-1600210492493-0946911123ea'  // Facade
              ].map((url, i) => (
                <motion.div variants={fadeInUp} key={i} className="rounded-2xl overflow-hidden h-28 relative group cursor-pointer shadow-lg border border-white">
                  <img src={`${url}?auto=format&fit=crop&w=400&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Search Bar Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 bg-white p-4 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 max-w-5xl"
        >
          <div className="flex flex-wrap items-center gap-4">

            {/* Filter: Looking For */}
            <div className="flex-1 min-w-[200px] p-2">
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">Looking for</label>
              <div className="bg-gray-50 rounded-xl p-1 flex">
                {['Buy', 'Sell', 'Rent'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow-md text-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-100"></div>

            {/* Filter: Location */}
            <div className="flex-1 min-w-[200px] px-4">
              <label className="block text-xs font-bold text-gray-400 mb-2">Location</label>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-400" />
                <input type="text" placeholder="Location" className="w-full bg-transparent font-bold text-slate-800 focus:outline-none placeholder-gray-300" />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-100"></div>

            {/* Filter: Price */}
            <div className="flex-1 min-w-[200px] px-4">
              <label className="block text-xs font-bold text-gray-400 mb-2">Price</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-bold">$</span>
                <input type="text" placeholder="Price" className="w-full bg-transparent font-bold text-slate-800 focus:outline-none placeholder-gray-300" />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-100"></div>

            {/* Action Button */}
            <div className="p-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://t.me/nyumba_AiBot"
                className="bg-black text-white h-14 px-8 rounded-xl font-bold flex items-center justify-center hover:bg-gray-800 transition-all gap-2"
              >
                Find Properties
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Section */}
      <section className="py-20 bg-gray-50/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-[1400px] mx-auto px-6"
        >
          <div className="flex items-end justify-between mb-12">
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold mb-4">Discover Best Properties <br /> Tailored to You</h2>
              <p className="text-gray-500">Explore our latest packages this month, with options for every traveler.</p>
            </motion.div>
            <div className="hidden md:flex gap-4">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"><ArrowLeft size={20} /></motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"><ArrowRight size={20} /></motion.button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((p, i) => (
              <motion.div
                key={p.id || i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl p-3 shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all border border-gray-100"
              >
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
                  <p className="text-gray-400 text-xs mb-4 truncate flex items-center gap-1"><MapPin size={12} /> {p.location}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1"><Bed size={14} /> {p.bedrooms}</span>
                      <span className="flex items-center gap-1"><Bath size={14} /> 2</span>
                    </div>
                    <motion.a whileTap={{ scale: 0.9 }} href="https://t.me/nyumba_AiBot" className="text-xs font-bold bg-black text-white px-4 py-2 rounded-full group-hover:bg-emerald-500 transition-colors">
                      Book Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-xs font-bold tracking-[0.2em] mb-8">TRUSTED BY LEADING REAL ESTATE DEVELOPERS</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
            {['Safaricom', 'Centum', 'HassConsult', 'Knight Frank', 'Pam Golding'].map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-slate-400 cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid (Dark) */}
      <section className="py-32 relative overflow-hidden bg-[#0F172A] text-white my-20 rounded-[3rem] mx-6">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="relative z-10">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Customer Support AI on <span className="text-emerald-400">WhatsApp & Telegram</span>.</motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-400 text-lg leading-relaxed mb-8">
                Nyumba AI uses all your property details to answer customer queries in seconds. It personalizes every response to your brand's tone of voice, just like a human agent.
              </motion.p>
              <div className="space-y-6">
                {[
                  { title: 'Respond Instantly', desc: 'No more lost leads due to late replies.' },
                  { title: 'Screen & Qualify', desc: 'We filter the serious buyers from the window shoppers.' },
                  { title: 'Schedule Automatically', desc: 'Viewings are booked directly into your calendar.' }
                ].map((item, i) => (
                  <motion.div variants={fadeInUp} key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shadow-lg shadow-emerald-500/5 shrink-0">
                      <Check size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full translate-x-10 translate-y-10"></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 mx-auto rounded-[3rem] border-8 border-slate-900 bg-black aspect-[9/19] w-[320px] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Mock Phone UI */}
                <div className="h-full bg-slate-900/50 p-4 flex flex-col gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex gap-3"
                  >
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-300 max-w-[85%]">
                      Do you have any 1BR apartments in Kilimani under 60k?
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="self-end flex gap-3"
                  >
                    <div className="bg-emerald-600 p-3 rounded-2xl rounded-tr-none text-xs text-white max-w-[85%] shadow-lg shadow-emerald-600/20">
                      Yes! I found 2 options. One at Yaya Center (55k) and one near Adlife (58k). Both have pools! <Waves size={12} className="inline ml-1" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.5 }}
                    className="mt-8 flex gap-3"
                  >
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-300 max-w-[85%]">
                      Show me the Yaya one.
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5 }}
                    className="self-end mt-auto mb-8 bg-slate-800/80 backdrop-blur rounded-xl p-3 border border-white/5"
                  >
                    <div className="h-24 bg-slate-700/50 rounded-lg mb-2 w-full animate-pulse"></div>
                    <div className="font-bold text-white text-xs">Yaya Heights Apt</div>
                    <div className="text-[10px] text-emerald-400">KES 55,000 / month</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

    </div>
  );
};
