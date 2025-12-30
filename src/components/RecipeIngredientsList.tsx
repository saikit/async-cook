import RecipeContext from "@/context/RecipeProvider";
import Ingredient from "./Ingredient";
import { useContext } from "react";
import RecipeCalculator from "./RecipeCalculator";
import { usePersistedState } from "@/hooks/usePersistedState";

export type quantityType = Record<string, Record<string, number>>;

function RecipeIngredientsList() {
    const { stepNumber, sortedIngredients, optional } = useContext(RecipeContext)
    const [quantityState, setQuantityState] = usePersistedState('quantityState', {})
    const updateQuantity = (newValues: quantityType) => {
      setQuantityState(newValues)
    }
    
    const content = (
      <div className="my-2">
      {sortedIngredients.map((group, index) => {
        const Title = () => {
          const CalculatorIcon = () => {
          if(('calculator' in group && group.calculator) && stepNumber === 0)
            return (<RecipeCalculator group={group} quantityState={quantityState} updateQuantity={updateQuantity} />);
          }
          if('text' in group && group.text !== '')
          return (<h3 className="text-xl text-slate-500"><em>For the {group.text}</em>{CalculatorIcon()}</h3>);
        }
        
        return (
          <div key={index} className="mb-3">
          <Title/>
          <ul className="list-none">
            {group.description.map((ingredient, key) => {
                if (
                  (!('cooked' in ingredient) || 
                  (('cooked' in ingredient) && stepNumber >= group.step)) &&
                  (!('optional' in ingredient) || (('optional' in ingredient) && optional[ingredient.optional as string]))
                ) {
                  return <Ingredient
                    status={group.status || "ready"}
                    key={`${key}-${ingredient.name}`}
                    description={ingredient}
                    quantityState={quantityState}
                    groupName={group.text || ""}
                    index={key}
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