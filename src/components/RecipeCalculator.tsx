import { Calculator } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import Markdown from 'react-markdown'
import { IngredientType } from '@/context/RecipeProvider';
import { Slider } from './ui/slider';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';

const createMarkdownComponents = () => ({
    code(props: React.HTMLProps<HTMLElement>) {
      const { children, ...rest } = props;
      return (
        <code className="bg-slate-200 rounded p-1 font-mono text-sm text-center block" {...rest}>
            {children}
        </code>
      );
    }});

type SliderProps = React.ComponentProps<typeof Slider>;

function RecipeCalculator({ group, updateQuantity, quantityState, ...props } : { group :  IngredientType } & SliderProps) {
    const [values, setValues] = useState<{}>({});
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {        
        const newValues : Record<string, { quantity: number | undefined; variable: number | undefined }> = {};
        group.description.forEach((ingredient) => {
            newValues[ingredient.name] = {
                quantity: group.text in quantityState ? quantityState[group.text][ingredient.name] : ingredient.quantity,
                variable: ingredient.variable
            };
        });
        setValues(newValues);
    }, [group.description, quantityState]);

    const calculateTotal = () => {
        let total = 0;
        Object.values(values).forEach((ingredient) => {
            const variable = ingredient.variable ? ingredient.variable : 0;
            total = total + (ingredient.quantity * variable);
        })

        setTotal(total)
    }

    const handleValueChange = (value, name) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: {
                ...prevValues[name],
                quantity: value[0]
            }
        }))
    }

    const saveChanges = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        updateQuantity({[group.text] : data})
    }

    return (
        <Dialog>
            <DialogTrigger className="align-top ml-1 print:hidden"><Calculator size={24} color="#57534d" /></DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Ingredient Calculator</DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>{group.calculator && <Markdown components={createMarkdownComponents()}>{group.calculator.text}</Markdown>}</DialogDescription>
            <form onSubmit={saveChanges}>
            {group.description.map((ingredient, key) => {
                const quantity = ingredient.name in values ? values[ingredient.name].quantity : ingredient.quantity
                if (ingredient.variable) {
                    return (<div key={key}>
                    <Markdown>{`**${quantity}${ingredient.unit}** ${ingredient.name}`}</Markdown>
                    <Slider
                        className='my-2'
                        defaultValue={[quantity]}
                        name={ingredient.name}
                        min={ingredient.quantity < 30 ? 0 : Math.floor(ingredient.quantity / 2)}
                        max={ingredient.quantity * 2}
                        onValueChange={(value) => handleValueChange(value, ingredient.name)}
                        onValueCommit={() => {
                            calculateTotal()
                        }}
                        step={1}
                        {...props}>
                    </Slider>
                    </div>)
                }
                else {
                    return (<div key={key}>
                    <Markdown>{`**${total < 1 ? quantity : total}${ingredient.unit}** ${ingredient.name}`}</Markdown>
                    <Slider
                        className='my-2'
                        defaultValue={[quantity]}
                        name={ingredient.name}
                        min={0}
                        max={ingredient.quantity * 3}
                        disabled
                        value={[total < 1 ? quantity : total]}
                        step={1}
                        {...props}>
                    </Slider>
                    </div>)
                }
            })}
            <DialogFooter className='mt-4'>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
    )
}
export default RecipeCalculator