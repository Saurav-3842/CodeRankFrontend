'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onSignUpClick: () => void;
}

export default function Navbar({ onSignUpClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center text-2xl font-bold text-black">
          <span className="text-[#6455D6] border border-[#6455D6] px-1 mr-1 ">CODE</span>
          RANK
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <li>
            <Link href="#home" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </Link>
          </li>
          <li>
            <Link href="#milestones" className="hover:text-indigo-600 transition-colors">
              Milestones
            </Link>
          </li>
        </ul>

        {/* Auth buttons - Desktop */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/login"
            className="border border-gray-300 text-black font-semibold px-8 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            Log In
          </Link>
          <button
            onClick={onSignUpClick}
            className="bg-[#6455D6] text-white font-semibold px-8 py-2 rounded hover:bg-indigo-700 transition hover:cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6 space-y-4 text-sm font-medium text-gray-700">
          <Link href="#home" className="block hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="#features" className="block hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link href="#milestones" className="block hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Milestones
          </Link>
          <Link
            href="/login"
            className="block border border-gray-300 text-black font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
          <button
            onClick={() => {
              onSignUpClick();
              setIsOpen(false);
            }}
            className="w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}
