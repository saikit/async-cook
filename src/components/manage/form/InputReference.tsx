import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import { useState } from 'react';

function InputReference({ hookForm }) {
  const [showReference, setShowReference] = useState<string | undefined>(
    undefined,
  );
  const content = (
    <Controller
      name="reference"
      control={hookForm.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Reference</FieldLabel>
          <Input
            {...field}
            value={field.value || ''}
            onChange={(e) => {
              field.onChange(e);
              setShowReference(e.target.value);
            }}
            placeholder="Enter valid url"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {showReference && !fieldState.invalid && (
            <Link
              className="text-blue-700 underline"
              target="_blank"
              to={showReference}
            >
              <small>Preview URL</small>
            </Link>
          )}
        </Field>
      )}
    />
  );
  return content;
}

export default InputReference;
