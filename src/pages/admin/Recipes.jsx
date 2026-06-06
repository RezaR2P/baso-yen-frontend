import { useState, useEffect } from 'react';
import recipeService from '../../services/recipeService.js';
import Button from '../../components/Button.jsx';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    title: '',
    ingredients: [''], // array dengan 1 item kosong
    steps: [''], // array dengan 1 item kosong
    is_published: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await recipeService.getAllAdmin();
      setRecipes(response.data);
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

  // Handle perubahan item di array ingredients/steps
  const handleArrayChange = (field, index, value) => {
    const newArray = [...form[field]];
    newArray[index] = value;
    setForm({ ...form, [field]: newArray });
  };

  // Tambah item baru ke array
  const handleAddItem = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  // Hapus item dari array
  const handleRemoveItem = (field, index) => {
    const newArray = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await recipeService.update(editData.id, form);
      } else {
        await recipeService.create(form);
      }
      setShowForm(false);
      setEditData(null);
      setForm({
        title: '',
        ingredients: [''],
        steps: [''],
        is_published: false,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (recipe) => {
    setEditData(recipe);
    setForm({
      title: recipe.title,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      is_published: recipe.is_published === 1,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus resep ini?')) return;
    try {
      await recipeService.delete(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-black text-3xl">Kelola Resep</h1>
        <Button
          variant="primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditData(null);
            setForm({
              title: '',
              ingredients: [''],
              steps: [''],
              is_published: false,
            });
          }}
        >
          {showForm ? 'Batal' : '+ Tambah Resep'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border-2 border-black bg-white shadow-nb p-6 mb-8">
          <h2 className="font-black text-xl mb-4">
            {editData ? 'Edit Resep' : 'Tambah Resep Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Judul */}
            <div>
              <label className="font-bold text-sm block mb-1">
                Judul Resep *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none bg-white"
                placeholder="Judul resep"
              />
            </div>

            {/* Ingredients — todo list style */}
            <div>
              <label className="font-bold text-sm block mb-2">
                Bahan-bahan *
              </label>
              <div className="flex flex-col gap-2">
                {form.ingredients.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange('ingredients', index, e.target.value)
                      }
                      className="flex-1 border-2 border-black px-4 py-2 shadow-nb-sm focus:outline-none bg-white"
                      placeholder={`Bahan ${index + 1}`}
                    />
                    {/* Tombol hapus — hanya muncul kalau lebih dari 1 item */}
                    {form.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('ingredients', index)}
                        className="px-3 py-2 border-2 border-black bg-red-200 font-bold text-sm shadow-nb-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddItem('ingredients')}
                  className="border-2 border-black px-4 py-2 font-bold text-sm shadow-nb-sm bg-white hover:bg-gray-50 text-left"
                >
                  + Tambah Bahan
                </button>
              </div>
            </div>

            {/* Steps — todo list style */}
            <div>
              <label className="font-bold text-sm block mb-2">
                Langkah Memasak *
              </label>
              <div className="flex flex-col gap-2">
                {form.steps.map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="w-8 h-10 border-2 border-black bg-primary flex items-center justify-center font-black text-sm shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) =>
                        handleArrayChange('steps', index, e.target.value)
                      }
                      className="flex-1 border-2 border-black px-4 py-2 shadow-nb-sm focus:outline-none bg-white"
                      placeholder={`Langkah ${index + 1}`}
                    />
                    {form.steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('steps', index)}
                        className="px-3 py-2 border-2 border-black bg-red-200 font-bold text-sm shadow-nb-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddItem('steps')}
                  className="border-2 border-black px-4 py-2 font-bold text-sm shadow-nb-sm bg-white hover:bg-gray-50 text-left"
                >
                  + Tambah Langkah
                </button>
              </div>
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
              {editData ? 'Simpan Perubahan' : 'Tambah Resep'}
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
                  Bahan
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-black text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((r, index) => (
                <tr
                  key={r.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-3 font-semibold text-sm">{r.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {r.ingredients.length} bahan
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 border-2 border-black text-xs font-bold ${r.is_published ? 'bg-green-200' : 'bg-yellow-200'}`}
                    >
                      {r.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="px-3 py-1 border-2 border-black text-xs font-bold shadow-nb-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-white"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
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

export default Recipes;
