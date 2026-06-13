import SelectOptional from './SelectOptional';
import { useFormContext } from 'react-hook-form';

function InputIngredientGroup({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const { register } = useFormContext();

  const content = (
    <>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <fieldset className="col-span-2">
          <label className="text-sm">Ingredient group title</label>
          <input
            {...register(`steps.${index}.ingredients.text`)}
            placeholder="For the..."
            className="border rounded w-full"
          />
        </fieldset>
        <fieldset className="col-span-1">
          <label className="text-sm">Optional</label>
          <SelectOptional values={`steps.${index}.ingredients.optional`} />
        </fieldset>
      </div>
      <>{children}</>
    </>
  );
  return content;
}

export default InputIngredientGroup;
