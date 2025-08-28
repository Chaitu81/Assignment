import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // or './App.tsx' if you're using TypeScript
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);