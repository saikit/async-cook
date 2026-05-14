import { manageCategoriesSchema } from '@/types/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getHeaders } from '@/hooks/getHeaders';
import z from 'zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { useManage } from '@/context/Manage/ManageProvider';

type FormData = z.input<typeof manageCategoriesSchema>;

const API_URL = import.meta.env.VITE_API_URL;

function CreateCategory() {
  const [open, setOpen] = useState(false);
  const { refetch } = useManage();
  const hookForm = useForm<FormData>({
    resolver: zodResolver(manageCategoriesSchema),
    defaultValues: {
      category: [
        {
          category: '',
          cat_order: 0,
        },
      ],
    },
  });

  const submitHandler = async function (request) {
    const res = await fetch(`${API_URL}/tag/category/`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: getHeaders(),
      credentials: 'include',
    });

    if (!res.ok) {
      return { success: false, message: 'Failed to create category.' };
    }

    setOpen(false);
    await refetch();

    const category = await res.json();
    if (category.message) toast(category.message);

    return category;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = hookForm;

  const content = (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="mt-4">
          <>Create Category</>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Category Tag</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription asChild>
          <form
            onSubmit={handleSubmit(submitHandler, (errors) => {
              console.error('Validation Errors:', errors);
            })}
            className="p-4"
          >
            <fieldset className="mb-4">
              <input
                {...register('category.0.category')}
                placeholder="Category name"
                className="w-full"
              />
              {errors && errors.category && (
                <p className="text-red-500">
                  {errors.category[0].category.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mb-4">
              <input
                {...register('category.0.cat_order')}
                placeholder="Category order"
                className="w-full"
              />
              {errors && errors.category && (
                <p className="text-red-500">
                  {errors.category[0].cat_order.message}
                </p>
              )}
            </fieldset>
            <Button type="submit">Submit</Button>
          </form>
        </DrawerDescription>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
  return content;
}

export default CreateCategory;
