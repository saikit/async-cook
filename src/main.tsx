import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Recipe from './Recipe.tsx'
import RecipeFooter from './components/RecipeFooter.tsx'
import { RecipeProvider } from './context/RecipeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecipeProvider>
    <Recipe />
    <RecipeFooter />
    </RecipeProvider>
  </StrictMode>,
)
