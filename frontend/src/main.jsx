import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        style: {
          background: '#111',
          color: '#fff',
          border: '1px solid rgba(255, 69, 0, 0.4)',
          boxShadow: '0 0 20px rgba(255, 69, 0, 0.3)',
        },
      }}
    />
  </React.StrictMode>
)
