import { useState } from 'react';
import { Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import { InputOtp } from '@heroui/input-otp';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleComplete = async (value?: string) => {
    if (!value) return;

    setPin(value);
    setError('');

    const success = await login(value);
    if (!success){ 
      setError('Invalid access code. Please try again.');
      setPin(''); // Clear the input
    }
  };

  const handleValueChange = (value: string) => {
    setPin(value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold">Access Dashboard</h1>
          <p className="text-default-600 mt-2">Enter your access code</p>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <InputOtp
            length={6}
            variant="flat"
            value={pin}
            onValueChange={handleValueChange}
            onComplete={handleComplete}
            isDisabled={loading}
            isInvalid={!!error}
            errorMessage={error}
            allowedKeys="^[A-Z0-9]*$"
            autoFocus
            type="password"
          />

          {loading && (
            <div className="flex items-center space-x-2">
              <Spinner size="sm" />
              <span className="text-sm text-default-600">Verifying...</span>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-default-500">
          <p>Enter your PIN to access the dashboard</p>
        </div>

        <div className="text-center text-xs text-default-400 border-t pt-4">
          <p>Don't have an access code?</p>
          <p className="mt-1">
            Contact:{' '}
            <a 
              href="mailto:juan.ibanez@bewe.io" 
              className="text-primary hover:underline"
            >
              juan.ibanez@bewe.io
            </a>
            {', '}
            <a 
              href="mailto:cesar.insuasty@bewe.io" 
              className="text-primary hover:underline"
            >
              cesar.insuasty@bewe.io
            </a>
            {' '}or{' '}
            <a 
              href="mailto:technology@bewe.io" 
              className="text-primary hover:underline"
            >
              technology@bewe.io
            </a>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};