import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Menu' },
  { to: '/payment', label: 'Payment' },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-base-100 shadow-md border-b border-base-200">
      <div className="navbar max-w-4xl mx-auto px-4">
        <div className="flex-1 flex items-center gap-3">
          <img src="/vite.svg" alt="Logo" className="h-10 w-10 rounded-full shadow" />
          <span className="font-bold text-xl text-primary tracking-wide">Cafe Self-Order</span>
        </div>
        <div className="hidden md:flex gap-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`btn btn-ghost btn-sm rounded-full px-4 ${
                location.pathname === link.to ? 'bg-primary text-primary-content' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button className="btn btn-ghost btn-circle" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-200 px-4 pb-3 flex flex-col gap-2 animate-fade-in">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`btn btn-ghost btn-block rounded-full text-base ${
                location.pathname === link.to ? 'bg-primary text-primary-content' : ''
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
