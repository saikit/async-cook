import RecipeContext from "@/context/RecipeProvider";
import Ingredient from "./Ingredient";
import { useContext } from "react";

function RecipeIngredientsList() {
    const { step, sortedIngredients } = useContext(RecipeContext)
  return (
    <>
    {sortedIngredients.map((group) => {
      return group.map((ingredient, key) => {
        if ('name' in ingredient && !('cooked' in ingredient)) {
          return (
            <div key={ingredient.name} className='my-2'>
            <h3><em>For the {ingredient.name}</em></h3>
            <ul key={key}>
              {ingredient.description.map((ing) => (
              <Ingredient 
                status={ingredient.status || "ready"} 
                description={ing}
                key={`${key}-${ing.name}`}
              />
              ))}
            </ul></div>
          );
        } else {
          if (!('cooked' in ingredient) || (('cooked' in ingredient) && step - 1 >= key)) {
            return ( 
            <div className="my-2">
              <ul key={key}>
              {ingredient.description.map((ing) => {
               if (!('cooked' in ing) || (('cooked' in ing) && step - 1 >= key)) {
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
          }
          return null;
        }
      });
    })}
    </>
  )
}
export default RecipeIngredientsList