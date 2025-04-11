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

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:3001/google-login', {
        token: credentialResponse.credential,
      });
      console.log('Google login response:', res.data);
      navigate('/vitals');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed');
    }
  };

  const handleRegularLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      console.log('Regular login response:', res.data);
      navigate('/vitals');
    } catch (err) {
      console.error('Regular login error:', err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <h1 className='app-title'>CheckYourHealth</h1>
      <div className='login-box'>
        <form onSubmit={handleRegularLogin}>
          <h3>Login with Username</h3>
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
            Login
          </button>
        </form>

        <div className='text-center my-3'>or</div>

        <GoogleOAuthProvider clientId='727214915174-f8gb1jlgfhsk5j349sv384lt4al8qp14.apps.googleusercontent.com'>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setError('Google login failed')}
          />
        </GoogleOAuthProvider>

        {error && <div className='text-danger mt-3'>{error}</div>}
      </div>
    </div>
  );
}
