import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import type { UpdateFormType } from '@/app/update';
import ManageContext from '../ManageContext';
import SelectOptional from './SelectOptional';
import SelectMedia from './SelectMedia';
import FormHelpIcon from './FormHelpIcon';
import DeleteItemIcon from './DeleteItemIcon';
import { Trash2 } from 'lucide-react';

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
        <div className="p-4 mb-4 border rounded relative">
          <h3 className="text-xl font-semibold mb-2 w-9/10">
            {ingredients[ingIndex].name
              ? `Ingredient: ${ingredients[ingIndex].name}
            `
              : 'New Ingredient'}
          </h3>
          <div
            className="mb-4 grid grid-cols-6 sm:grid-cols-12 gap-2"
            key={field.id}
          >
            <fieldset>
              <label className="text-sm">Quantity</label>
              <input
                {...register(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.quantity`,
                )}
                className="border rounded w-1/2"
              />
            </fieldset>
            <fieldset>
              <label className="text-sm">Unit</label>
              <input
                {...register(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.unit`,
                )}
                className="border rounded w-1/2"
              />
            </fieldset>
            <fieldset className="col-span-4 sm:col-span-4">
              <label className="text-sm">Name</label>
              <input
                {...register(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.name`,
                )}
                className="border rounded w-full"
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="mb-4 flex justify-between">
              <label
                htmlFor={`steps.${index}.ingredients.ingredients.${ingIndex}.cooked`}
              >
                Processed Ingredient?{' '}
                <FormHelpIcon>
                  Ingredients that are the result of processing that only start
                  appearing at this current step
                </FormHelpIcon>
              </label>
              <input
                {...register(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.cooked`,
                )}
                type="checkbox"
                id={`steps.${index}.ingredients.ingredients.${ingIndex}.cooked`}
              />
            </fieldset>
            <fieldset className="mb-4">
              <label>
                FDC ID{' '}
                <FormHelpIcon>
                  Number for retrieving an ingredient's nutritional information.{' '}
                  <a
                    href={`https://fdc.nal.usda.gov/food-search?query=${encodeURIComponent(ingredients[ingIndex].name)}`}
                    target="_blank"
                    className="underline text-blue-700 text-sm"
                  >
                    Get ID
                  </a>
                </FormHelpIcon>
              </label>
              <input
                {...register(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.fdc_id`,
                )}
                className="border rounded w-full"
              />
            </fieldset>
            {(recipe.optional_ingredients?.length ?? 0) > 0 && (
              <fieldset className="mb-4">
                <label>Optional Ingredient</label>
                <SelectOptional
                  values={`steps.${index}.ingredients.ingredients.${ingIndex}.optional`}
                />
              </fieldset>
            )}
            <fieldset className="mb-4 flex justify-start">
              <label>
                {ingredients[ingIndex].context?.length > 0 ? 'Edit' : 'Add'}{' '}
                Notes
              </label>
              <ManageContext
                context={getValues(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.context`,
                )}
                ingredient_id={getValues(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.id`,
                )}
              />
            </fieldset>
            <fieldset className="mb-4">
              <label>Order</label>
              <input
                {...register(
                  `steps.${index}.ingredients.ingredients.${ingIndex}.ing_order`,
                )}
                className="border rounded w-full"
              />
            </fieldset>
            {ingredients?.length > 1 && (
              <DeleteItemIcon model="ingredient" id={ingredients[ingIndex].id}>
                <Trash2 className="absolute top-4 right-4 text-red-500" />
              </DeleteItemIcon>
            )}
          </div>
          {ingredients[ingIndex].media_id && (
            <img
              src={
                recipe.media?.find(
                  (media) => media.uuid === ingredients[ingIndex].media_id,
                )?.url_thumbnail
              }
              alt=""
            />
          )}
          {recipe.media?.length > 0 && (
            <fieldset className="mb-4">
              <SelectMedia
                media={recipe.media}
                name={`steps.${index}.ingredients.ingredients.${ingIndex}.media_id`}
              >
                <label className="underline text-blue-700">Select Media</label>
              </SelectMedia>
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
