
import React, { useState, useEffect } from 'react';
import * as db from '../services/database';
import { LeadStatus, PropertyStatus } from '../types';
import {
  BarChart, Users, Home, Settings, MessageSquare, LogOut, Search, Plus, Map as MapIcon, ChevronRight
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


interface AdminDashboardProps {
  onLogout: () => void;
  onChatClick: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onChatClick }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'properties' | 'settings'>('dashboard');
  const [properties, setProperties] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = () => {
      setProperties(db.db_get_all_properties());
      setLeads(db.db_get_all_leads());
      setInteractions(db.db_get_all_interactions());
      setMessages(db.db_get_all_messages());
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Leads', value: leads.length + 1280, trend: '+12%', color: 'text-blue-600', icon: Users },
    { label: 'Viewings Booked', value: interactions.filter(i => i.type === 'viewing_request').length + 40, trend: '+5%', color: 'text-emerald-600', icon: MapIcon },
    { label: 'Closed Deals', value: '18', trend: '+2%', color: 'text-purple-600', icon: BarChart },
    { label: 'Active Listings', value: properties.length.toString(), trend: '0%', color: 'text-orange-600', icon: Home },
  ];

  return (
    <div className="flex h-screen bg-slate-50/50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200/60 flex flex-col shadow-sm z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10 pl-2">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-slate-900/20">N</div>
            <span className="text-xl font-bold tracking-tight">Nyumba AI</span>
          </div>

          <div className="space-y-6">
            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform</div>
            <nav className="space-y-1">
              <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={BarChart} label="Overview" />
              <NavButton active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} icon={Users} label="CRM Leads" />
              <NavButton active={activeTab === 'properties'} onClick={() => setActiveTab('properties')} icon={Home} label="Properties" />
            </nav>

            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Agents</div>
            <nav className="space-y-1">
              <NavButton active={false} onClick={onChatClick} icon={MessageSquare} label="Live Intercom" />
              <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={Settings} label="Settings" />
            </nav>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold capitalize text-slate-800">{activeTab}</h1>
            <p className="text-sm text-slate-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search global..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-slate-900/10 focus:outline-none transition-all"
              />
            </div>
            <button className="bg-slate-900 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg shadow-slate-900/20 hover:scale-105 transition-transform">
              <Plus size={18} />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-white shadow-lg"></div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Stats Row */}
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg bg-slate-50 ${s.color}`}>
                        <s.icon size={20} />
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                        {s.trend}
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">{s.value}</div>
                      <div className="text-sm text-slate-500 font-medium">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map View */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-[500px]">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                      <MapIcon size={18} className="text-slate-400" /> Live Property Map
                    </h2>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 relative z-0">
                    <MapContainer center={[-1.2921, 36.8219]} zoom={11} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      />
                      {properties.filter(p => p.coordinates).map(p => (
                        <Marker key={p.id} position={[p.coordinates.lat, p.coordinates.lng]}>
                          <Popup>
                            <div className="text-xs font-sans">
                              <div className="font-bold mb-1">{p.title}</div>
                              <div className="text-emerald-600 font-bold">KES {p.price_kes?.toLocaleString()}</div>
                              <div>{p.bedrooms} BR • {p.location}</div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800">Live Conversations</h2>
                    <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
                  </div>
                  <div className="overflow-y-auto max-h-[430px]">
                    {leads.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()).slice(0, 10).map((lead, i) => {
                      const userMsgs = messages.filter(m => m.userId === lead.name);
                      const lastMsg = userMsgs[userMsgs.length - 1];
                      return (
                        <div key={i} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-bold text-sm text-slate-800">{lead.name || 'Guest User'}</div>
                            <div className="text-[10px] text-slate-400">{lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</div>
                          </div>
                          <div className="text-xs text-slate-500 mb-2 truncate font-medium">
                            {lastMsg ? (lastMsg.sender === 'user' ? `user: ${lastMsg.text}` : `AI: ${lastMsg.text}`) : 'Started a conversation'}
                          </div>
                          <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                              {lead.status || 'ACTIVE'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                    {leads.length === 0 && (
                      <div className="p-8 text-center text-slate-400 text-sm">No active conversations yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'properties' && (
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Inventory Management</h2>
                <div className="flex gap-2">
                  <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-200">
                    <option>All Types</option>
                    <option>Sale</option>
                    <option>Rent</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {properties.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden">
                              <img src={p.images?.[0] || p.imageUrl} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 text-sm">{p.title}</div>
                              <div className="text-xs text-slate-400">{p.bedrooms} BR • {p.type || p.for_sale_or_rent}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{p.location}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-800">KSh {(p.price || p.price_kes).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${p.status === PropertyStatus.AVAILABLE || p.status === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-slate-400 hover:text-slate-900 transition-colors">
                            <Settings size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active
      ? 'bg-slate-50 text-slate-900 border border-slate-200/60 shadow-sm'
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-slate-900' : 'text-slate-400'} />
      {label}
    </div>
    {active && <ChevronRight size={14} className="text-slate-400" />}
  </button>
);
