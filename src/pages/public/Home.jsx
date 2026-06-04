import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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

  const testimoni = [
    {
      id: 1,
      quote: 'Makan yamien enak nggak perlu repot, tinggal beli di baso Yen!',
      name: 'Reza',
      jabatan: 'CEO MBG',
    },
    {
      id: 2,
      quote: 'Makan yamien enak nggak perlu repot, tinggal beli di baso Yen!',
      name: 'Reza',
      jabatan: 'CEO MBG',
    },
    {
      id: 3,
      quote: 'Makan yamien enak nggak perlu repot, tinggal beli di baso Yen!',
      name: 'Reza',
      jabatan: 'CEO MBG',
    },
    {
      id: 5,
      quote: 'Makan yamien enak nggak perlu repot, tinggal beli di baso Yen!',
      name: 'Reza',
      jabatan: 'CEO MBG',
    },
    {
      id: 6,
      quote: 'Makan yamien enak nggak perlu repot, tinggal beli di baso Yen!',
      name: 'Reza',
      jabatan: 'CEO MBG',
    },
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
      {/* ===== HERO ===== */}
      <section className="flex flex-col-reverse lg:flex-row justify-between items-center px-6 lg:px-16 py-12 lg:py-20 gap-8">
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
        <div className="w-full lg:w-1/2 h-64 lg:h-125 bg-gray-200 border-2 border-black shadow-nb flex items-center justify-center">
          <p className="text-gray-400 font-semibold">Foto Produk</p>
        </div>
      </section>

      {/* ===== KEUNGGULAN ===== */}
      <section className="px-6 lg:px-16 py-12 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keunggulan.map((item) => (
            <Card key={item.title} className="p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-black text-lg mb-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== PRODUK UNGGULAN ===== */}
      <section className="px-6 lg:px-16 py-12">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ===== TESTIMONI ===== */}
      <section className="px-6 lg:px-16 py-12 bg-white">
        <h2 className="font-black text-3xl mb-8">Kata Mereka</h2>
        <div className="px-1 py-2">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="pb-2 px-1"
            breakpoints={{
              640: { slidesPerView: 2 },
            }}
            slidesPerView={1}
          >
            {testimoni.map((t) => (
              <SwiperSlide key={t.id}>
                <Card className="p-6 flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-full bg-primary border-2 border-black flex items-center justify-center font-black text-3xl shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm italic mb-3">"{t.quote}"</p>
                    <h3 className="font-black">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.jabatan}</p>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== CTA MITRA ===== */}
      <section className="bg-primary border-y-2 border-black px-16 py-12 flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* KIRI */}
        <div>
          <h2 className="font-black text-3xl mb-2">
            Tertarik jadi mitra bisnis?
          </h2>
          <p className="text-sm">
            Reseller, cafe, resto, hotel — kami siap melayani
          </p>
        </div>

        {/* KANAN */}
        <Link to="/kontak">
          <Button variant="secondary">Request Sampel</Button>
        </Link>
      </section>
    </>
  );
};

export default Home;
