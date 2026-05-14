import { Link } from 'react-router';
import { useManage } from '@/context/Manage/ManageProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { RecipeType } from '@/types/api';

function ManageRecipes() {
  const { manageView } = useManage();
  const { recipes } = manageView;

  const content = (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Recipe</th>
            <th className="hidden lg:table-cell">Category</th>
            <th className="hidden lg:table-cell">Tags</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recipes?.map((recipe: RecipeType) => (
            <tr className="mb-2" key={recipe.slug}>
              <td>
                <Link
                  className="text-gray-900 mr-2 underline"
                  to={`/manage/update/${recipe.slug}`}
                >
                  {recipe.title}
                </Link>
              </td>
              <td className="hidden lg:table-cell">{recipe.category}</td>
              <td className="hidden lg:table-cell">
                {recipe.equipment.map((equip) => {
                  return (
                    <Badge classname="mr-2" key={equip.id}>
                      {equip.name}
                    </Badge>
                  );
                })}
              </td>
              <td className="text-center">
                {recipe.published ? (
                  <Badge>Published</Badge>
                ) : (
                  <Badge variant="secondary">Unpublished</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/manage/create">
        <Button className="mt-4">Create New Recipe</Button>
      </Link>
    </>
  );
  return content;
}

export default ManageRecipes;
