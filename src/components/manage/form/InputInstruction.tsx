import { useRouteLoaderData } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { UpdateFormType } from '@/app/update';
import { Trash2 } from 'lucide-react';
import ManageContext from '../ManageContext';
import SelectOptional from './SelectOptional';
import SelectMedia from './SelectMedia';
import DeleteItemIcon from './DeleteItemIcon';

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
        <div key={field.id} className="p-4 border rounded mb-4 relative">
          <fieldset className="mb-4">
            <label>Instruction</label>
            <textarea
              {...register(
                `steps.${index}.instructions.instructions.${intIndex}.text`,
              )}
              className="border rounded w-full h-min"
              placeholder="Enter instruction"
            />
          </fieldset>
          <fieldset className="mb-4 flex justify-start">
            <label>
              {instructions[intIndex].context?.length > 0 ? 'Edit' : 'Add'}{' '}
              Notes
            </label>
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
            <fieldset className="mb-4">
              <label>Optional</label>
              <SelectOptional
                values={`steps.${index}.instructions.instructions.${intIndex}.optional`}
              />
            </fieldset>
          )}
          <fieldset className="mb-4">
            <label>Order</label>
            <input
              {...register(
                `steps.${index}.instructions.instructions.${intIndex}.int_order`,
              )}
              className="border rounded w-full"
            />
          </fieldset>
          {instructions?.length > 1 && (
            <fieldset className="mb-4">
              <label>Delete</label>
              <Trash2 />
            </fieldset>
          )}
          {instructions[intIndex].media_id && (
            <img
              src={
                recipe.media?.find(
                  (media) => media.uuid === instructions[intIndex].media_id,
                )?.url_thumbnail
              }
              alt=""
            />
          )}
          {recipe.media?.length > 0 && (
            <fieldset className="mb-4">
              <SelectMedia
                media={recipe.media}
                name={`steps.${index}.instructions.instructions.${intIndex}.media_id`}
              >
                <label className="underline text-blue-700">Select Media</label>
              </SelectMedia>
            </fieldset>
          )}
          {instructions?.length > 1 && (
            <DeleteItemIcon model="ingredient" id={instructions[intIndex].id}>
              <Trash2 className="absolute top-4 right-4 text-red-500" />
            </DeleteItemIcon>
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
