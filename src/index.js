import React from 'react';
import App from './App.jsx';
import '../build/styles/index.css';
import * as ReactDOMClient from 'react-dom/client';
const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
