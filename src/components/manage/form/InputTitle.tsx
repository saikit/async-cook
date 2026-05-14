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
        className="text-4xl font-bold text-center lg:text-left block w-full mb-4 h-min focus:outline-none"
        placeholder="Enter recipe title"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </>
  );
  return content;
}

export default InputTitle;
