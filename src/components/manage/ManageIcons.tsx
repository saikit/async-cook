import { useForm, FieldValues, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageIconSchema } from '@/types/form';
import { apiClient } from '@/lib/apiClient';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL;

function ManageIcons() {
  const { manageView, refetch } = useManage();

  const submitHandler = async function (formData: FieldValues) {
    try {
      const data = await apiClient<any>(`${API_URL}/tag/icon`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        includeAuth: true,
      });
      await refetch();
      if (data.message) return toast(data.message);
    } catch (error) {
      toast('Failed to update icon.');
    }
  };

  const { icons } = manageView;

  const hookForm = useForm({
    resolver: zodResolver(manageIconSchema),
    values: {
      icons: icons.map((e) => ({
        id: e.id,
        category: e.category,
      })),
    },
  });

  const { register, handleSubmit, control } = hookForm;
  const { fields, append } = useFieldArray({
    control: control,
    name: `icons`,
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(submitHandler, (errors) => {
          console.error('Validation Errors:', errors);
        })(e);
      }}
      className="mb-4"
    >
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        {fields.map((field, index) => (
          <fieldset className="mb-4" key={field.id}>
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Name
            </label>
            <input
              className="w-full border rounded p-2 mt-1"
              {...register(`icons.${index}.category`)}
            />
          </fieldset>
        ))}
      </div>
      <fieldset className="contents">
        <Button type="submit" className="mr-2">
          Update Icons
        </Button>
        <Button
          type="button"
          onClick={() => {
            append({ category: '' });
          }}
        >
          Add Icon
        </Button>
      </fieldset>
    </form>
  );
}

export default ManageIcons;
