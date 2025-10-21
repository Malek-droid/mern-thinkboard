import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';

const root = createRoot(document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  // Dev: render without StrictMode to prevent double requests
  root.render(
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  );
} else {
  // Production: keep StrictMode
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </StrictMode>
  );
}
