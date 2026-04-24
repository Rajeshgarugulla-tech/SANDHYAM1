'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { useLanguageStore } from '@/lib/useLanguage';
import { t } from '@/lib/i18n';
import { Language } from '@/types';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  const languages: Language[] = ['en', 'hi'];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              🚀
            </div>
            <span className="font-bold text-xl text-slate-900">Saadhyam</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              {t('nav.features', language)}
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              {t('nav.pricing', language)}
            </Link>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>

            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                {t('nav.login', language)}
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">{t('nav.signup', language)}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="#features" className="block text-gray-600 hover:text-gray-900">
              {t('nav.features', language)}
            </Link>
            <Link href="#pricing" className="block text-gray-600 hover:text-gray-900">
              {t('nav.pricing', language)}
            </Link>
            <div className="flex flex-col gap-2">
              <Link href="/auth/login" className="w-full">
                <Button variant="outline" className="w-full">
                  {t('nav.login', language)}
                </Button>
              </Link>
              <Link href="/auth/signup" className="w-full">
                <Button className="w-full">{t('nav.signup', language)}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
