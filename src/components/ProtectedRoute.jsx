import { Navigate } from 'react-router-dom';
import authService from '../services/authService.js';

const ProtectedRoute = ({ children }) => {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedRoute;
