import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from './components/PublicLayout.jsx';
import Home from './pages/public/Home';
import Produk from './pages/public/Produk';
import Resep from './pages/public/Resep';
import Artikel from './pages/public/Artikel';
import Layanan from './pages/public/Layanan';
import TentangKami from './pages/public/TentangKami';
import Kontak from './pages/public/Kontak';
import ProdukDetail from './pages/public/ProdukDetail';
import ResepDetail from './pages/public/ResepDetail';
import ArtikelDetail from './pages/public/ArtikelDetail';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminCategories from './pages/admin/AdminCategories.jsx';
import AdminRecipes from './pages/admin/AdminRecipes.jsx';
import AdminArticles from './pages/admin/AdminArticles.jsx';
import AdminContacts from './pages/admin/AdminContacts.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIK  */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/produk/:slug" element={<ProdukDetail />} />
          <Route path="/resep" element={<Resep />} />
          <Route path="/resep/:slug" element={<ResepDetail />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/:slug" element={<ArtikelDetail />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/kontak" element={<Kontak />} />
        </Route>

        {/* ADMIN  */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminCategories />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/recipes"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminRecipes />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminArticles />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminContacts />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
