import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import RecipeList from "./RecipeList";
import { useState } from "react";

function HomeLink() {

  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=" rounded-bl-full rounded-br-full h-6 w-12 fixed top-0 left-1/2 bg-slate-200 opacity-80 transform -translate-x-1/2 flex justify-center"><ListFilter className="" size={18} color="black" /></Button>
        </DialogTrigger>
        <DialogDescription aria-describedby="recipe-list"></DialogDescription>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Recipe List</DialogTitle>
          </DialogHeader>
          <RecipeList action={closeDialog} />
        </DialogContent>
    </Dialog>
  )
}

export default HomeLink;