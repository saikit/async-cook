import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  //TableCaption,
  TableCell,
  //TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from '@/components/ui/scrollarea'
import FoodDataContext from "@/context/FoodDataProvider"
import { useContext } from "react"
import { foodDataType } from "@/context/FoodDataProvider"


function NutritionalInformation() {
    const { foodData } = useContext(FoodDataContext) as { foodData : foodDataType};
    const content = (
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="outline">View Nutritional Information</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className='text-xl mb-2 font-bold uppercase'>Nutritional Information</DialogTitle>
                <DialogDescription className="text-left">
                Source: FoodData Central, U.S. Department of Agriculture
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-96">
                {foodData.map((item) => (
                <Table key={item.description}>
                    <TableHeader>
                    <TableRow>
                        <TableHead><b>{item.description} (100g)</b></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {item.foodNutrients.map((nutrient, index) => (
                        <TableRow key={index}>
                        <TableCell>{nutrient.name}: {nutrient.amount}{nutrient.unitName.toLowerCase()}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                ))}
            </ScrollArea>
            <DialogFooter>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
    return content;
}

export default NutritionalInformation;