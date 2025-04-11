import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export function Login() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      console.log('Google Credential', credentialResponse);
      const res = await axios.post('http://localhost:3001/google-login', {
        token: credentialResponse.credential,
      });

      console.log('Server Response:', res.data);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <GoogleOAuthProvider clientId='727214915174-f8gb1jlgfhsk5j349sv384lt4al8qp14.apps.googleusercontent.com'>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log('Login Failed')}
      />
    </GoogleOAuthProvider>
  );
}
