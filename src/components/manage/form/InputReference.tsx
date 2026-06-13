import { Link } from 'react-router';
import { useFormContext } from 'react-hook-form';
import FormHelpIcon from './FormHelpIcon';

function InputReference() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchReference = watch('reference');
  const content = (
    <fieldset className="mb-4">
      <label>
        Reference{' '}
        <FormHelpIcon>Add a web page that inspired this recipe.</FormHelpIcon>
      </label>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <input
            {...register('reference')}
            className="w-full border rounded"
            placeholder="Enter URL"
          />
        </div>
        <div className="col-span-1">
          {watchReference && !errors.reference && (
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
    </fieldset>
  );
  return content;
}

export default InputReference;
