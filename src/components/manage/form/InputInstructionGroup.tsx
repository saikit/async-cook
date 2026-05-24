import { useFormContext } from 'react-hook-form';

function InputInstructionGroup({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const { register } = useFormContext();

  const content = (
    <>
      <fieldset className="mb-4">
        <label>Title</label>
        <input
          {...register(`steps.${index}.instructions.title`)}
          className="border rounded w-full"
        />
      </fieldset>
      <fieldset className="mb-4">
        <label>Background</label>
        <input
          {...register(`steps.${index}.instructions.background`)}
          className="border rounded w-full"
          placeholder="Background alerts"
        />
      </fieldset>
      <>{children}</>
    </>
  );
  return content;
}

export default InputInstructionGroup;
