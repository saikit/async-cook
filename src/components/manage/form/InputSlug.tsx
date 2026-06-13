import { useFormContext } from 'react-hook-form';

function InputSlug() {
  const { register } = useFormContext();
  const content = (
    <fieldset className="mb-4">
      <label>Slug</label>
      <input {...register('slug')} className="w-full border required:" />
    </fieldset>
  );
  return content;
}

export default InputSlug;
