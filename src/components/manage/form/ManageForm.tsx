import { FieldGroup } from '@/components/ui/field';
import { ReactElement } from 'react';

type ChildrenType = { children?: ReactElement | ReactElement[] };

function ManageForm({ hookForm, onSubmit, children }) {
  const content = (
    <form
      className="p-4"
      id="form"
      onSubmit={hookForm.handleSubmit(onSubmit, (errors) => {
        console.error('Validation Errors:', errors);
      })}
    >
      <FieldGroup>{children}</FieldGroup>
    </form>
  );
  return content;
}

export default ManageForm;
