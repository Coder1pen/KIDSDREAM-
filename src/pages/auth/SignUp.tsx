import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { useAuthStore } from '../../store/useAuthStore';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Get redirect from query params
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') || '/';
  
  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    setPasswordError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    await signUp(email, password);
    
    // Check if sign up was successful (no error)
    if (!error) {
      navigate(`/${redirect}`);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-error-50 text-error-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <Input
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (confirmPassword) validatePassword();
              }}
              required
              autoComplete="new-password"
            />
            
            <Input
              id="confirm-password"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (password) validatePassword();
              }}
              required
              error={passwordError}
            />
            
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              leftIcon={<UserPlus className="h-4 w-4" />}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              to={`/signin${redirect ? `?redirect=${redirect}` : ''}`}
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};