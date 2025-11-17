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

if(recipe?.optional_ingredients?.length === 0 || step > 0)
    return <></>

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
            {recipe?.optional_ingredients?.map((ingredient) => (
                <div key={ingredient.name}>
                <input 
                    id={ingredient.name} 
                    checked={ingredient.name in optional ? optional[ingredient.name] : false} 
                    onChange={handleOptional} 
                    type="checkbox" 
                     />
                <label className="ml-1" htmlFor={ingredient.name}>{ingredient.name}</label>
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