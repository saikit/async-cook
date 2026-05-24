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
        <input
          {...register(`steps.${index}.ingredients.text`)}
          placeholder="For the..."
          className="border rounded"
        />
        <SelectOptional values={`steps.${index}.ingredients.optional`} />
      </div>
      <>{children}</>
    </>
  );
  return content;
}

export default InputIngredientGroup;
