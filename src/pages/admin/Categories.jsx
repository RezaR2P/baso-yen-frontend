import { useState, useEffect } from 'react';
import categoryService from '../../services/categoryService.js';
import Button from '../../components/Button.jsx';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await categoryService.update(editData.id, form);
      } else {
        await categoryService.create(form);
      }
      setShowForm(false);
      setEditData(null);
      setForm({ name: '' });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    setEditData(category);
    setForm({ name: category.name });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus kategori ini?')) return;
    try {
      await categoryService.delete(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-black text-3xl">Kelola Kategori</h1>
        <Button
          variant="primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditData(null);
            setForm({ name: '' });
          }}
        >
          {showForm ? 'Batal' : '+ Tambah Kategori'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border-2 border-black bg-white shadow-nb p-6 mb-8">
          <h2 className="font-black text-xl mb-4">
            {editData ? 'Edit Kategori' : 'Tambah Kategori Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="flex-1 border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white"
              placeholder="Nama kategori"
            />
            <Button variant="primary">{editData ? 'Simpan' : 'Tambah'}</Button>
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
                <th className="text-left px-4 py-3 font-black text-sm">Nama</th>
                <th className="text-left px-4 py-3 font-black text-sm">Slug</th>
                <th className="text-left px-4 py-3 font-black text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-3 font-semibold text-sm">
                    {cat.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="px-3 py-1 border-2 border-black text-xs font-bold shadow-nb-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-white"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
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

export default Categories;
