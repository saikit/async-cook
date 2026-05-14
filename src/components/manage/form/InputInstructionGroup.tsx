import { useFormContext } from 'react-hook-form';

function InputInstructionGroup({ index, children }) {
  const { register } = useFormContext();
  const content = (
    <>
      <fieldset>
        <label>Title</label>
        <input
          {...register(`steps.${index}.instruction_groups.title`)}
          className="border rounder w-full"
        />
      </fieldset>
      <fieldset>
        <label>Background</label>
        <input
          {...register(`steps.${index}.instruction_groups.background`)}
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
