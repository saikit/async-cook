import { Link } from 'react-router';
import { useManageRecipeList } from '@/context/Manage/ManageRecipesListProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function ManageRecipes() {
  const { recipesList } = useManageRecipeList();

  return (
    <>
      <title>The Async Cook - Manage recipes</title>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Manage Recipes Page</h1>
        <ol className="list-decimal pl-4 text-gray-900">
          {recipesList?.map((recipe) => (
            <li className="mb-2" key={recipe.slug}>
              <Link
                className="text-gray-900 mr-2 underline"
                to={`/manage/update/${recipe.slug}`}
              >
                {recipe.title}
              </Link>{' '}
              {recipe.published ? (
                <Badge>Published</Badge>
              ) : (
                <Badge variant="secondary">Unpublished</Badge>
              )}
            </li>
          ))}
        </ol>
        <Link to="/manage/create">
          <Button className="mt-4">Create New Recipe</Button>
        </Link>
      </div>
    </>
  );
}

export default ManageRecipes;
