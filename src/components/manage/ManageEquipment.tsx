import { useForm, FieldValues, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageEquipmentSchema } from '@/types/form';
import { getHeaders } from '@/hooks/getHeaders';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL;

function ManageEquipment() {
  const { manageView, refetch } = useManage();

  const submitHandler = async function (request: FieldValues) {
    const res = await fetch(`${API_URL}/tag/equipment`, {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: getHeaders(),
      credentials: 'include',
    });

    if (!res.ok) {
      toast('Failed to update equipment.');
      return;
    }

    await refetch();
    const data = await res.json();
    if (data.message) return toast(data.message);
  };

  const { equipment } = manageView;

  if (!equipment) {
    return;
  }

  const hookForm = useForm({
    resolver: zodResolver(manageEquipmentSchema),
    values: { equipment: equipment },
  });

  const { register, handleSubmit, control } = hookForm;
  const { fields, append } = useFieldArray({
    control: control,
    name: `equipment`,
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        {fields.map((field, index) => (
          <div
            className="border rounded bg-card text-card-foreground shadow-sm p-4 grid gap-3"
            key={field.id}
          >
            <fieldset>
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Name
              </label>
              <input
                className="w-full border rounded p-2 mt-1"
                {...register(`equipment.${index}.name`)}
              />
            </fieldset>
            <fieldset>
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Description
              </label>
              <textarea
                rows="3"
                className="w-full border rounded p-2 mt-1"
                {...register(`equipment.${index}.description`)}
              />
            </fieldset>
          </div>
        ))}
      </div>
      <fieldset className="contents">
        <Button type="submit">Update Equipment</Button>
        <Button
          type="button"
          onClick={() => {
            append();
          }}
        >
          Add Equipment
        </Button>
      </fieldset>
    </form>
  );
}

export default ManageEquipment;
