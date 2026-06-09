import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeService from '../../services/recipeService.js';
import Button from '../../components/Button.jsx';

const ResepDetail = () => {
  const { slug } = useParams(); // ambil slug dari URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeService.getBySlug(slug);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [slug]);

  if (loading) return <p className="px-6 lg:px-16 py-12">Loading...</p>;
  if (!recipe)
    return <p className="px-6 lg:px-16 py-12">Resep tidak ditemukan.</p>;

  return (
    <div className="px-6 lg:px-16 py-12">
      {/* Tombol kembali */}
      <Link to="/resep" className="font-semibold underline mb-8 inline-block">
        ← Kembali ke Resep
      </Link>

      {/* Foto + Judul */}
      <div className="flex flex-col lg:flex-row gap-12 mt-6 mb-12">
        {/* Foto */}
        <div className="w-full lg:w-96 h-64 lg:h-96 bg-gray-200 border-2 border-black shadow-nb flex items-center justify-center shrink-0">
          {recipe.image_url ? (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${recipe.image_url}`}
              alt={recipe.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300?text=No+Image';
              }}
            />
          ) : (
            <p className="text-gray-400 text-sm">Tidak ada foto</p>
          )}
        </div>

        {/* Judul + Info — TARUH DI SINI */}
        <div className="flex-1">
          <h1 className="font-black text-4xl mb-4">{recipe.title}</h1>
          <div className="flex gap-4 mb-6">
            <div className="border-2 border-black px-4 py-2 shadow-nb-sm">
              <p className="text-xs font-bold uppercase">Bahan</p>
              <p className="font-black">{recipe.ingredients.length} item</p>
            </div>
            <div className="border-2 border-black px-4 py-2 shadow-nb-sm">
              <p className="text-xs font-bold uppercase">Langkah</p>
              <p className="font-black">{recipe.steps.length} langkah</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Resep spesial dari Baso Yen — mudah dibuat di rumah!
          </p>
          <Link to="/kontak">
            <Button variant="primary">Tanya Resep Lainnya</Button>
          </Link>
        </div>
      </div>

      {/* Bahan-bahan */}
      <div className="mb-8">
        <h2 className="font-black text-2xl mb-4">Bahan-bahan</h2>
        <ul className="flex flex-col gap-2">
          {recipe.ingredients.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-6 h-6 bg-primary border-2 border-black flex items-center justify-center font-black text-xs shrink-0">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Langkah memasak */}
      <div>
        <h2 className="font-black text-2xl mb-4">Langkah Memasak</h2>
        <ol className="flex flex-col gap-4">
          {recipe.steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-black shrink-0">
                {index + 1}
              </span>
              <p className="pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ResepDetail;
