import HomeLink from './components/HomeLink.tsx'
import Recipe from './Recipe.tsx'
import RecipeBackgroundBanner from './components/RecipeBackgroundBanner.tsx'
import RecipeFooter from './components/RecipeFooter.tsx'
import { RecipeProvider } from './context/RecipeProvider.tsx'

function App() {
  return (
    <RecipeProvider>
    <HomeLink />
    <RecipeBackgroundBanner />
    <Recipe />
    <RecipeFooter />
    </RecipeProvider>
  )
}
export default App