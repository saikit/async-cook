import { Link } from 'react-router';
import { useRecipeList } from '@/context/RecipesListProvider';

function Index() {
  const { recipesList } = useRecipeList();

  const content = (
    <>
      <title>
        The Async Cook - Recipes and App hand-crafted by Sai-Kit Hui
      </title>
      <main className="p-4">
        <h1 className="font-bold text-4xl mb-4 text-center">The Async Cook</h1>
        <h2 className="text-xl mb-4">
          Async Cook is an App for mobile devices and tablets and a cookbook for
          home cooks with easy-to-follow recipes. App and recipes developed by{' '}
          <Link
            className="underline text-blue-700 whitespace-nowrap"
            to="https://www.saikithui.com"
            target="_blank"
          >
            Sai-Kit Hui
          </Link>
        </h2>
        <h3 className="text-2xl mb-4 font-bold uppercase border-b pb-2">
          Recipes
        </h3>
        <ol className="list-decimal pl-6 text-gray-900">
          {Object.entries(recipesList).map(([category, recipes]) => (
            <section key={category} className="mb-6">
              {category !== 'None' && (
                <h4 className="text-lg font-semibold text-slate-600 mb-2">
                  {category}
                </h4>
              )}

              {recipes.map((recipe) => (
                <li className="mb-1" key={recipe.slug}>
                  <Link
                    className="underline hover:text-blue-600 transition-colors"
                    to={`/recipe/${recipe.slug}`}
                  >
                    {recipe.title}
                  </Link>
                </li>
              ))}
            </section>
          ))}
        </ol>
      </main>
    </>
  );

  return content;
}

export default Index;
