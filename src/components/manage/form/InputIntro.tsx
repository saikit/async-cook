import { useFormContext } from 'react-hook-form';

function InputIntro() {
  const { register } = useFormContext();
  const content = (
    <textarea
      placeholder="Add recipe description"
      {...register('intro')}
      className="w-full h-min mb-4"
    />
  );
  return content;
}

export default InputIntro;
