import { RecipeNoteIconType } from "../context/RecipeProvider"
import { ChefHat } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
  

function RecipeNoteIcon({ note } : { note : RecipeNoteIconType }) {
    return (
        <Popover>
            <PopoverTrigger><ChefHat size={18}/></PopoverTrigger>
            <PopoverContent><p>{note.note}</p></PopoverContent>
        </Popover>
    )
}
export default RecipeNoteIcon