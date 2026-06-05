import { Link } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';

const Layanan = () => {
  const layanan = [
    {
      id: 1,
      type: 'B2C',
      title: 'Untuk Konsumen',
      desc: 'Beli produk Baso Yen untuk kebutuhan sehari-hari. Tersedia di toko offline dan online kami.',
      keuntungan: [
        'Produk segar setiap hari',
        'Harga terjangkau',
        'Tersedia di Shopee & Tokopedia',
        'Bisa beli di toko langsung',
      ],
      cta: 'Beli Sekarang',
      link: 'https://shopee.co.id/miebasososisyen',
      external: true,
    },
    {
      id: 2,
      type: 'B2B',
      title: 'Untuk Bisnis',
      desc: 'Solusi lengkap untuk cafe, restoran, hotel, dan katering. Harga grosir dengan kualitas terjamin.',
      keuntungan: [
        'Harga grosir kompetitif',
        'Pengiriman rutin terjadwal',
        'Produk custom sesuai kebutuhan',
        'Dukungan konsultasi menu',
      ],
      cta: 'Hubungi Kami',
      link: '/kontak',
      external: false,
    },
  ];

  return (
    <div className="px-6 lg:px-16 py-12">
      {/* Heading */}
      <h1 className="font-black text-4xl mb-4">Layanan Kami</h1>
      <p className="text-gray-600 mb-12 max-w-xl">
        Baso Yen melayani kebutuhan individu maupun bisnis dengan produk
        berkualitas tinggi.
      </p>

      {/* Grid Layanan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {layanan.map((l) => (
          <Card key={l.id} className="p-8">
            {/* Badge type */}
            <div className="inline-block border-2 border-black bg-primary px-3 py-1 text-sm font-black shadow-nb-sm mb-4">
              {l.type}
            </div>

            {/* Judul + Deskripsi */}
            <h2 className="font-black text-2xl mb-3">{l.title}</h2>
            <p className="text-gray-600 mb-6">{l.desc}</p>

            {/* List keuntungan */}
            <ul className="flex flex-col gap-3 mb-8">
              {l.keuntungan.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-primary border-2 border-black flex items-center justify-center font-black text-xs shrink-0">
                    ✓
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* Tombol */}
            {l.external ? (
              <a href={l.link} target="_blank" rel="noreferrer">
                <Button variant="primary">{l.cta}</Button>
              </a>
            ) : (
              <Link to={l.link}>
                <Button variant="primary">{l.cta}</Button>
              </Link>
            )}
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-primary border-2 border-black shadow-nb p-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="font-black text-2xl mb-2">Masih ada pertanyaan?</h2>
          <p className="text-sm">Tim kami siap membantu kamu 24/7</p>
        </div>
        <Link to="/kontak">
          <Button variant="secondary">Hubungi Kami</Button>
        </Link>
      </div>
    </div>
  );
};

export default Layanan;
