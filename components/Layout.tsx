
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Container: React.FC<LayoutProps> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

export const Section: React.FC<LayoutProps & { className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);
