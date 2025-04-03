import RecipeContext from "@/context/RecipeProvider";
import Ingredient from "./Ingredient";
import { useContext } from "react";

function RecipeIngredientsList() {
    const { step, sortedIngredients } = useContext(RecipeContext)
  return (
    <ul>
    {sortedIngredients.map((group, key) => {
      return group.map((ingredient) => {
        if (ingredient.description.length > 1) {
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
            return ingredient.description.map((ing) => (
              <Ingredient
                status={ingredient.status || "ready"}
                key={`${key}-${ing.name}`}
                description={ing}
              />
            ));
          }
          return null;
        }
      });
    })}
    </ul>
  )
}
export default RecipeIngredientsList