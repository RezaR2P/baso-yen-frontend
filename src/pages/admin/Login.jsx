import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import authService from '../../services/authService.js';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Email atau password salah!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-black text-4xl mb-2">Baso Yen</h1>
          <p className="text-gray-600">Admin Panel</p>
        </div>

        {/* Form */}
        <div className="border-2 border-black bg-white shadow-nb p-8">
          <h2 className="font-black text-2xl mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="font-bold text-sm block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white"
                placeholder="admin@basoyen.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-bold text-sm block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-2 border-black px-4 py-3 shadow-nb-sm focus:outline-none focus:shadow-nb bg-white"
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}

            {/* Submit */}
            <Button variant="primary" className="w-full mt-2">
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
