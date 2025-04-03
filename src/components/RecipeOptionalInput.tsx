import { useContext } from "react"
import RecipeContext from "../context/RecipeProvider"


function RecipeOptionalInput() {

const { optionalIngredients, step, setOptional, optional } = useContext(RecipeContext)

if(optionalIngredients.length === 0 || step > 0)
    return <></>

    const handleOptional = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptional(optional => ({
            ...optional,
            [event.target.id]: event.target.checked
        }))
    }

    const content = (
        <div className="border rounded-xl p-2 my-2">
        <h3 className="text-xl">Select optional ingredients</h3>
        {optionalIngredients.map((ingredient) => (
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
    )

  return content
}
export default RecipeOptionalInput