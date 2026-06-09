import { useState, useEffect } from 'react';
import recipeService from '../../services/recipeService';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Resep = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recipeService.getAll();
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-6 lg:px-16 py-12">
      <h1 className="font-black text-4xl mb-8">Resep Kami</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <Card key={r.id} className="overflow-hidden">
              {/* Foto */}
              <div className="w-full h-48 bg-gray-200 border-b-2 border-black flex items-center justify-center">
                {r.image_url ? (
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}${r.image_url}`}
                    alt={r.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://via.placeholder.com/300?text=No+Image';
                    }}
                  />
                ) : (
                  <p className="text-gray-400 text-sm">Tidak ada foto</p>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-black text-lg mb-3">{r.title}</h3>
                <Link to={`/resep/${r.slug}`}>
                  <Button variant="primary" className="w-full text-sm">
                    Lihat Resep
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resep;
