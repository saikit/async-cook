import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useState, useContext } from "react";
import RecipesListContext from "@/context/RecipesListProvider";
import { Link } from 'react-router'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


function HomeLink() {

  const [open, setOpen] = useState(false);
  const context = useContext(RecipesListContext);
  const { recipesList } = context;

  return (
    <Sheet  open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className=" rounded-bl-full rounded-br-full h-6 w-12 fixed top-0 left-1/2 bg-slate-200 opacity-80 transform -translate-x-1/2 flex justify-center print:hidden"><ListFilter className="" size={18} color="black" /></Button>
      </SheetTrigger>
      <SheetContent side="top" aria-describedby="Recipe List">
        <SheetHeader>
          <SheetTitle className='text-xl mb-2 font-bold uppercase'>Recipe List</SheetTitle>
          <SheetDescription></SheetDescription>
          <ol className='list-decimal pl-4 text-gray-900'>
              {recipesList.map(recipe => <li className='underline' key={recipe.slug}>
                <Link className='text-gray-900' to={`/${recipe.slug}`} onClick={() => setOpen(false)}>{recipe.title}</Link></li>
              )}
          </ol>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default HomeLink;