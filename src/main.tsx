import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
(window as any).global = window;

import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
