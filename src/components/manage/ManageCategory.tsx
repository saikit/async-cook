import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageCategoriesSchema } from '@/types/form';
import { apiClient } from '@/lib/apiClient';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { toast } from 'sonner';
import { useFieldArray } from 'react-hook-form';
import { CategoryType } from '@/types/api';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable, isSortable } from '@dnd-kit/react/sortable';
import { GripHorizontal } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

function SortableItem({
  id,
  index,
  children,
}: {
  id: string;
  index: number;
  children: React.ReactNode;
}) {
  const { ref } = useSortable({ id, index });
  return (
    <div ref={ref} className="flex items-center gap-2 mb-4">
      <div className="cursor-grab p-2 hover:bg-slate-100 rounded text-slate-400">
        <GripHorizontal size={20} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function ManageCategory() {
  const { manageView, refetch } = useManage();

  const submitHandler = async function (formData: FieldValues) {
    try {
      const data = await apiClient<CategoryType>(`${API_URL}/tag/category`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        includeAuth: true,
      });
      await refetch();
      if (data.message) return toast(data.message);
    } catch (error) {
      toast('Failed to update category.');
    }
  };

  const { categories } = manageView;

  const hookForm = useForm({
    resolver: zodResolver(manageCategoriesSchema),
    values: {
      category: categories.map((cat) => ({
        id: cat.id,
        category: cat.category,
        cat_order: (cat as CategoryType).cat_order ?? 0,
      })),
    },
  });

  const { register, handleSubmit, control, getValues, setValue } = hookForm;
  const { fields, append, move } = useFieldArray({
    control: control,
    name: `category`,
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { source } = event.operation;
          if (isSortable(source)) {
            // Ensure both source and target are defined
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
              // move() keeps the DOM elements stable by preserving their React keys/IDs
              move(initialIndex, index);

              // Sync the cat_order values with the new array order
              const updatedValues = getValues('category');
              updatedValues.forEach((_, i) => {
                setValue(`category.${i}.cat_order`, i, { shouldDirty: true });
              });
            }
          }
        }}
      >
        <div>
          {fields.map((field, index) => (
            <SortableItem id={field.id} key={field.id} index={index}>
              <fieldset className="grid grid-cols-3 gap-4">
                <input
                  className="border rounded p-2 w-full col-span-3"
                  {...register(`category.${index}.category`)}
                  placeholder="Category"
                />
              </fieldset>
            </SortableItem>
          ))}
        </div>
      </DragDropProvider>
      <Button type="submit" className="mr-2">
        Update Category
      </Button>
      <Button
        type="button"
        onClick={() => {
          const lastCatOrder =
            fields.length > 0
              ? Number(fields[fields.length - 1].cat_order || 0)
              : 0;
          append({ category: '', cat_order: lastCatOrder + 1 });
        }}
      >
        Add Category
      </Button>
    </form>
  );
}

export default ManageCategory;
