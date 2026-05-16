import { useFormContext } from 'react-hook-form';

function InputInstructionGroup({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const content = (
    <>
      <fieldset>
        <label>Title</label>
        <input
          {...register(`steps.${index}.instructions.title`)}
          className="border rounded w-full"
        />
      </fieldset>
      <fieldset>
        <label>Background</label>
        <input
          {...register(`steps.${index}.instructions.background`)}
          className="border rounded w-full"
          placeholder="Background alerts"
        />
        {errors.steps?.[index]?.instructions?.background && (
          <p className="text-red-500 text-xs">
            {errors.steps[index].instructions.background.message}
          </p>
        )}
      </fieldset>
      <>{children}</>
    </>
  );
  return content;
}

export default InputInstructionGroup;
