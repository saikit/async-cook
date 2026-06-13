import { useFormContext } from 'react-hook-form';

function InputTitle() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const content = (
    <>
      <textarea
        {...register('title')}
        className="text-4xl font-bold text-center lg:text-left block w-full mb-2 pb-2 h-min focus:outline-none"
        placeholder="Enter recipe title"
        rows={2}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </>
  );
  return content;
}

export default InputTitle;
