import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/produk', label: 'Produk' },
    { to: '/resep', label: 'Resep' },
    { to: '/artikel', label: 'Artikel' },
    { to: '/layanan', label: 'Layanan' },
    { to: '/tentang-kami', label: 'Tentang Kami' },
    { to: '/kontak', label: 'Kontak' },
  ];

  return (
    <nav className="bg-primary border-b-2 border-black sticky top-0 z-50">
      {/* BAR UTAMA */}
      <div className="px-6 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Baso Yen" className="h-16 w-auto" />
          <div className="flex flex-col">
            <span className="font-black text-lg text-black leading-none">
              Baso Yen
            </span>
            <span className="text-xs font-semibold text-black">
              Mie · Baso · Sosis
            </span>
          </div>
        </Link>

        {/* Links — hidden di HP, muncul di desktop */}
        <div className="hidden lg:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-semibold text-black hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button — muncul di HP, hidden di desktop */}
        <button
          className="lg:hidden font-black text-2xl border-2 border-black px-3 py-1 shadow-nb-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU — muncul kalau isOpen */}
      {isOpen && (
        <div className="lg:hidden border-t-2 border-black px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-semibold text-black hover:underline"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
