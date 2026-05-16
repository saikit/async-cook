import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { IngredientType } from '@/types/api';
import { Button } from '@/components/ui/button';
import { UpdateFormType } from '@/app/update';
import { Trash2 } from 'lucide-react';
import ManageContext from '../ManageContext';

function InputInstruction({ index }: { index: number }) {
  const { register, control, getValues } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update') as UpdateFormType;
  const { recipe } = routeLoaderData || {};
  const { fields, append } = useFieldArray({
    control: control,
    name: `steps.${index}.instructions.instructions`,
  });

  const instructions = getValues(`steps.${index}.instructions.instructions`);

  if (!recipe) return null;
  const content = (
    <>
      {fields.map((field, intIndex) => (
        <div key={field.id}>
          <fieldset>
            <label>Instruction</label>
            <textarea
              {...register(
                `steps.${index}.instructions.instructions.${intIndex}.text`,
              )}
              className="border rounded w-full h-min"
              placeholder="Enter instruction"
            />
          </fieldset>
          <fieldset>
            <label>Notes</label>
            <ManageContext
              context={getValues(
                `steps.${index}.instructions.instructions.${intIndex}.context`,
              )}
              instruction_id={getValues(
                `steps.${index}.instructions.instructions.${intIndex}.id`,
              )}
            />
          </fieldset>
          {(recipe.optional_ingredients?.length ?? 0) > 0 && (
            <fieldset>
              <label>Optional</label>
              <select
                {...register(
                  `steps.${index}.instructions.instructions.${intIndex}.optional`,
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
            <label>Order</label>
            <input
              {...register(
                `steps.${index}.instructions.instructions.${intIndex}.int_order`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
          {instructions?.length > 1 && (
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
            `steps.${index}.instructions.instructions.0.group_id`,
          );
          const instructions = getValues(
            `steps.${index}.instructions.instructions`,
          );
          const lastIntOrder =
            instructions?.length > 0
              ? Number(instructions[instructions.length - 1].int_order || 0)
              : 0;
          append({ group_id: group_id, int_order: lastIntOrder + 1 });
        }}
      >
        Add Instruction
      </Button>
    </>
  );
  return content;
}

export default InputInstruction;
