import { Link } from 'react-router';
import { useFormContext } from 'react-hook-form';

function InputReference() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchReference = watch('reference');
  const content = (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-3">
        <input
          {...register('reference')}
          className="w-full"
          placeholder="Add a valid reference url"
        />
      </div>
      <div className="col-span-1">
        {!errors.reference && (
          <Link
            className="text-blue-700 underline"
            target="_blank"
            to={watchReference}
          >
            <small>Preview URL</small>
          </Link>
        )}
      </div>
    </div>
  );
  return content;
}

export default InputReference;
