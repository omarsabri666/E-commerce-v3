import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ContextP from './context/contextP.jsx';
import { ToastContainer } from 'react-toastify';





const queryClient = new QueryClient({defaultOptions:{
  queries:{
    refetchOnWindowFocus : false,
    staleTime : 6000*6000
  }
}});



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextP>
        <ToastContainer />
        <App />
      </ContextP>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
