import { Link } from 'react-router-dom';
const Navbar = () => {
  const links = [
    { to: '/', label: 'Home' },
    {
      to: '/produk',
      label: 'Produk',
    },
    {
      to: '/resep',
      label: 'Resep',
    },
    {
      to: '/artikel',
      label: 'Artikel',
    },
    {
      to: '/layanan',
      label: 'Layanan',
    },
    {
      to: '/tentang-kami',
      label: 'Tentang Kami',
    },
    {
      to: '/kontak',
      label: 'Kontak',
    },
  ];
  return (
    <nav className="bg-primary border-b-2 border-black px-8 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="font-black text-xl text-black">
        Baso Yen
      </Link>

      {/* LINKS */}
      <div className="flex gap-6">
        {links.map((link) => {
          return (
            <Link
              key={link.to}
              to={link.to}
              className="font-semibold text-black hover:underline"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
