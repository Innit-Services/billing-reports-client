import { StrictMode ,useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './apis/axiosInterceptor.js';
import setupInterceptors from './apis/axiosInterceptor';
import { AuthProvider, useAuth } from './apis/AuthContext'; 

const Root = () => {
  const { getAccessToken } = useAuth(); // Use the hook inside a component
  setupInterceptors(getAccessToken); // Pass the token retrieval function

  return <App />; // Render the main App component
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Root /> {/* Render Root instead of App */}
    </AuthProvider>
  </StrictMode>,
)