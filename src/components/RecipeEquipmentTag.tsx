import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Badge } from "./ui/badge"
import { EquipmentType } from "@/context/RecipeProvider"
import { twNeutralColors } from "@/lib/constants"
  
  

function RecipeEquipmentTag({ tag, index } : { tag : {'equipment': EquipmentType}, index?: number}) {
    const { equipment } = tag
    return (
        <Popover>
            <PopoverTrigger className="align-top mx-1 print:hidden" title={equipment.name}><Badge className={twNeutralColors[index || 0]} variant="secondary">{equipment.name}</Badge></PopoverTrigger>
            <PopoverContent><p>{equipment.description}</p></PopoverContent>
        </Popover>
    )
}
export default RecipeEquipmentTag