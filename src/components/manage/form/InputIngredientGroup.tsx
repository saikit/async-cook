import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { UpdateFormType } from '@/app/update';

function InputIngredientGroup({
  index,
  children,
}: {
  index: number;
  children: JSX.Element;
}) {
  const { register, watch } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update') as UpdateFormType;
  const { recipe } = routeLoaderData;

  if (!recipe) return;

  const content = (
    <>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <input
          {...register(`steps.${index}.ingredients.text`)}
          placeholder="For the..."
          className="border rounded"
        />
        {(recipe.optional_ingredients?.length ?? 0) > 0 && (
          <select
            {...register(`steps.${index}.ingredients.optional`, {
              setValueAs: (v) => (v === '' || v === null ? null : Number(v)),
            })}
            className="border rounded"
          >
            <option value="">None</option>
            {recipe.optional_ingredients?.map((ingredient) => (
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
