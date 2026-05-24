import RecipeContext from '@/context/RecipeProvider';
import { useContext } from 'react';

function RecipeTitle() {
  const { recipe, optional } = useContext(RecipeContext);

  if (!recipe) return null;
  const { title, optional_ingredients } = recipe;

  const selectedIngredients = optional_ingredients
    ?.filter((ing) => optional[ing.id])
    .map((ing) => ing.name);

  const optionalTitle =
    selectedIngredients && selectedIngredients.length > 0
      ? ` with ${selectedIngredients.join(' & ')}`
      : '';

  const content = (
    <h1 className="text-4xl font-bold text-center">
      {title}
      <small className="text-xl text-slate-500 font-semibold">
        {optionalTitle}
      </small>
    </h1>
  );
  return content;
}

export default RecipeTitle;
