import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Index from './Index'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from './NotFound'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<Index />} />
                <Route path='/:slug/:step?' element={<App />} />
                <Route path='/not-found' element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>,
)   
