import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/App'
import Region from './pages/Region'

const root = document.getElementById('root')

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<App />} />
      <Route path='/region/:region' element={<Region />} />
    </Routes>
  </BrowserRouter>
);