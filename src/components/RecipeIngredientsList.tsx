import RecipeContext from "@/context/RecipeProvider";
import Ingredient from "./Ingredient";
import { useContext } from "react";

function RecipeIngredientsList() {
    const { step, sortedIngredients, optional } = useContext(RecipeContext)
  return (
    <>
    {sortedIngredients.map((group) => {
      return group.map((ingredient, key) => {
          return (
            <div key={ingredient.name} className='my-2'>
            {'name' in ingredient && (
              <h3><em>For the {ingredient.name}</em></h3>
            )}
            <ul key={key}>
              {ingredient.description.map((ing) => {
              if (
                (!('cooked' in ing) || 
                (('cooked' in ing) && step - 1 >= key)) &&
                (!('optional' in ing) || (('optional' in ing) && optional[ing.optional as string]))
              ) {
                return <Ingredient
                  status={ingredient.status || "ready"}
                  key={`${key}-${ing.name}`}
                  description={ing}
                />
              }
              })}
              </ul>
            </div>
          );
      });
    })}
    </>
  )
}
export default RecipeIngredientsList