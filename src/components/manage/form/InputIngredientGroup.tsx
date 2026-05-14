import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';

function InputIngredientGroup({ index, children }) {
  const { register, watch } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update');
  const { recipe } = (routeLoaderData as any) || {};

  if (!recipe) return;

  const content = (
    <>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <input
          {...register(`steps.${index}.ingredient_groups.text`)}
          placeholder="For the..."
          className="border rounded"
        />
        {recipe.optional_ingredients?.length > 0 && (
          <select
            {...register(`steps.${index}.ingredient_groups.optional`)}
            defaultValue={watch(`steps.${index}.ingredient_groups.optional`)}
          >
            {recipe.optional_ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <>{children}</>
    </>
  );
  return content;
}

export default InputIngredientGroup;
