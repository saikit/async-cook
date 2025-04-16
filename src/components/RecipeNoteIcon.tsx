import { RecipeNoteIconType } from "../context/RecipeProvider"
import { ChefHat, CircleAlert, CircleHelp } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
  

function RecipeNoteIcon({ note } : { note : RecipeNoteIconType }) {

    let Icon;
    switch (note.category) {
        case 'alert':
            Icon = CircleAlert
            break
        case 'explaination':
            Icon = CircleHelp
            break
        case 'recommendation':
            Icon = ChefHat
            break
        default:
            Icon = CircleHelp
    }

    return (
        <Popover>
            <PopoverTrigger className="align-middle ml-1"><Icon size={18} /></PopoverTrigger>
            <PopoverContent><p>{note.note}</p></PopoverContent>
        </Popover>
    )
}
export default RecipeNoteIcon