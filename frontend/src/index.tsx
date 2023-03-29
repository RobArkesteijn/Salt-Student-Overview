import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://lfqvlqwtynlkfeyfuynu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcXZscXd0eW5sa2ZleWZ1eW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwNzU3MTgsImV4cCI6MTk5NTY1MTcxOH0.UmwWmXC6qUszLt0BuBdJW1RVdiTypQ59NeGw99BGOZA" 
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <BrowserRouter>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
      </SessionContextProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
);
