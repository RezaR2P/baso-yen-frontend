import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import articleService from '../../services/articleService.js';
import Card from '../../components/Card.jsx';
import Button from '../../components/Button.jsx';

const stripHtml = (html) => html.replace(/<[^>]*>/g, '');

const Artikel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await articleService.getAll();
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-6 lg:px-16 py-12">
      <h1 className="font-black text-4xl mb-8">Artikel</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Card key={a.id} className="overflow-hidden">
              {/* Thumbnail */}
              <div className="w-full h-48 bg-gray-200 border-b-2 border-black flex items-center justify-center">
                {a.thumbnail_url ? (
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}${a.thumbnail_url}`}
                    alt={a.title}
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
                <h3 className="font-black text-lg mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                  {stripHtml(a.content).slice(0, 100)}...
                </p>
                <Link to={`/artikel/${a.slug}`}>
                  <Button variant="primary" className="w-full text-sm">
                    Baca Selengkapnya
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

export default Artikel;
