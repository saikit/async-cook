import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouteLoaderData } from 'react-router';
import type { UpdateFormType } from '@/app/update';

function InputOptionalIngredients() {
  const { register, control } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update') as UpdateFormType;
  const { recipe } = routeLoaderData || {};
  const { fields, append } = useFieldArray({
    control,
    name: 'optional_ingredients',
  });

  const content = (
    <div className="mb-4 border rounded p-4">
      <label>Optional Ingredients</label>
      <div className="flex flex-col gap-2 mb-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              {...register(`optional_ingredients.${index}.name`)}
              placeholder="Ingredient name"
              className="border rounded w-full"
            />
          </div>
        ))}
      </div>
      <Button type="button" onClick={() => append({ recipe_id: recipe.id })}>
        Add additional ingredient
      </Button>
    </div>
  );
  return content;
}

export default InputOptionalIngredients;
