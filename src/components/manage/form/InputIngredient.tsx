import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { IngredientType } from '@/types/api';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';

function InputIngredient({ index }: { index: number }) {
  const { register, control, watch, getValues } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update') as any;
  const { recipe } = routeLoaderData || {};

  const { fields, append } = useFieldArray({
    control: control,
    name: `steps.${index}.ingredient_groups.ingredients`,
  });

  if (!recipe) return null;
  const content = (
    <>
      {fields.map((field, ingIndex) => (
        <div
          className="mb-4 grid grid-cols-6 sm:grid-cols-12 gap-2"
          key={field.id}
        >
          <fieldset>
            <label>Quantity</label>
            <input
              {...register(
                `steps.${index}.ingredient_groups.ingredients.${ingIndex}.quantity`,
              )}
              className="border rounded"
            />
          </fieldset>
          <fieldset>
            <label>Unit</label>
            <input
              {...register(
                `steps.${index}.ingredient_groups.ingredients.${ingIndex}.unit`,
              )}
              className="border rounded"
            />
          </fieldset>
          <fieldset className="col-span-2">
            <label>Name</label>
            <input
              {...register(
                `steps.${index}.ingredient_groups.ingredients.${ingIndex}.name`,
              )}
              className="border rounded"
            />
          </fieldset>
          <fieldset>
            <label>Cooked</label>
            <input
              {...register(
                `steps.${index}.ingredient_groups.ingredients.${ingIndex}.cooked`,
              )}
              type="checkbox"
            />
          </fieldset>
          <fieldset>
            <label>FDC Id</label>
            <input
              {...register(
                `steps.${index}.ingredient_groups.ingredients.${ingIndex}.fdc_id`,
              )}
              className="border rounded"
            />
          </fieldset>
          {recipe.optional_ingredients?.length > 0 && (
            <fieldset>
              <label>Optional</label>
              <select
                {...register(
                  `steps.${index}.ingredient_groups.ingredients.${ingIndex}.optional`,
                )}
                defaultValue={watch(
                  `steps.${index}.ingredient_groups.ingredients.${ingIndex}.optional`,
                )}
              >
                {recipe.optional_ingredients.map(
                  (ingredient: IngredientType) => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ),
                )}
              </select>
            </fieldset>
          )}
          <fieldset>
            <label>Order</label>
            <input
              {...register(
                `steps.${index}.ingredient_groups.ingredients.${ingIndex}.ing_order`,
              )}
              className="border rounded"
            />
          </fieldset>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          const group_id = getValues(
            `steps.${index}.ingredient_groups.ingredients.0.group_id`,
          );
          const ingredients = getValues(
            `steps.${index}.ingredient_groups.ingredients`,
          );
          const lastIngOrder =
            ingredients?.length > 0
              ? Number(ingredients[ingredients.length - 1].ing_order || 0)
              : 0;
          append({ group_id: group_id, ing_order: lastIngOrder + 1 });
        }}
      >
        Add Ingredient
      </Button>
    </>
  );
  return content;
}

export default InputIngredient;
