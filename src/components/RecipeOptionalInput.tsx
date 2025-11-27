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
  


function RecipeOptionalInput() {

const { recipe, step, setOptional, optional } = useContext(RecipeContext)


if(typeof recipe?.optional_ingredients !== 'string' || step > 0)
    return <></>

    let optionalArray : string[] = []
    optionalArray = (recipe.optional_ingredients as string).split(',').map(s => s.trim())

    const handleOptional = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptional(optional => ({
            ...optional,
            [event.target.id]: event.target.checked
        }))
    }

    const content = (
        <Drawer>
        <DrawerTrigger asChild><Button variant="outline">Select optional ingredients</Button></DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Select optional ingredients</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription asChild>
            <div className="px-4" >
            {optionalArray.map((ingredient) => (
                <div key={ingredient}>
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