import { ReactElement } from 'react';
import { FormProvider } from 'react-hook-form';

type ChildrenType = { children?: ReactElement | ReactElement[] };

function ManageForm({ hookForm, onSubmit, children }) {
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
