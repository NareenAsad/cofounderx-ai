"use client"
import { useState } from 'react';
import { PasswordInput } from '@/components/PAsswordInput';
import { toast } from 'sonner';
import '../../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginPageProps {
  onNavigateToSignup: () => void;
  onLoginSuccess: () => void;
}

export default function LoginPage({ onNavigateToSignup, onLoginSuccess }: LoginPageProps) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Login:', { email, password });
    router.push('/dashboard');
    // Show success toast
    toast.success('Logged in successfully!', {
      duration: 2000,
    });
    
    setIsLoading(false);
    
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            required
          />

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <Link href={'/signup'} className="footer-text">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="link-button"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}