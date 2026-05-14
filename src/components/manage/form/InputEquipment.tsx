import { useManage } from '@/context/Manage/ManageProvider';
import { EquipmentType } from '@/types/api';
import { useFormContext } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

function InputEquipment() {
  const { register, control } = useFormContext();
  const { manageView } = useManage();
  const { equipment } = manageView;
  const watchEquipment =
    useWatch({
      control,
      name: 'equipment',
    }) || [];

  const content = (
    <fieldset>
      {equipment?.map((equip) => (
        <div key={`equipment-${equip.id}`} className="flex items-center gap-2">
          <input
            {...register('equipment')}
            type="checkbox"
            value={equip.id}
            id={`equipment-${equip.id}`}
            checked={
              Array.isArray(watchEquipment) &&
              watchEquipment.some(
                (item: EquipmentType) => (item?.id ?? item) == equip.id,
              )
            }
          />
          <label htmlFor={`equipment-${equip.id}`}>{equip.name}</label>
        </div>
      ))}
    </fieldset>
  );
  return content;
}

export default InputEquipment;
