import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useContext, MouseEvent } from "react";
import RecipesListContext from "@/context/RecipesListProvider";
import RecipeContext from "@/context/RecipeProvider";
import { NavLink } from "react-router";
import { useLocation } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function HomeLink() {
  const [open, setOpen] = useState(false);
  const { recipesList } = useContext(RecipesListContext);
  const { setStepNumber } = useContext(RecipeContext);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className=" rounded-full h-7 w-7 fixed top-2 left-2 bg-slate-200 opacity-80 transform flex justify-center print:hidden">
          <Menu className="" size={18} color="black" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" aria-describedby="Recipe List">
        <SheetHeader>
          <SheetTitle className="text-xl mb-2 font-bold uppercase">
            Recipe List
          </SheetTitle>
          <SheetDescription></SheetDescription>
          <ol className="list-decimal pl-4 text-gray-900">
            {recipesList.map((recipe) => (
              <li className="underline" key={recipe.slug}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-gray-900" : "text-gray-600"
                  }
                  to={`/${recipe.slug}`}
                  onClick={(e) => handleClick(e, `/${recipe.slug}`)}
                >
                  {recipe.title}
                </NavLink>
              </li>
            ))}
          </ol>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default HomeLink;
