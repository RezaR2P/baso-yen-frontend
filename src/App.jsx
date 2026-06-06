import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/public/Home';
import Produk from './pages/public/Produk';
import Resep from './pages/public/Resep';
import Artikel from './pages/public/Artikel';
import Layanan from './pages/public/Layanan';
import TentangKami from './pages/public/TentangKami';
import Kontak from './pages/public/Kontak';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProdukDetail from './pages/public/ProdukDetail';
import ResepDetail from './pages/public/ResepDetail';
import ArtikelDetail from './pages/public/ArtikelDetail';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Recipes from './pages/admin/Recipes';
import Articles from './pages/admin/Articles';
import Contacts from './pages/admin/Contacts';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/resep" element={<Resep />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/produk/:slug" element={<ProdukDetail />} />
            <Route path="/resep/:slug" element={<ResepDetail />} />
            <Route path="/artikel/:slug" element={<ArtikelDetail />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Products />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Categories />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/recipes"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Recipes />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Articles />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contacts"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Contacts />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
