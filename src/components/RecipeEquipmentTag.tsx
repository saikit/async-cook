import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from './ui/badge';
import { EquipmentType } from '@/types/api';
import { twNeutralColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

function RecipeEquipmentTag({
  equip,
  index,
  className,
}: {
  equip: EquipmentType;
  index?: number;
  className?: string;
}) {
  return (
    <Popover key={equip.name}>
      <PopoverTrigger
        className={cn('align-middle print:hidden', className)}
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
