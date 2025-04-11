import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure this line is included if you're styling in App.css

export function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:3001/google-login', {
        token: credentialResponse.credential,
      });

      console.log('Server Response:', res.data);
      navigate('/vitals'); // Redirect after login
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">CheckYourHealth</h1>
      <GoogleOAuthProvider clientId="727214915174-f8gb1jlgfhsk5j349sv384lt4al8qp14.apps.googleusercontent.com">
        <div className="login-box">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log('Login Failed')}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
