import { RecipesListProvider } from '../context/RecipesListProvider.tsx';
import { Outlet } from 'react-router';

function Manage() {
  return (
    <RecipesListProvider>
      <div className="p-4">
        <Outlet />
      </div>
    </RecipesListProvider>
  );
}

export default Manage;
