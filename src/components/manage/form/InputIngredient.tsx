import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { IngredientType } from '@/types/api';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import type { UpdateFormType } from '@/app/update';
import { Trash2 } from 'lucide-react';
import ManageContext from '../ManageContext';

function InputIngredient({ index }: { index: number }) {
  const { register, control, getValues } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update') as UpdateFormType;
  const { recipe } = routeLoaderData || {};

  const { fields, append } = useFieldArray({
    control: control,
    name: `steps.${index}.ingredients.ingredients`,
  });

  const ingredients = getValues(`steps.${index}.ingredients.ingredients`);

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
                `steps.${index}.ingredients.ingredients.${ingIndex}.quantity`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
          <fieldset>
            <label>Unit</label>
            <input
              {...register(
                `steps.${index}.ingredients.ingredients.${ingIndex}.unit`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
          <fieldset className="col-span-2 sm:col-span-4">
            <label>Name</label>
            <input
              {...register(
                `steps.${index}.ingredients.ingredients.${ingIndex}.name`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
          <fieldset>
            <label>Cooked</label>
            <input
              {...register(
                `steps.${index}.ingredients.ingredients.${ingIndex}.cooked`,
              )}
              type="checkbox"
            />
          </fieldset>
          <fieldset>
            <label>FDC Id</label>
            <input
              {...register(
                `steps.${index}.ingredients.ingredients.${ingIndex}.fdc_id`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
          {(recipe.optional_ingredients?.length ?? 0) > 0 && (
            <fieldset>
              <label>Optional</label>
              <select
                {...register(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.optional`,
                  {
                    setValueAs: (v) =>
                      v === '' || v === null ? null : Number(v),
                  },
                )}
                className="border rounded w-full"
              >
                <option value="">None</option>
                {recipe.optional_ingredients?.map(
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
            <label>Notes</label>
            <ManageContext
              index={index}
              ingIndex={ingIndex}
              context={getValues(
                `steps.${index}.ingredients.ingredients.${ingIndex}.context`,
              )}
              ingredient_id={getValues(
                `steps.${index}.ingredients.ingredients.${ingIndex}.id`,
              )}
            />
          </fieldset>
          <fieldset>
            <label>Order</label>
            <input
              {...register(
                `steps.${index}.ingredients.ingredients.${ingIndex}.ing_order`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
          {ingredients?.length > 1 && (
            <fieldset>
              <label>Delete</label>
              <Trash2 />
            </fieldset>
          )}
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          const group_id = getValues(
            `steps.${index}.ingredients.ingredients.0.group_id`,
          );
          const ingredients = getValues(
            `steps.${index}.ingredients.ingredients`,
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
