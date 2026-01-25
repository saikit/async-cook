import RecipeNavigation from './components/RecipeNavigation.tsx'
import Recipe from './Recipe.tsx'
import RecipeBackgroundBanner from './components/RecipeBackgroundBanner.tsx'
import RecipeFooter from './components/RecipeFooter.tsx'
import { RecipeProvider } from './context/RecipeProvider.tsx'
import { RecipesListProvider } from './context/RecipesListProvider.tsx'
import { FoodDataProvider } from './context/FoodDataProvider.tsx'

function App() {
  return (
    <RecipeProvider>
    <RecipesListProvider>
      <RecipeNavigation />
    </RecipesListProvider>
    <RecipeBackgroundBanner />
    <FoodDataProvider>
    <Recipe />
    </FoodDataProvider>
    <RecipeFooter />
    </RecipeProvider>
  )
}
export default App