import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './components/Login';
import { PublicLayout } from './layouts/PublicLayout';
import { PrivateLayout } from './layouts/PrivateLayout';
import { Dashboard } from './pages/Dashboard';
import { DataManagement } from './pages/DataManagement';

// Component to handle authenticated users trying to access login
const LoginGuard: React.FC = () => {
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

// Main App Content that needs theme context
const AppContent = () => {
  const { theme } = useTheme();

  return (
    <HeroUIProvider className={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Route - Login */}
            <Route path="/login" element={<LoginGuard />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PrivateLayout>
                    <Dashboard />
                  </PrivateLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/data-management"
              element={
                <ProtectedRoute>
                  <PrivateLayout>
                    <DataManagement />
                  </PrivateLayout>
                </ProtectedRoute>
              }
            />
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HeroUIProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
