import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);