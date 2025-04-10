import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID =
  '727214915174-f8gb1jlgfhsk5j349sv384lt4al8qp14.apps.googleusercontent.com';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
