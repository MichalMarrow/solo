import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // toggle login/register

  // Google OAuth login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:3001/google-login', {
        token: credentialResponse.credential,
      });

      if (res && res.data.user._id) {
        console.log('Google login successful:', res.data);
        localStorage.setItem('userId', res.data.user._id);
        navigate('/vitals');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed');
    }
  };

  // Regular login
  const handleRegularLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      localStorage.setItem('userId', res.data.userId);
      console.log('Login response:', res.data);
      localStorage.setItem('authToken', res.data.authToken);
      navigate('/vitals');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
    }
  };

  // Registration handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });
      localStorage.setItem('userId', res.data.userId);
      console.log('Registration successful:', res.data);
      navigate('/vitals');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Username may already be taken or registration failed.');
    }
  };

  return (
    <div className='login-container'>
      <h1 className='app-title'>CheckYourHealth</h1>
      <div className='login-box'>
        <form onSubmit={isRegistering ? handleRegister : handleRegularLogin}>
          <h3>
            {isRegistering
              ? 'Create an Account'
              : 'Login with Username & Password'}
          </h3>
          <input
            type='text'
            placeholder='Username'
            className='form-control mb-2'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            className='form-control mb-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='btn btn-primary w-100'>
            {isRegistering ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className='text-center my-2'>
          <button
            className='btn btn-link'
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? 'Already have an account? Login'
              : 'New here? Create an account'}
          </button>
        </div>

        <div className='text-center my-3'>or</div>

        <div className='google-login-wrapper'>
          <GoogleOAuthProvider clientId='727214915174-f8gb1jlgfhsk5j349sv384lt4al8qp14.apps.googleusercontent.com'>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setError('Google login failed')}
            />
          </GoogleOAuthProvider>
        </div>

        {error && <div className='text-danger mt-3'>{error}</div>}
      </div>
    </div>
  );
}
