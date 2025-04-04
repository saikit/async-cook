import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Index from './Index'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<Index />} />
                <Route path=':param' element={<App />} />
            </Route>
        </Routes>
    </BrowserRouter>,
)   
