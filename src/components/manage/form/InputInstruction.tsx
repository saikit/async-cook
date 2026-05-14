import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { IngredientType } from '@/types/api';
import { Button } from '@/components/ui/button';

function InputInstruction({ index }: { index: number }) {
  const { register, watch, control, getValues } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update') as any;
  const { recipe } = routeLoaderData || {};
  const { fields, append } = useFieldArray({
    control: control,
    name: `steps.${index}.instruction_groups.instructions`,
  });

  if (!recipe) return null;
  const content = (
    <>
      {fields.map((field, intIndex) => (
        <div key={field.id}>
          <fieldset>
            <label>Instruction</label>
            <textarea
              {...register(
                `steps.${index}.instruction_groups.instructions.${intIndex}.text`,
              )}
              className="border rounded w-full h-min"
              placeholder="Enter instruction"
            />
          </fieldset>
          {recipe.optional_ingredients?.length > 0 && (
            <select
              {...register(
                `steps.${index}.instruction_groups.instructions.${intIndex}.optional`,
              )}
              defaultValue={watch(
                `steps.${index}.instruction_groups.instructions.${intIndex}.optional`,
              )}
            >
              {recipe.optional_ingredients.map((ingredient: IngredientType) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          )}
          <fieldset>
            <label>Order</label>
            <input
              {...register(
                `steps.${index}.instruction_groups.instructions.${intIndex}.int_order`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          const group_id = getValues(
            'steps.0.instruction_groups.instructions.0.group_id',
          );
          const instructions = getValues(
            `steps.${index}.instruction_groups.instructions`,
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
