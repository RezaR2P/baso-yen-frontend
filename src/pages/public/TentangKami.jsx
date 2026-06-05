import { Link } from 'react-router-dom';
import Button from '../../components/Button.jsx';

const TentangKami = () => {
  const timeline = [
    {
      tahun: '2000',
      desc: 'Baso Yen berdiri di Bandung dengan produk bakso sapi pertama.',
    },
    { tahun: '2005', desc: 'Membuka toko kedua di Jl. Pasirkaliki, Bandung.' },
    { tahun: '2010', desc: 'Mendapatkan sertifikasi Halal MUI dan izin BPOM.' },
    {
      tahun: '2015',
      desc: 'Ekspansi produk — mie keriting, sosis sapi, dan paket lengkap.',
    },
    { tahun: '2020', desc: 'Membuka toko online di Shopee dan Tokopedia.' },
    {
      tahun: '2024',
      desc: 'Melayani lebih dari 500 mitra bisnis se-Indonesia.',
    },
  ];

  const sertifikasi = [
    { nama: 'Halal MUI', desc: 'Produk terjamin halal' },
    { nama: 'BPOM', desc: 'Aman untuk dikonsumsi' },
    { nama: 'ISO 9001', desc: 'Standar kualitas internasional' },
  ];

  return (
    <div className="px-6 lg:px-16 py-12">
      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center">
        <div className="flex-1">
          <div className="inline-block border-2 border-black bg-primary px-3 py-1 text-sm font-black shadow-nb-sm mb-4">
            Sejak 2000
          </div>
          <h1 className="font-black text-4xl lg:text-5xl mb-4">
            Tentang <br />
            Baso Yen
          </h1>
          <p className="text-gray-600 mb-6">
            Pabrik Mie, Baso, dan Sosis Yen adalah produsen produk olahan daging
            sapi berkualitas yang berpusat di Bandung. Kami melayani kebutuhan
            sehari-hari maupun keperluan bisnis dengan standar kualitas tinggi.
          </p>
          <Link to="/kontak">
            <Button variant="primary">Hubungi Kami</Button>
          </Link>
        </div>
        <div className="w-full lg:w-96 h-64 lg:h-96 bg-gray-200 border-2 border-black shadow-nb flex items-center justify-center shrink-0">
          <p className="text-gray-400 font-semibold">Foto Pabrik</p>
        </div>
      </div>

      {/* SERTIFIKASI */}
      <div className="mb-16">
        <h2 className="font-black text-3xl mb-8">Sertifikasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sertifikasi.map((s) => (
            <div
              key={s.nama}
              className="border-2 border-black p-6 shadow-nb bg-white text-center"
            >
              <div className="text-4xl mb-3">🏅</div>
              <h3 className="font-black text-lg mb-1">{s.nama}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mb-16">
        <h2 className="font-black text-3xl mb-8">Perjalanan Kami</h2>
        <div className="flex flex-col gap-4">
          {timeline.map((t) => (
            <div key={t.tahun} className="flex gap-6 items-start">
              <div className="w-20 shrink-0 border-2 border-black bg-primary px-3 py-2 text-center shadow-nb-sm">
                <span className="font-black text-sm">{t.tahun}</span>
              </div>
              <div className="flex-1 border-2 border-black p-4 shadow-nb-sm bg-white">
                <p className="text-sm">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary border-2 border-black shadow-nb p-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="font-black text-2xl mb-2">Mau jadi mitra kami?</h2>
          <p className="text-sm">Bergabung dengan 500+ mitra bisnis Baso Yen</p>
        </div>
        <Link to="/kontak">
          <Button variant="secondary">Mulai Sekarang</Button>
        </Link>
      </div>
    </div>
  );
};

export default TentangKami;
