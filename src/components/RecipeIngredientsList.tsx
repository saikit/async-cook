import RecipeContext from "@/context/RecipeProvider";
import Ingredient from "./Ingredient";
import { useContext } from "react";

function RecipeIngredientsList() {
    const { step, sortedIngredients, optional } = useContext(RecipeContext)
    const content = (
      <div className="my-2">
      {sortedIngredients.map((group, index) => {
        const Title = () => {
          if('text' in group && group.text !== '')
          return (<h3 className="text-xl text-slate-500"><em>For the {group.text}</em></h3>);
        }
        return (
          <div key={index} className="mb-3">
          <Title/>
          <ul className="list-none" key={index}>
            {group.description.map((ingredient, key) => {
                if (
                  (!('cooked' in ingredient) || 
                  (('cooked' in ingredient) && step - 1 >= index)) &&
                  (!('optional' in ingredient) || (('optional' in ingredient) && optional[ingredient.optional as string]))
                ) {
                  return <Ingredient
                    status={ingredient.status || "ready"}
                    key={`${key}-${ingredient.name}`}
                    description={ingredient}
                  />
                }
            })}
          </ul>
          </div>
        )
      })}
      </div>
    )

    return content;
}
export default RecipeIngredientsList