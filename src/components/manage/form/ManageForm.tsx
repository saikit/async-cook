import { ReactNode } from 'react';
import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';

interface ManageFormProps<TFieldValues extends FieldValues = FieldValues> {
  hookForm: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  children: ReactNode;
}

function ManageForm<TFieldValues extends FieldValues = FieldValues>({
  hookForm,
  onSubmit,
  children,
}: ManageFormProps<TFieldValues>) {
  const content = (
    <FormProvider {...hookForm}>
      <form
        className="p-4"
        id="form"
        onSubmit={hookForm.handleSubmit(onSubmit, (errors) => {
          console.error('Validation Errors:', errors);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
  return content;
}

export default ManageForm;
