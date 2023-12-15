import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OnlineStoreProvider from './context/OnlineStoreProvider';

ReactDOM.render(
  <React.StrictMode>
    <OnlineStoreProvider>
      <App />
    </OnlineStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);