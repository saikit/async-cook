import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from './ui/badge';
import { EquipmentType } from '@/types/api';
import { twNeutralColors } from '@/lib/constants';

function RecipeEquipmentTag({
  equip,
  index,
}: {
  equip: EquipmentType;
  index?: number;
}) {
  return (
    <Popover key={equip.name}>
      <PopoverTrigger
        className="align-top mx-1 print:hidden"
        title={equip.name}
      >
        <Badge className={twNeutralColors[index || 0]} variant="secondary">
          {equip.name}
        </Badge>
      </PopoverTrigger>
      <PopoverContent>{equip.description}</PopoverContent>
    </Popover>
  );
}
export default RecipeEquipmentTag;
