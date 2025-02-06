import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import { router } from './routes/Route';
import AuthProvider from './components/Context/AuthContext';






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

      <RouterProvider router={router} />

    </AuthProvider>
  </StrictMode>,
)
