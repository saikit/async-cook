import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

function InputIntro({ hookForm }) {
  const content = (
    <Controller
      name="intro"
      control={hookForm.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            {...field}
            placeholder="Enter recipe description"
          ></Textarea>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
  return content;
}

export default InputIntro;
