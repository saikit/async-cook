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
import { Link } from "react-router"
import ActionButton from "./ActionButton"


function NutritionalInformation() {
    const { foodData } = useContext(FoodDataContext) as { foodData : foodDataType};
    const content = (
        <Dialog>
            <DialogTrigger asChild>
            <ActionButton>
                <>View nutritional information</>
            </ActionButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className='text-xl mb-2 font-bold uppercase'>Nutritional Information</DialogTitle>
                <DialogDescription className="text-left">
                Source: <Link to="https://fdc.nal.usda.gov/" target="_blank" className="text-blue-500 underline">FoodData Central</Link>, U.S. Department of Agriculture
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-96">
                {foodData.map((item) => (
                <Table className="mb-2" key={item.description}>
                    <TableHeader>
                    <TableRow>
                        <TableHead><b>{item.description} (100g)</b></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {item.foodNutrients.sort((a, b) => a.number - b.number).map((nutrient, index) => (
                        <TableRow key={index}>
                        <TableCell>{nutrient.name}: <b>{nutrient.amount}{nutrient.unitName.toLowerCase()}</b></TableCell>
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