import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Index from './Index'
import Template from './Template'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<Index />} />
                <Route path="schema" element={<Index />} />
                <Route path=':section?/:id' element={<App />} />
                <Route path='template' element={<Template />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>,
)   
