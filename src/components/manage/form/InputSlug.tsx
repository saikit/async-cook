import { useFormContext } from 'react-hook-form';

function InputSlug() {
  const { register } = useFormContext();
  const content = <input {...register('slug')} className="w-full mb-4" />;
  return content;
}

export default InputSlug;
