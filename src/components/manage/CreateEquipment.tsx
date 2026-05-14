import { manageEquipmentSchema } from '@/types/form';
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

type FormData = z.input<typeof manageEquipmentSchema>;

const API_URL = import.meta.env.VITE_API_URL;

function CreateEquipment() {
  const [open, setOpen] = useState(false);
  const { refetch } = useManage();
  const hookForm = useForm<FormData>({
    resolver: zodResolver(manageEquipmentSchema),
    defaultValues: {
      equipment: [
        {
          name: '',
          description: '',
        },
      ],
    },
  });

  const submitHandler = async function (request) {
    const res = await fetch(`${API_URL}/tag/equipment/`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: getHeaders(),
      credentials: 'include',
    });

    if (!res.ok) {
      return { success: false, message: 'Failed to create equipment.' };
    }

    setOpen(false);
    await refetch();

    const equipment = await res.json();
    if (equipment.message) toast(equipment.message);

    return equipment;
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
          <>Create Equipment Tag</>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Equipment Tag</DrawerTitle>
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
                {...register('equipment.0.name')}
                placeholder="Equipment name"
                className="w-full"
              />
              {errors && errors.equipment && (
                <p className="text-red-500">
                  {errors.equipment[0].name.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mb-4">
              <input
                {...register('equipment.0.description')}
                placeholder="Description"
                className="w-full"
              />
              {errors && errors.equipment && (
                <p className="text-red-500">
                  {errors.equipment[0].description.message}
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

export default CreateEquipment;
