import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-teal-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Self-Order PWA</h1>
      <nav>
        <Link to="/" className="mx-2 hover:underline">Home</Link>
        <Link to="/payment" className="mx-2 hover:underline">Payment</Link>
      </nav>
    </header>
  );
};

export default Header;
