import { useState } from 'react';
import Button from '../../components/Button.jsx';
import contactService from '../../services/contactService.js';

const Kontak = () => {
  const [form, setForm] = useState({
    name: '',
    business_name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await contactService.create(form);
      setSuccess(true);
      setForm({
        name: '',
        business_name: '',
        phone: '',
        email: '',
        city: '',
        message: '',
      });
    } catch (err) {
      setError('Gagal mengirim pesan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 lg:px-16 py-12">
      <h1 className="font-black text-4xl mb-4">Kontak Kami</h1>
      <p className="text-gray-600 mb-12 max-w-xl">
        Ada pertanyaan atau mau jadi mitra? Isi form di bawah dan kami akan
        segera menghubungi kamu.
      </p>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* FORM */}
        <div className="flex-1">
          {success ? (
            <div className="border-2 border-black bg-primary p-6 shadow-nb">
              <h2 className="font-black text-xl mb-2">Pesan terkirim! 🎉</h2>
              <p className="text-sm mb-4">
                Terima kasih! Kami akan segera menghubungi kamu.
              </p>
              <Button variant="secondary" onClick={() => setSuccess(false)}>
                Kirim pesan lagi
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Nama */}
              <div>
                <label className="font-bold text-sm block mb-1">Nama *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white"
                  placeholder="Nama kamu"
                />
              </div>

              {/* Nama Bisnis */}
              <div>
                <label className="font-bold text-sm block mb-1">
                  Nama Bisnis <span className="text-gray-400">(opsional)</span>
                </label>
                <input
                  type="text"
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange}
                  className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white"
                  placeholder="Nama cafe/resto/usaha kamu"
                />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-sm block mb-1">
                    No. HP *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="font-bold text-sm block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white"
                    placeholder="email@kamu.com"
                  />
                </div>
              </div>

              {/* Kota */}
              <div>
                <label className="font-bold text-sm block mb-1">Kota *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white"
                  placeholder="Kota kamu"
                />
              </div>

              {/* Pesan */}
              <div>
                <label className="font-bold text-sm block mb-1">Pesan *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white resize-none"
                  placeholder="Tulis pesanmu di sini..."
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm font-semibold">{error}</p>
              )}

              {/* Submit */}
              <Button variant="primary" className="w-full">
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </form>
          )}
        </div>

        {/* INFO KONTAK */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="border-2 border-black p-6 shadow-nb bg-white">
            <h3 className="font-black text-lg mb-4">Yen Factory BKR</h3>
            <p className="text-sm mb-1">
              📍 Komp. Puri BKR Kav 61 Regol, Bandung
            </p>
            <p className="text-sm mb-1">🕐 Jam Buka: 07.00 – 17.00</p>
            <p className="text-sm">📞 08972078800</p>
          </div>
          <div className="border-2 border-black p-6 shadow-nb bg-white">
            <h3 className="font-black text-lg mb-4">Meatball Factory Yen</h3>
            <p className="text-sm mb-1">
              📍 Jl. Pasirkaliki 106 Cicendo, Bandung
            </p>
            <p className="text-sm mb-1">🕐 Jam Buka: 08.00 – 20.00</p>
            <p className="text-sm">📞 085100805080</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
