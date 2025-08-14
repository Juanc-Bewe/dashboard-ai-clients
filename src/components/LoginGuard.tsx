import { Navigate, useLocation} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PublicLayout } from '../layouts/PublicLayout';
import { Login } from './Login';

// Component to handle authenticated users trying to access login
export const LoginGuard: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const redirectTo = location.state?.from || '/dashboard';

  // Show loading while checking for existing token/cookie
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is already authenticated (has valid cookie), redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is not authenticated, show login page
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
};