import { Calculator } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import Markdown from 'react-markdown'
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
type quantityType = Record<string, {quantity: number, variable: number | undefined}>;
type IngredientGroupType =  {
  text: string,
  calculator: {
    text: string,
  },
  description: Array<{
    name: string,
    quantity: number,
    unit: string,
    variable: number | undefined,
  }>,
}

function RecipeCalculator({ group, updateQuantity, quantityState, ...props } : { group :  IngredientGroupType; updateQuantity: (data: quantityType) => void; quantityState: Record<string, quantityType> } & SliderProps) {
    const [values, setValues] = useState<Record<string, quantityType>>({});
    const [total, setTotal] = useState<number>(0);
    const { calculator, text, description } = group;

    useEffect(() => {        
        const newValues : quantityType = {};
        description.forEach((ingredient) => {
            newValues[ingredient.name] = {
                quantity: (text && text in quantityState) ? quantityState[text][ingredient.name] : ingredient.quantity,
                variable: ingredient.variable
            };
        });
        setValues(newValues);
    }, [description, text, quantityState]);

    const resetCalculator = (event) => {
        event.preventDefault();
        group.description.forEach((ingredient) => {
           setValues((prevValues) => ({
                ...prevValues,
                [ingredient.name]: {
                    ...prevValues[ingredient.name],
                    quantity: ingredient.quantity
                }
            }))
        })
    }

    useEffect(() => {
        let total : number = 0;
        Object.values(values).forEach((ingredient) => {
            const variable : number = ingredient.variable ? parseInt(ingredient.variable) : 0;
            const quantity : number = parseInt(ingredient.quantity) ?? 0;
            total = total + (quantity * variable);
        })

        setTotal(total)
    },[values])

    const handleValueChange = (value : number[], name: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: {
                ...prevValues[name],
                quantity: value[0]
            }
        }))
    }

    const saveChanges = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        updateQuantity({[text] : data})
    }

    return (
        <Dialog>
            <DialogTrigger className="align-top ml-1 print:hidden"><Calculator size={24} color="#57534d" /></DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Ingredient Calculator</DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>{calculator && <Markdown components={createMarkdownComponents()}>{calculator.text}</Markdown>}</DialogDescription>
            <form onSubmit={saveChanges}>
            {description.map((ingredient, key) => {
                const value : number = ingredient.name in values ? (values[ingredient.name] as unknown as {quantity: number}).quantity : ingredient.quantity ?? 0;
                if (ingredient.variable) {
                    return (<div key={key}>
                    <Markdown>{`**${value}${ingredient.unit}** ${ingredient.name}`}</Markdown>
                    <Slider
                        className='my-2'
                        defaultValue={[value]}
                        name={ingredient.name}
                        min={ingredient.quantity < 30 ? 0 : Math.floor(ingredient.quantity / 2)}
                        max={ingredient.quantity * 2}
                        value={[value]}
                        onValueChange={(value) => handleValueChange(value, ingredient.name)}
                        step={1}
                        {...props}>
                    </Slider>
                    </div>)
                }
                else {
                    return (<div key={key}>
                    <Markdown>{`**${total < 1 ? value : total}${ingredient.unit}** ${ingredient.name}`}</Markdown>
                    <Slider
                        className='my-2'
                        defaultValue={[value]}
                        name={ingredient.name}
                        min={0}
                        max={ingredient.quantity * 3}
                        disabled
                        value={[total < 1 ? value : total]}
                        step={1}
                        {...props}>
                    </Slider>
                    </div>)
                }
            })}
            <DialogFooter className='mt-4'>
                <Button variant="outline" onClick={resetCalculator}>Reset</Button>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
    )
}
export default RecipeCalculator