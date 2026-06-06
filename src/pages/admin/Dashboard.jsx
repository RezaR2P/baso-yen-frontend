import { useState, useEffect } from 'react';
import productService from '../../services/productService.js';
import recipeService from '../../services/recipeService.js';
import articleService from '../../services/articleService.js';
import contactService from '../../services/contactService.js';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    recipes: 0,
    articles: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, recipesRes, articlesRes, contactsRes] =
          await Promise.all([
            productService.getAll(),
            recipeService.getAll(),
            articleService.getAll(),
            contactService.getAll(),
          ]);
        setStats({
          products: productsRes.data.length,
          recipes: recipesRes.data.length,
          articles: articlesRes.data.length,
          contacts: contactsRes.data.length,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: 'Total Produk',
      value: stats.products,
      icon: '🥩',
      link: '/admin/products',
    },
    {
      label: 'Total Resep',
      value: stats.recipes,
      icon: '📖',
      link: '/admin/recipes',
    },
    {
      label: 'Total Artikel',
      value: stats.articles,
      icon: '📝',
      link: '/admin/articles',
    },
    {
      label: 'Pesan Masuk',
      value: stats.contacts,
      icon: '📬',
      link: '/admin/contacts',
    },
  ];

  return (
    <div>
      <h1 className="font-black text-3xl mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Selamat datang di Admin Panel Baso Yen!
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.label}
              className="border-2 border-black bg-white shadow-nb p-6"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <p className="text-sm font-semibold text-gray-500 mb-1">
                {card.label}
              </p>
              <p className="font-black text-4xl">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
