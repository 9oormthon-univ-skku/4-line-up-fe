import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import { Global } from '@emotion/react';
import indexCss from '@/styles/indexCss.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={indexCss} />
    <App />
  </StrictMode>
);
