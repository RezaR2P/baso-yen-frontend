import { useState, useEffect } from 'react';
import articleService from '../../services/articleService.js';
import Button from '../../components/Button.jsx';

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    is_published: false,
    thumbnail: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await articleService.getAllAdmin();
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await articleService.update(editData.id, form);
      } else {
        await articleService.create(form);
      }
      setShowForm(false);
      setEditData(null);
      setForm({ title: '', content: '', is_published: false, thumbnail: null });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (article) => {
    setEditData(article);
    setForm({
      title: article.title,
      content: article.content,
      is_published: article.is_published === 1,
      thumbnail: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus artikel ini?')) return;
    try {
      await articleService.delete(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-black text-3xl">Kelola Artikel</h1>
        <Button
          variant="primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditData(null);
            setForm({
              title: '',
              content: '',
              is_published: false,
              thumbnail: null,
            });
          }}
        >
          {showForm ? 'Batal' : '+ Tambah Artikel'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border-2 border-black bg-white shadow-nb p-6 mb-8">
          <h2 className="font-black text-xl mb-4">
            {editData ? 'Edit Artikel' : 'Tambah Artikel Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Judul */}
            <div>
              <label className="font-bold text-sm block mb-1">
                Judul Artikel *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white"
                placeholder="Judul artikel"
              />
            </div>

            {/* Content — textarea biasa dulu, nanti bisa upgrade ke TipTap */}
            <div>
              <label className="font-bold text-sm block mb-1">Konten *</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={10}
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white resize-none font-mono text-sm"
                placeholder="Tulis konten artikel di sini... (bisa pakai HTML tag seperti <h2>, <p>, <ul>, <li>)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tips: bisa pakai HTML tag seperti &lt;h2&gt;, &lt;p&gt;,
                &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;
              </p>
            </div>

            {/* Input file di form */}
            <div>
              <label className="font-bold text-sm block mb-1">
                Thumbnail Artikel
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm bg-white"
              />
            </div>

            {/* Publish */}
            <label className="flex items-center gap-2 font-semibold text-sm cursor-pointer">
              <input
                type="checkbox"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Publish (tampilkan di website)
            </label>

            <Button variant="primary" className="w-full">
              {editData ? 'Simpan Perubahan' : 'Tambah Artikel'}
            </Button>
          </form>
        </div>
      )}

      {/* Tabel */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="border-2 border-black bg-white shadow-nb overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary border-b-2 border-black">
              <tr>
                <th className="text-left px-4 py-3 font-black text-sm">
                  Judul
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">
                  Tanggal
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, index) => (
                <tr
                  key={a.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-3 font-semibold text-sm">{a.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 border-2 border-black text-xs font-bold ${a.is_published ? 'bg-green-200' : 'bg-yellow-200'}`}
                    >
                      {a.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(a.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="px-3 py-1 border-2 border-black text-xs font-bold shadow-nb-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-white"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="px-3 py-1 border-2 border-black text-xs font-bold shadow-nb-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-red-200"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
