import { useContext } from "react"
import RecipeContext from "../context/RecipeProvider"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "./ui/drawer"
import { Button } from "./ui/button"
import ActionButton from "./ActionButton"
  
function RecipeOptionalInput() {

const { optional_ingredients, step, setOptional, optional } = useContext(RecipeContext)

if(!optional_ingredients || step > 0)
    return <></>

    const handleOptional = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptional(optional => ({
            ...optional,
            [event.target.id]: event.target.checked
        }))
    }

    const content = (
        <Drawer>
        <DrawerTrigger asChild><ActionButton><>Select optional ingredients</></ActionButton></DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Select optional ingredients</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription asChild>
            <div className="px-4" >
            {optional_ingredients.map((ingredient) => (
                <div key={ingredient} className="mb-1">
                <input 
                    id={ingredient} 
                    checked={ingredient in optional ? optional[ingredient] : false} 
                    onChange={handleOptional} 
                    type="checkbox" 
                     />
                <label className="ml-1" htmlFor={ingredient}>{ingredient}</label>
                </div>
            ))}
            </div>
            </DrawerDescription>
            <DrawerFooter>
            <DrawerClose asChild>
                <Button variant="outline">Close</Button>
            </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    )

  return content
}
export default RecipeOptionalInput