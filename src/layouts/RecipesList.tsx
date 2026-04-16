import { RecipesListProvider } from '../context/RecipesListProvider.tsx';
import { Outlet } from 'react-router';

function RecipesList() {
  return (
    <RecipesListProvider>
      <Outlet />
    </RecipesListProvider>
  );
}

export default RecipesList;
