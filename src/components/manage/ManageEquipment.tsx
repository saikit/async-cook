import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageEquipmentSchema } from '@/types/form';
import { getHeaders } from '@/hooks/getHeaders';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { EquipmentType } from '@/types/api';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL;

function EquipmentForm({ equip }: { equip: EquipmentType }) {
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

    const data = await res.json();
    if (data.message) return toast(data.message);
  };

  const hookForm = useForm({
    resolver: zodResolver(manageEquipmentSchema),
    values: {
      equipment: [
        {
          id: equip.id,
          name: equip.name,
          description: equip.description,
        },
      ],
    },
  });

  const { register, handleSubmit } = hookForm;

  return (
    <form
      className="mb-4 p-4 border rounded bg-card text-card-foreground shadow-sm"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="grid gap-3">
        <fieldset>
          <label className="text-xs font-bold uppercase text-muted-foreground">
            Name
          </label>
          <input
            className="w-full border rounded p-2 mt-1"
            {...register(`equipment.0.name`)}
          />
        </fieldset>
        <fieldset>
          <label className="text-xs font-bold uppercase text-muted-foreground">
            Description
          </label>
          <textarea
            rows="3"
            className="w-full border rounded p-2 mt-1"
            {...register(`equipment.0.description`)}
          />
        </fieldset>
        <Button type="submit" size="sm" className="w-fit ml-auto">
          Update Equipment
        </Button>
      </div>
    </form>
  );
}

function ManageEquipment() {
  const { manageView } = useManage();
  const { equipment } = manageView;

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-4">
      {equipment?.map((equip) => (
        <EquipmentForm key={equip.id} equip={equip} />
      ))}
    </div>
  );
}

export default ManageEquipment;
