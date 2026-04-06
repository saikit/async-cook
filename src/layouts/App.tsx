import RecipeNavigation from '../components/RecipeNavigation.tsx'
import RecipeBackgroundBanner from '../components/RecipeBackgroundBanner.tsx'
import RecipeFooter from '../components/RecipeFooter.tsx'
import { RecipeProvider } from '../context/RecipeProvider.tsx'
import { RecipesListProvider } from '../context/RecipesListProvider.tsx'
import { FoodDataProvider } from '../context/FoodDataProvider.tsx'
import { Outlet } from 'react-router'

function App() {
  return (
    <RecipeProvider>
    <RecipesListProvider>
      <RecipeNavigation />
    </RecipesListProvider>
    <RecipeBackgroundBanner />
    <FoodDataProvider>
    <Outlet />
    </FoodDataProvider>
    <RecipeFooter />
    </RecipeProvider>
  )
}
export default App