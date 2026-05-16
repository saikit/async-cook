import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageCategoriesSchema } from '@/types/form';
import { getHeaders } from '@/hooks/getHeaders';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { toast } from 'sonner';
import { useFieldArray } from 'react-hook-form';

const API_URL = import.meta.env.VITE_API_URL;

function ManageCategory() {
  const { manageView, refetch } = useManage();

  const submitHandler = async function (request: FieldValues) {
    const res = await fetch(`${API_URL}/tag/category`, {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: getHeaders(),
      credentials: 'include',
    });

    if (!res.ok) {
      toast('Failed to update category.');
      return;
    }

    await refetch();
    const data = await res.json();
    if (data.message) return toast(data.message);
  };

  const { categories } = manageView;

  const hookForm = useForm({
    resolver: zodResolver(manageCategoriesSchema),
    values: { category: categories },
  });

  const { register, handleSubmit, control } = hookForm;
  const { fields, append } = useFieldArray({
    control: control,
    name: `category`,
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
      {fields.map((field, index) => (
        <fieldset key={field.id} className="grid grid-cols-3 gap-4 mb-4">
          <input
            className="border rounded p-2 w-full col-span-2"
            {...register(`category.${index}.category`)}
            placeholder="Category"
          />
          <input
            {...register(`category.${index}.cat_order`)}
            className="border rounded p-2"
            type="number"
            min="0"
          />
        </fieldset>
      ))}
      <Button type="submit">Update Category</Button>
      <Button
        type="button"
        onClick={() => {
          const lastCatOrder =
            fields.length > 0
              ? Number(fields[fields.length - 1].cat_order || 0)
              : 0;
          append({ cat_order: lastCatOrder + 1 });
        }}
      >
        Add Category
      </Button>
    </form>
  );
}

export default ManageCategory;
