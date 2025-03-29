import { createRoot } from 'react-dom/client'
import './index.css'
import Recipe from './Recipe.tsx'
import RecipeBackgroundBanner from './components/RecipeBackgroundBanner.tsx'
import RecipeFooter from './components/RecipeFooter.tsx'
import { RecipeProvider } from './context/RecipeProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <RecipeProvider>
    <RecipeBackgroundBanner />
    <Recipe />
    <RecipeFooter />
    </RecipeProvider>,
)
