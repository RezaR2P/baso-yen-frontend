import { useState, useEffect } from 'react';
import productService from '../../services/productService.js';
import categoryService from '../../services/categoryService.js';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import { Link } from 'react-router-dom';

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productService.getAll(),
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
    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((p) => p.category_id === selectedCategory);

  return (
    <div className="px-16 py-12">
      {/* Heading */}
      <h1 className="font-black text-4xl mb-8">Produk Kami</h1>

      {/* Filter Kategori */}
      <div className="flex gap-3 mb-8">
        <Button
          variant={selectedCategory === null ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory(null)}
        >
          Semua
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? 'primary' : 'secondary'}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Grid Produk */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="font-semibold">Tidak ada produk di kategori ini.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="w-full h-48 bg-gray-200 border-b-2 border-black flex items-center justify-center">
                <p className="text-gray-400 text-sm">Foto Produk</p>
              </div>
              <div className="p-4">
                <h3 className="font-black text-lg mb-1">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Rp {Number(p.price).toLocaleString('id-ID')}
                </p>
                <Link to={`/produk/${p.slug}`}>
                  <Button variant="primary" className="w-full text-sm">
                    Lihat Detail
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

export default Produk;
