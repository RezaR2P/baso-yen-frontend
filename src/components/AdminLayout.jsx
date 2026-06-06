import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService.js';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { to: '/admin/dashboard', label: '📊 Dashboard' },
    { to: '/admin/products', label: '🥩 Produk' },
    { to: '/admin/categories', label: '🗂️ Kategori' },
    { to: '/admin/recipes', label: '📖 Resep' },
    { to: '/admin/articles', label: '📝 Artikel' },
    { to: '/admin/contacts', label: '📬 Pesan Masuk' },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-primary border-r-2 border-black flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b-2 border-black">
          <h1 className="font-black text-xl">Baso Yen</h1>
          <p className="text-xs font-semibold">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-3 font-semibold text-sm border-2 border-transparent hover:border-black hover:shadow-nb-sm transition-all ${
                location.pathname === item.to
                  ? 'border-black bg-white shadow-nb-sm'
                  : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t-2 border-black">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 font-bold text-sm border-2 border-black bg-white shadow-nb-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* KONTEN */}
      <main className="flex-1 bg-bg p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
