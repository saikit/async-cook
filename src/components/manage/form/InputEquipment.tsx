import {
  Field,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { useManage } from '@/context/Manage/ManageProvider';

function InputEquipment({ hookForm }) {
  const { manageView } = useManage();
  const { equipment } = manageView;
  const content = (
    <Controller
      name="equipment"
      control={hookForm.control}
      render={({ field, fieldState }) => (
        <FieldSet>
          <FieldLegend variant="label">Equipment tags</FieldLegend>
          {equipment?.map((equip) => (
            <Field
              orientation="horizontal"
              key={equip.id}
              data-invalid={fieldState.invalid}
            >
              <Checkbox
                id={`equipment-${equip.id}`}
                value={equip.id.toString()}
                checked={field.value?.some(
                  (e: { id: number }): boolean => e.id === equip.id,
                )}
                onCheckedChange={(checked) => {
                  const current = field.value || [];
                  const next = checked
                    ? [...current, equip]
                    : current.filter(
                        (e: { id: number }): boolean => e.id !== equip.id,
                      );
                  field.onChange(next);
                }}
              />
              <FieldLabel htmlFor={`equipment-${equip.id}`}>
                {equip.name}
              </FieldLabel>
            </Field>
          ))}
        </FieldSet>
      )}
    />
  );
  return content;
}

export default InputEquipment;
