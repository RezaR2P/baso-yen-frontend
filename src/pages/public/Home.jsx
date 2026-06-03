import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import productService from '../../services/productService.js';

const Home = () => {
  const keunggulan = [
    { icon: '🏆', title: 'Berkualitas', desc: 'Bahan pilihan terbaik' },
    { icon: '🌿', title: 'Tanpa Bahan Berbahaya', desc: 'Food grade standard' },
    { icon: '❄️', title: 'Fresh', desc: 'Produk selalu baru' },
    { icon: '⭐', title: 'Premium', desc: 'Rasa selezat di resto' },
  ];

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getAll();
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <section className="flex justify-between items-center px-16 py-20">
        {/* KIRI - Teks */}
        <div className="flex-1 max-w-lg">
          {/* Badge */}
          <div className="inline-block border-2 border-black bg-white px-3 py-1 text-sm font-bold shadow-nb-sm mb-4">
            100% Halal · BPOM Certified
          </div>
          <h1 className="font-black text-5xl leading-tight mb-4">
            Bakso & Mie Sapi
            <br />
            Terbaik dari Bandung
          </h1>
          <p className="text-lg mb-8">
            Produsen mie basah, bakso, dan sosis sapi berkualitas.
          </p>
          <div className="flex gap-4">
            <Link to="/produk">
              <Button variant="primary" className="inline-block">
                Lihat Produk
              </Button>
            </Link>

            <Link to="/kontak">
              <Button variant="secondary" className="inline-block">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>

        {/* KANAN - Gambar */}
        <div className="w-1/2 h-125 bg-gray-200 border-2 border-black shadow-nb flex items-center justify-center">
          <p className="text-gray-400 font-semibold">Foto Produk</p>
        </div>
      </section>

      <section className="px-16 py-12 bg-white">
        <div className="grid grid-cols-4 gap-6">
          {keunggulan.map((item) => (
            <Card key={item.title} className="p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-black text-lg mb-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="px-16 py-12">
        {/* Heading section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-black text-3xl">Produk Unggulan</h2>
          <Link to="/produk" className="font-semibold underline">
            Lihat Semua →
          </Link>
        </div>

        {/* Loading state */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {product
              .filter((p) => p.is_featured === 1)
              .slice(0, 3)
              .map((p) => (
                <Card key={p.id} className="overflow-hidden">
                  {/* Foto */}
                  <div className="w-full h-48 bg-gray-200 border-b-2 border-black flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Foto Produk</p>
                  </div>

                  {/* Info produk */}
                  <div className="p-4">
                    <h3 className="font-black text-lg mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Rp {Number(p.price).toLocaleString('id-ID')}
                    </p>
                    <Link to={`/produk/${p.slug}`}>
                      <Button variant="primary" className="w-full text-sm">
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
