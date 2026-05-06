import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Controller } from 'react-hook-form';

function InputTitle({ hookForm }) {
  const content = (
    <Controller
      name="title"
      control={hookForm.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Title</FieldLabel>
          <Textarea
            {...field}
            placeholder="Enter recipe title"
            aria-invalid={fieldState.invalid}
            id={field.name}
            rows={3}
            className="text-4xl font-bold text-center h-min"
          ></Textarea>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
  return content;
}

export default InputTitle;
