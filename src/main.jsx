import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster richColors />
    </QueryClientProvider>
  </React.StrictMode>,
)
