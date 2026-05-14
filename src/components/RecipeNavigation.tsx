import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useContext, MouseEvent } from 'react';
import { useRecipeList } from '@/context/RecipesListProvider';
import RecipeContext from '@/context/RecipeProvider';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function RecipeNavigation() {
  const [open, setOpen] = useState(false);
  const { recipesList } = useRecipeList();
  const { setStepNumber, recipe } = useContext(RecipeContext);
  const location = useLocation();

  function handleClick(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (location.pathname === path) {
      event.preventDefault();
    } else {
      setStepNumber(0);
      setOpen(false);
    }
  }

  return (
    <>
      <title>
        {recipe ? `${recipe.title} - The Async Cook` : 'The Async Cook'}
      </title>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className=" rounded-full h-7 w-7 fixed top-2 left-2 bg-slate-200 opacity-80 transform flex justify-center print:hidden">
            <Menu className="" size={18} color="black" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" aria-describedby="Recipe List">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold uppercase text-center">
              Recipe List
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <nav>
              <ul className="text-gray-900 text-center">
                {Object.entries(recipesList).map(
                  ([category, recipes], index) => (
                    <section key={category}>
                      {category !== 'None' && (
                        <h4 className="text-lg font-semibold text-slate-600 mb-2">
                          {category}
                        </h4>
                      )}
                      {recipes?.map((recipe) => (
                        <>
                          <li className="underline mb-1" key={recipe.slug}>
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? 'text-gray-900' : 'text-gray-600'
                              }
                              to={`/recipe/${recipe.slug}`}
                              onClick={(e) =>
                                handleClick(e, `/recipe/${recipe.slug}`)
                              }
                            >
                              {recipe.title}
                            </NavLink>
                          </li>
                        </>
                      ))}
                      {index < Object.keys(recipesList).length - 1 && (
                        <hr className="my-4" />
                      )}
                    </section>
                  ),
                )}
              </ul>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default RecipeNavigation;
