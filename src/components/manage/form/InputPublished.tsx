import { useFormContext } from 'react-hook-form';

function InputPublished() {
  const { register } = useFormContext();
  const content = (
    <div className="flex items-center gap-2 mb-4">
      <input type="checkbox" id="published" {...register('published')} />
      <label htmlFor="published">Published</label>
    </div>
  );
  return content;
}

export default InputPublished;
