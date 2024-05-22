import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './app';
import ProvidersWrapper from './context/AppProvider';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <ProvidersWrapper>
        <Suspense>
          <App />
          <ToastContainer position="top-center" autoClose="3000" />
        </Suspense>
      </ProvidersWrapper>
    </BrowserRouter>
  </HelmetProvider>
);
