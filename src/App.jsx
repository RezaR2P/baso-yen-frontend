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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
