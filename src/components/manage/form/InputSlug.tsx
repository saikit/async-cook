import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';

function InputSlug({ hookForm }) {
  const content = (
    <Controller
      name="slug"
      control={hookForm.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Slug</FieldLabel>
          <Input {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
  return content;
}

export default InputSlug;
