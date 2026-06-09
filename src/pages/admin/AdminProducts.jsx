import { useState, useEffect } from 'react';
import productService from '../../services/productService.js';
import categoryService from '../../services/categoryService.js';
import Button from '../../components/Button.jsx';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    is_featured: false,
    is_active: true,
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getAllAdmin(),
        categoryService.getAll(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
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
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await productService.update(editData.id, form);
      } else {
        await productService.create(form);
      }
      setShowForm(false);
      setEditData(null);
      setForm({
        name: '',
        category_id: '',
        description: '',
        price: '',
        is_featured: false,
        is_active: true,
        image: null,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setEditData(product);
    setForm({
      name: product.name,
      category_id: product.category_id,
      description: product.description,
      price: product.price,
      is_featured: product.is_featured === 1,
      is_active: product.is_active === 1,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus produk ini?')) return;
    try {
      await productService.delete(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-black text-3xl">Kelola Produk</h1>
        <Button
          variant="primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditData(null);
            setForm({
              name: '',
              category_id: '',
              description: '',
              price: '',
              is_featured: false,
              is_active: true,
              image: null,
            });
          }}
        >
          {showForm ? 'Batal' : '+ Tambah Produk'}
        </Button>
      </div>

      {/* Form Tambah/Edit */}
      {showForm && (
        <div className="border-2 border-black bg-white shadow-nb p-6 mb-8">
          <h2 className="font-black text-xl mb-4">
            {editData ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Nama */}
            <div>
              <label className="font-bold text-sm block mb-1">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white"
                placeholder="Nama produk"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="font-bold text-sm block mb-1">Kategori *</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                required
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white"
              >
                <option value="">Pilih kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Harga */}
            <div>
              <label className="font-bold text-sm block mb-1">Harga</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white"
                placeholder="25000"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="font-bold text-sm block mb-1">Deskripsi</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white"
                placeholder="Deskripsi produk"
              />
            </div>

            {/* Foto */}
            <div>
              <label className="font-bold text-sm block mb-1">
                Foto Produk
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, PNG, WebP. Maks 2MB
              </p>
            </div>

            {/* Checkbox */}
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 font-semibold text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Tampilkan di Home
              </label>
              <label className="flex items-center gap-2 font-semibold text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Aktif
              </label>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <Button variant="primary" className="w-full">
                {editData ? 'Simpan Perubahan' : 'Tambah Produk'}
              </Button>
            </div>
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
                <th className="text-left px-4 py-3 font-black text-sm">
                  Kategori
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">
                  Harga
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={p.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-3 font-semibold text-sm">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {categories.find((c) => c.id === p.category_id)?.name ||
                      '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    Rp {Number(p.price).toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 border-2 border-black text-xs font-bold ${p.is_active ? 'bg-green-200' : 'bg-red-200'}`}
                    >
                      {p.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 border-2 border-black text-xs font-bold shadow-nb-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-white"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
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

export default AdminProducts;
