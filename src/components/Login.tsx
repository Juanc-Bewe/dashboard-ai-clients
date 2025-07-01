import { useState } from 'react';
import { Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import { InputOtp } from '@heroui/input-otp';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleComplete = async (value?: string) => {
    if (!value) return;

    setPin(value);
    setError('');

    const success = await login(value);
    if (success) {
      navigate('/dashboard');
    } else {
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
            length={4}
            variant="flat"
            value={pin}
            onValueChange={handleValueChange}
            onComplete={handleComplete}
            isDisabled={loading}
            isInvalid={!!error}
            errorMessage={error}
            description="Enter your 4-digit access code"
            allowedKeys="^[0-9]*$"
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
      </CardBody>
    </Card>
  );
};