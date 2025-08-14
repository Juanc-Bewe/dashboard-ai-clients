import type { ReactNode } from 'react';
import { 
  Button, 
  Card,
  CardBody,
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@heroui/react';
import { useState } from 'react';
import { Sun, Moon, BarChart3, Table, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface PrivateLayoutProps {
  children: ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const ThemeIcon = theme === 'light' ? Sun : Moon;

  const navigationItems = [
    {
      key: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/dashboard',
      description: 'Performance metrics and insights'
    },
    {
      key: 'conversation-analytics',
      label: 'Conversations',
      icon: MessageSquare,
      path: '/conversation-analytics',
      description: 'Conversation metrics and analytics'
    },
    {
      key: 'data-management',
      label: 'Data Management',
      icon: Table,
      path: '/data-management',
      description: 'Manage and explore your data'
    }
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen transition-colors">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="sm:px-0"
      >
        <div className="w-full sm:container sm:mx-auto sm:px-4 flex items-center justify-between">
          {/* Brand */}
          <NavbarBrand className="flex-shrink-0">
            <p className="font-bold text-inherit">
              Dashboard AI Clients
            </p>
          </NavbarBrand>

          {/* Desktop Menu - Centered Navigation */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="flex items-center bg-default-100 rounded-lg p-1 gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <Button
                    key={item.key}
                    variant={isActive ? "solid" : "light"}
                    color={isActive ? "primary" : "default"}
                    startContent={<Icon size={16} />}
                    onPress={() => navigate(item.path)}
                    className={`
                      h-9 px-4 text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-default-600 hover:text-default-900 hover:bg-default-200'
                      }
                    `}
                    radius="md"
                  >
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Desktop Actions */}
          <NavbarContent className="hidden sm:flex flex-shrink-0" justify="end">
            <NavbarItem>
              <Button
                isIconOnly
                variant="light"
                onPress={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="text-default-500 hover:text-default-700 hover:bg-default-100"
                radius="md"
              >
                <ThemeIcon size={20} />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="danger"
                variant="flat"
                onPress={handleLogout}
                size="sm"
                radius="md"
              >
                Logout
              </Button>
            </NavbarItem>
          </NavbarContent>

          {/* Mobile Menu Toggle */}
          <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>
        </div>

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem>
            <div className="flex flex-col gap-4 pt-4">
              {/* Mobile Navigation */}
              <div className="flex flex-col gap-2">
                <span className="text-small text-default-500 font-medium">Navigation</span>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;

                  return (
                    <Button
                      key={item.key}
                      variant={isActive ? "solid" : "light"}
                      color={isActive ? "primary" : "default"}
                      startContent={<Icon size={18} />}
                      onPress={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                      className="justify-start h-12"
                      radius="md"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-xs text-default-400">{item.description}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>

              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-default-200">
                <span className="text-small text-default-500">
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </span>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  className="text-default-500 hover:text-default-700 hover:bg-default-100"
                  radius="md"
                >
                  <ThemeIcon size={20} />
                </Button>
              </div>

              {/* Mobile Logout */}
              <Button
                color="danger"
                variant="flat"
                onPress={handleLogout}
                className="w-full"
                radius="md"
              >
                Logout
              </Button>
            </div>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <main className="w-full px-2 py-4 sm:container sm:mx-auto sm:px-4 sm:py-8 transition-colors">
        <Card className="min-h-[calc(100vh-12rem)] transition-colors">
          <CardBody className="p-3 sm:p-6">
            {children}
          </CardBody>
        </Card>
      </main>
    </div>
  );
};