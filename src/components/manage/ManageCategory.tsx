import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageCategoriesSchema } from '@/types/form';
import { getHeaders } from '@/hooks/getHeaders';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { CategoryType } from '@/types/api';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL;

function CategoryForm({ category }: { category: CategoryType }) {
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

    const data = await res.json();
    if (data.message) return toast(data.message);
  };

  const hookForm = useForm({
    resolver: zodResolver(manageCategoriesSchema),
    values: {
      category: [
        {
          id: category.id,
          category: category.category,
          cat_order: category.cat_order,
        },
      ],
    },
  });

  const { register, handleSubmit } = hookForm;

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mb-4 grid gap-2 grid-cols-4"
    >
      <input
        className="border rounded p-2 w-full col-span-2"
        {...register(`category.0.category`)}
      />
      <input
        {...register(`category.0.cat_order`)}
        className="border rounded p-2 w-full"
        type="number"
        min="0"
      />
      <Button type="submit" size="sm" className="w-fit ml-auto self-center">
        Update
      </Button>
    </form>
  );
}

function ManageCategory() {
  const { manageView } = useManage();
  const { categories }: { categories: CategoryType[] } = manageView;

  return (
    <div>
      {categories?.map((category) => (
        <CategoryForm key={category.id} category={category} />
      ))}
    </div>
  );
}

export default ManageCategory;
