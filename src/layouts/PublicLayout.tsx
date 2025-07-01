import type { ReactNode } from 'react';
import { Card, CardBody } from '@heroui/react';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        <Card className="transition-colors">
          <CardBody className="p-6">
            {children}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};