import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react'
import { StrictMode } from "react"

createRoot(document.getElementById('main')!).render(
    <StrictMode>
        <App />
        <Analytics />
    </StrictMode>,
)