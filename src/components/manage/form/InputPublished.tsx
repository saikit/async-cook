import { Field, FieldLabel } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

function InputPublished({ hookForm }) {
  const content = (
    <Controller
      name="published"
      control={hookForm.control}
      render={({ field }) => (
        <Field orientation="horizontal">
          <Checkbox
            {...field}
            id="published"
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(!!checked)}
          />
          <FieldLabel htmlFor="published">Published</FieldLabel>
        </Field>
      )}
    />
  );
  return content;
}

export default InputPublished;
