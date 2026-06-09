import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import articleService from '../../services/articleService.js';

const ArtikelDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await articleService.getBySlug(slug);
        setArticle(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <p className="px-6 lg:px-16 py-12">Loading...</p>;
  if (!article)
    return <p className="px-6 lg:px-16 py-12">Artikel tidak ditemukan.</p>;

  return (
    <div className="px-6 lg:px-16 py-12 max-w-4xl mx-auto">
      {/* Tombol kembali */}
      <Link to="/artikel" className="font-semibold underline mb-8 inline-block">
        ← Kembali ke Artikel
      </Link>

      {/* Thumbnail */}
      <div className="w-full h-64 lg:h-96 bg-gray-200 border-2 border-black shadow-nb flex items-center justify-center mt-6 mb-8">
        {article.thumbnail_url ? (
          <img
            src={`${import.meta.env.VITE_SERVER_URL}${article.thumbnail_url}`}
            alt={article.title}
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

      {/* Judul */}
      <h1 className="font-black text-4xl mb-4">{article.title}</h1>

      {/* Tanggal */}
      <p className="text-sm text-gray-500 mb-8">
        {new Date(article.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      {/* Konten HTML */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArtikelDetail;
