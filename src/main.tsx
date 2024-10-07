import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './contexts/AppContext';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


const RootComponent = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);

defineCustomElements(window);