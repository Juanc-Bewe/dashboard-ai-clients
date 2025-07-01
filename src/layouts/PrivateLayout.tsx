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
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface PrivateLayoutProps {
  children: ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const ThemeIcon = theme === 'light' ? Sun : Moon;

  return (
    <div className="min-h-scree transition-colors">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="sm:px-0"
      >
        <div className="w-full sm:container sm:mx-auto sm:px-4 flex items-center justify-between">
          {/* Brand */}
          <NavbarBrand>
            <p className="font-bold text-inherit">
              Dashboard AI Clients
            </p>
          </NavbarBrand>

          {/* Desktop Menu */}
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {/* You can add more navigation items here */}
          </NavbarContent>

          {/* Desktop Actions */}
          <NavbarContent className="hidden sm:flex" justify="end">
            <NavbarItem>
              <Button
                isIconOnly
                variant="bordered"
                onPress={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="text-default-700 border-default-300 hover:border-default-400 hover:text-default-900 dark:text-default-400 dark:border-default-100/20 dark:hover:border-default-100/40 bg-transparent"
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
              <div className="flex items-center justify-between">
                <span className="text-small text-default-500">
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </span>
                <Button
                  isIconOnly
                  variant="bordered"
                  onPress={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  className="text-default-700 border-default-300 hover:border-default-400 hover:text-default-900 dark:text-default-400 dark:border-default-100/20 dark:hover:border-default-100/40 bg-transparent"
                >
                  <ThemeIcon size={20} />
                </Button>
              </div>
              <Button
                color="danger"
                variant="flat"
                onPress={handleLogout}
                className="w-full"
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