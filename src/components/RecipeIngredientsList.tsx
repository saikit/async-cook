import RecipeContext from '@/context/RecipeProvider';
import Ingredient from './Ingredient';
import { useContext } from 'react';
import RecipeCalculator from './RecipeCalculator';
import { usePersistedState } from '@/hooks/usePersistedState';

export type quantityType = Record<string, Record<string, number>>;

function RecipeIngredientsList() {
  const { stepNumber, sortedIngredients } = useContext(RecipeContext);
  const [quantityState, setQuantityState] = usePersistedState(
    'quantityState',
    {},
  );
  const updateQuantity = (newValues: quantityType) => {
    setQuantityState(newValues);
  };

  const content = (
    <div className="my-2" aria-label="Ingredient List">
      {sortedIngredients.map((ingredientGroup, index) => {
        if (ingredientGroup.ingredients.length === 0) return null;
        const Title = () => {
          const CalculatorIcon = () => {
            if (
              'calculator' in ingredientGroup &&
              ingredientGroup.calculator &&
              stepNumber === 0
            )
              return (
                <RecipeCalculator
                  calculator={ingredientGroup.calculator}
                  quantityState={quantityState}
                  updateQuantity={updateQuantity}
                  ingredientGroupName={ingredientGroup.text || ''}
                />
              );
          };
          if ('text' in ingredientGroup && ingredientGroup.text !== null)
            return (
              <h3 className="text-xl text-slate-500 mb-1">
                <em>For the {ingredientGroup.text}</em>
                {CalculatorIcon()}
              </h3>
            );
        };
        return (
          <div
            key={index}
            className={
              'text' in ingredientGroup && ingredientGroup.text !== ''
                ? 'my-4'
                : ''
            }
          >
            <Title />
            {ingredientGroup.ingredients.map((ingredient, key) => {
              return (
                <Ingredient
                  status={ingredientGroup.status || 'ready'}
                  key={`${key}-${ingredient.name}`}
                  ingredients={ingredient}
                  quantityState={quantityState}
                  groupName={ingredientGroup.text || ''}
                  index={key}
                />
              );
            })}
            {index < sortedIngredients.length - 1 && <hr className="my-4" />}
          </div>
        );
      })}
    </div>
  );

  return content;
}
export default RecipeIngredientsList;
