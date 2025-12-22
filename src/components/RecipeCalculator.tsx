import { Calculator } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Markdown from "react-markdown";
import { Slider } from "./ui/slider";
import { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IngredientType } from "@/context/RecipeProvider";
import { quantityType } from "./RecipeIngredientsList";

const createMarkdownComponents = () => ({
  code(props: React.HTMLProps<HTMLElement>) {
    const { children, ...rest } = props;
    return (
      <code
        className="bg-slate-200 rounded p-1 font-mono text-sm text-center block"
        {...rest}
      >
        {children}
      </code>
    );
  },
});

type SliderProps = React.ComponentProps<typeof Slider>;
type valueType = { quantity: number; variable?: number };

function RecipeCalculator({
  group,
  updateQuantity,
  quantityState,
  ...props
}: {
  group: IngredientType;
  updateQuantity: (data: quantityType) => void;
  quantityState: quantityType;
} & SliderProps) {
  const [values, setValues] = useState<Record<string, valueType>>({});
  const { calculator, text, description } = group as {
    calculator: IngredientType["calculator"];
    text: keyof quantityType;
    description: IngredientType["description"];
  };

  useEffect(() => {
    const newValues: Record<string, valueType> = {};
    description.forEach((ingredient) => {
      const quantityFromState = quantityState[text][ingredient.name];

      newValues[ingredient.name] = {
        quantity: quantityFromState ?? ingredient.quantity ?? 0,
        variable: ingredient.variable,
      };
    });
    setValues(newValues);
  }, [description, text, quantityState]);

  const resetCalculator = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    const resetValues: Record<string, valueType> = {};

    description.forEach((ingredient) => {
      resetValues[ingredient.name] = {
        ...(values[ingredient.name] ?? {}),
        quantity: ingredient.quantity ?? 0,
      };
    });

    setValues(resetValues);
  };

  const total = useMemo(() => {
    let total: number = 0;
    Object.values(values).map((ingredient) => {
      const variable: number = ingredient.variable
        ? parseInt(String(ingredient.variable))
        : 0;
      const quantity: number = ingredient.quantity
        ? parseInt(String(ingredient.quantity))
        : 0;
      total = total + quantity * variable;
    });

    return total;
  }, [values]);

  const handleValueChange = (value: number[], name: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        quantity: value[0],
      },
    }));
  };

  const saveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, number> = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        typeof value === "string" ? Number(value) : 0,
      ])
    );

    updateQuantity({ [text]: data });
  };

  return (
    <Dialog>
      <DialogTrigger
        className="align-top ml-1 print:hidden"
        title="Ingredient Calculator"
      >
        <Calculator size={24} color="#57534d" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingredient Calculator</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          {calculator && (
            <Markdown components={createMarkdownComponents()}>
              {calculator.text}
            </Markdown>
          )}
        </DialogDescription>
        <form onSubmit={saveChanges}>
          {description.map((ingredient, key) => {
            const value: number =
              ingredient.name in values
                ? values[ingredient.name].quantity
                : ingredient.quantity ?? 0;
            if (ingredient.variable) {
              return (
                <div key={key}>
                  <Markdown>{`**${value}${ingredient.unit}** ${ingredient.name}`}</Markdown>
                  <Slider
                    className="my-2"
                    defaultValue={[value]}
                    name={ingredient.name}
                    min={
                      ingredient.quantity && ingredient.quantity > 30
                        ? Math.floor(ingredient.quantity / 2)
                        : 0
                    }
                    max={ingredient.quantity ? ingredient.quantity * 2 : 100}
                    value={[value]}
                    onValueChange={(value) =>
                      handleValueChange(value, ingredient.name)
                    }
                    step={1}
                    {...props}
                  ></Slider>
                </div>
              );
            } else {
              return (
                <div key={key}>
                  <Markdown>{`**${total < 1 ? value : total}${
                    ingredient.unit
                  }** ${ingredient.name}`}</Markdown>
                  <Slider
                    className="my-2"
                    defaultValue={[value]}
                    name={ingredient.name}
                    min={0}
                    max={ingredient.quantity ? ingredient.quantity * 3 : 1000}
                    disabled
                    value={[total < 1 ? value : total]}
                    step={1}
                    {...props}
                  ></Slider>
                </div>
              );
            }
          })}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default RecipeCalculator;
