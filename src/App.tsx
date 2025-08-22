import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AddonManagementProvider } from './contexts/AddonManagementContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginGuard } from './components/LoginGuard';
import { PrivateLayout } from './layouts/PrivateLayout';
import { Dashboard } from './pages/Dashboard';
import { AddonManagement } from './pages/AddonManagement';
import { NewDashboard } from './pages/NewDashboard';


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
                    <AddonManagementProvider>
                      <AddonManagement />
                    </AddonManagementProvider>
                  </PrivateLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-dashboard"
              element={
                <ProtectedRoute>
                  <PrivateLayout>
                    <NewDashboard />
                  </PrivateLayout>
                </ProtectedRoute>
              }
            />
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/new-dashboard" replace />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/new-dashboard" replace />} />
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
