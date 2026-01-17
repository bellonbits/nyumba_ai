
import React, { useState, useEffect } from 'react';
import { Container, Section } from '../components/Layout';
import * as db from '../services/database';

interface LandingPageProps {
  onAdminClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAdminClick }) => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    setProperties(db.db_get_all_properties().slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 font-sans">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Nyumba AI" className="h-12 w-auto object-contain" />
            <span className="text-xl font-bold text-white tracking-tight">nyumba.ai</span>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300 ml-12">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#resources" className="hover:text-white transition-colors">Resources</a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <a href="https://t.me/nyumba_AiBot" target="_blank" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/20">
              Connect to AI
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] -z-10 opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Elevate your property <br />
            sales with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">AI Agents.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Drive growth by using AI agents on Telegram and WhatsApp that handle property inquiries, viewings, and sales 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href="https://t.me/nyumba_AiBot" target="_blank" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all flex items-center gap-2 shadow-xl shadow-white/10 hover:shadow-white/20 hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48.99-.74 3.88-1.69 6.46-2.8 7.74-3.35 3.68-1.55 4.44-1.82 4.93-1.83.11 0 .35.03.5.16.13.1.17.24.18.33 0 .07.01.2.01.28z" /></svg>
              Connect Telegram
            </a>
          </div>

          {/* Floating UI Mockup */}
          <div className="relative max-w-5xl mx-auto perspective-[2000px]">
            <div className="relative bg-[#0F172A] rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden transform rotate-x-6 hover:rotate-x-0 transition-transform duration-700 ease-out">
              {/* Mock Header */}
              <div className="h-14 border-b border-white/5 bg-white/5 flex items-center px-6 gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="flex-1 text-center text-xs font-mono text-slate-500 tracking-wider">Nyumba AI Agent Interaction</div>
              </div>

              {/* Mock Content */}
              <div className="grid md:grid-cols-2 h-[500px]">
                {/* Left: Chat */}
                <div className="p-8 border-r border-white/5 flex flex-col gap-6 bg-[#0B1120]">
                  <div className="flex items-start gap-4 animate-in slide-in-from-left-4 fade-in duration-500">
                    <div className="w-10 h-10 rounded-full bg-slate-700/50 flex-shrink-0 border border-white/5"></div>
                    <div className="bg-slate-800/50 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300 max-w-[80%] shadow-lg">
                      Hi, I'm interested in the 2BR apartment in Ruaka. Is it still available?
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse animate-in slide-in-from-right-4 fade-in duration-500 delay-150">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center font-bold text-black shadow-lg shadow-emerald-500/20">AI</div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl rounded-tr-none p-4 text-sm text-emerald-100 max-w-[80%] shadow-lg">
                      Hello! Yes, the 2BR in Ruaka is available at KSh 45,000/month. It includes parking, borehole water, and 24/7 security. Would you like to see photos or book a viewing?
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-in slide-in-from-left-4 fade-in duration-500 delay-300">
                    <div className="w-10 h-10 rounded-full bg-slate-700/50 flex-shrink-0 border border-white/5"></div>
                    <div className="bg-slate-800/50 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300 max-w-[80%] shadow-lg">
                      Send photos please.
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse animate-in slide-in-from-right-4 fade-in duration-500 delay-500">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center font-bold text-black shadow-lg shadow-emerald-500/20">AI</div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl rounded-tr-none p-4 text-sm text-emerald-100 max-w-[80%] flex flex-col gap-2 shadow-lg">
                      <p>Here are the photos:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-24 bg-slate-700/50 rounded-lg animate-pulse"></div>
                        <div className="h-24 bg-slate-700/50 rounded-lg animate-pulse delay-75"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Analytics/Profile */}
                <div className="p-8 bg-[#0F172A] hidden md:block">
                  <div className="mb-8 p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Customer Profile</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/10"></div>
                      <div>
                        <div className="font-bold text-white">Kelvin Omari</div>
                        <div className="text-xs text-emerald-400 font-mono">@komari • Online</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-500">Budget</span>
                        <span className="text-white font-medium">KES 40k - 50k</span>
                      </div>
                      <div className="flex justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-500">Location</span>
                        <span className="text-white font-medium">Ruaka, Kiambu</span>
                      </div>
                      <div className="flex justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-500">Intent</span>
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">HIGH</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Suggested Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-slate-300 hover:text-white border border-white/5">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">📅</span>
                        Schedule Viewing
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-slate-300 hover:text-white border border-white/5">
                        <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">📄</span>
                        Send Lease Agreement
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Social Proof */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-xs font-bold tracking-[0.2em] mb-8">TRUSTED BY LEADING REAL ESTATE DEVELOPERS</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
            {['Safaricom', 'Centum', 'HassConsult', 'Knight Frank', 'Pam Golding'].map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-white cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid (Dark) */}
      <Section className="py-32 relative overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Customer Support AI on <span className="text-emerald-400">WhatsApp & Telegram</span>.</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Nyumba AI uses all your property details to answer customer queries in seconds. It personalizes every response to your brand's tone of voice, just like a human agent.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Respond Instantly', desc: 'No more lost leads due to late replies.' },
                  { title: 'Screen & Qualify', desc: 'We filter the serious buyers from the window shoppers.' },
                  { title: 'Schedule Automatically', desc: 'Viewings are booked directly into your calendar.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shadow-lg shadow-emerald-500/5 shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full translate-x-10 translate-y-10"></div>
              <div className="relative z-10 mx-auto rounded-[3rem] border-8 border-slate-900 bg-black aspect-[9/19] w-[320px] shadow-2xl overflow-hidden flex flex-col">
                {/* Mock Phone UI */}
                <div className="h-full bg-slate-900/50 p-4 flex flex-col gap-4">
                  <div className="mt-8 flex gap-3">
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-300 max-w-[85%]">
                      Do you have any 1BR apartments in Kilimani under 60k?
                    </div>
                  </div>
                  <div className="self-end flex gap-3">
                    <div className="bg-emerald-600 p-3 rounded-2xl rounded-tr-none text-xs text-white max-w-[85%] shadow-lg shadow-emerald-600/20">
                      Yes! I found 2 options. One at Yaya Center (55k) and one near Adlife (58k). Both have pools! 🏊‍♂️
                    </div>
                  </div>
                  <div className="mt-8 flex gap-3">
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-300 max-w-[85%]">
                      Show me the Yaya one.
                    </div>
                  </div>

                  <div className="self-end mt-auto mb-8 bg-slate-800/80 backdrop-blur rounded-xl p-3 border border-white/5">
                    <div className="h-24 bg-slate-700/50 rounded-lg mb-2 w-full animate-pulse"></div>
                    <div className="font-bold text-white text-xs">Yaya Heights Apt</div>
                    <div className="text-[10px] text-emerald-400">KES 55,000 / month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Properties Showcases */}
      <Section className="py-32 bg-slate-900/30 border-t border-white/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Inventory</h2>
            <p className="text-slate-400">Real-time properties being managed by our AI right now.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map(p => (
              <div key={p.id} className="bg-slate-800/20 border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 hover:bg-slate-800/40 transition-all duration-300 group cursor-pointer">
                <div className="h-56 relative overflow-hidden">
                  <img src={p.imageUrl || p.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/10 uppercase tracking-widest">
                    {p.type || p.for_sale_or_rent}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-lg leading-tight mb-1 truncate">{p.title}</h3>
                    <div className="text-emerald-400 text-sm font-bold">KES {(p.price || p.price_kes)?.toLocaleString()}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-2 flex-wrap text-slate-400 text-xs font-mono">
                    <span className="flex items-center gap-1">🛏️ {p.bedrooms ?? '-'}</span>
                    <span className="text-slate-700">|</span>
                    <span className="truncate">{p.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/10 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Nyumba AI" className="h-12 w-auto object-contain" />
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
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">API</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-slate-600">
          © 2026 Nyumba AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
