import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productService from '../../services/productService.js';
import Button from '../../components/Button.jsx';

const ProdukDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getBySlug(slug);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <p className="px-6 lg:px-16 py-12">Loading...</p>;
  if (!product)
    return <p className="px-6 lg:px-16 py-12">Produk tidak ditemukan.</p>;

  return (
    <div className="px-6 lg:px-16 py-12">
      {/* Tombol kembali */}
      <Link to="/produk" className="font-semibold underline mb-8 inline-block">
        ← Kembali ke Produk
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 mt-6">
        {/* KIRI - Foto */}
        <div className="w-full lg:w-96 h-64 lg:h-96 bg-gray-200 border-2 border-black shadow-nb flex items-center justify-center shrink-0 overflow-hidden">
          {product.image_url ? (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${product.image_url}`}
              alt={product.name}
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

        {/* KANAN - Info */}
        <div className="flex-1">
          <h1 className="font-black text-4xl mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">
            Rp {Number(product.price).toLocaleString('id-ID')}
          </p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <Link to="/kontak">
            <Button variant="primary">Hubungi Kami</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProdukDetail;
