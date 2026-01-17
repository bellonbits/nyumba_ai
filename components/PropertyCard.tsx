
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}


export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const imageUrl = property.imageUrl || (property as any).images?.[0] || 'https://picsum.photos/seed/house/600/400';
  const type = property.type || (property as any).for_sale_or_rent;
  const price = property.price || (property as any).price_kes;
  const tags = property.tags || (property as any).features || [];
  const status = property.status;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm uppercase ${type?.toLowerCase() === 'sale' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
            }`}>
            For {type}
          </span>
          {(status && status.toLowerCase() !== 'available') && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 uppercase">
              {status}
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{property.title}</h3>
          <span className="text-emerald-600 font-bold whitespace-nowrap ml-2">
            KSh {price?.toLocaleString()} {type?.toLowerCase() === 'rent' ? '/mo' : ''}
          </span>
        </div>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {property.bedrooms !== null && property.bedrooms !== undefined && (
            <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded-md text-xs flex items-center">
              🛏️ {property.bedrooms} BR
            </span>
          )}
          {tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="bg-slate-50 text-slate-600 px-2 py-1 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};
