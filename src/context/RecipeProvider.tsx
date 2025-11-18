import React, { createContext, useState, useCallback, ReactElement, useEffect, useMemo } from "react";
import { useParams } from "react-router";


type RecipeContextType = {
    steps: Array<stepType>,
    step: number,
    setStep: React.Dispatch<React.SetStateAction<RecipeContextType['step']>>,
    maxStep: number,
    recipe: RecipeType | undefined,
    sortedIngredients: Array<IngredientsType>,
    filteredInstructions: Array<InstructionsType>,
    optional: OptionalType,
    setOptional: React.Dispatch<React.SetStateAction<RecipeContextType['optional']>>
}

type ChildrenType = { children?: ReactElement | ReactElement[] }

type statusType = "ready" | "active" | "complete";

export type  stepType = {
  ingredients: IngredientsType,
  instructions: InstructionsType,
  background?: string,
}

export type RecipeNoteIconType = {
  category: string,
  note: string,
}

export type InstructionType = {
  text: string,
  optional?: string,
  background?: string,
  context?: Array<RecipeNoteIconType>,
}

export type IngredientType = {
  name?: string,
  description: Array<{
    name: string,
    context?: Array<RecipeNoteIconType>,
    cooked?: boolean
  }>,
  status?: statusType,
  optional?: boolean
}

export type IngredientsType = Array<IngredientType>

export type InstructionsType = Array<InstructionType>

export type RecipeType = {
  steps: Array<stepType>,
  title: string,
  intro?: string,
  reference?: string,
  optional_ingredients?: Array<{name: string}>,
}

type OptionalType = { [key: string]: boolean } 

const RecipeContext = createContext<RecipeContextType>({} as RecipeContextType);

type routerParams = {
    section?: string,
    id: string
}

export const RecipeProvider = ({ children } : ChildrenType) => {
    const [step, setStep] = useState<RecipeContextType['step']>(0);
    const [recipe, setRecipe] = useState<RecipeType>()
    const [optional, setOptional] = useState<OptionalType>({})
    const [maxStep, setMaxStep] = useState<number>(0)
    const { section, id } = useParams<routerParams>();

    const fetchJSONDataFrom = useCallback(async (path : string) => {
      const response = await fetch(path, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const data = await response.json();
      setRecipe(data);
    }, []);
  
    useEffect(() => {
      if (!id) {
        console.error("No recipe ID provided in the URL.");
        return;
      }
      const path = section ? `/data/${section}/${id}.json` : `/data/${id}.json`;
      fetchJSONDataFrom(path);

    }, [fetchJSONDataFrom, section, id]);
    

    const { steps = [] } = recipe || {}

    const filteredIngredients : Array<IngredientsType> = useMemo(() => {
      const result : Array<IngredientsType> = []
      steps.forEach((step) => {
        step.ingredients.forEach((ingredient, index) => {
          result.push([])
          if(
              (!('optional' in ingredient)) || 
              (typeof ingredient.optional === 'string' && optional[ingredient.optional])
            ) {
              result[index].push(ingredient)
            }
        })
      })

      return result.filter(value => Object.keys(value).length !== 0)
    }, [steps, optional])


    const sortedIngredients : Array<IngredientsType> = useMemo(() => {
      const result: Array<IngredientsType> = []
      filteredIngredients.map((group) => {
        group.forEach((ingredient, index) => {
          const status : statusType = step > 0 && step - 1 === index ? "active" : step > 0 && step > index ? "complete" : "ready";
          ingredient.status = status;
        });
        result.push(group);
      });
      return result
    }, [step, filteredIngredients])

    useEffect(() => {
        const initialOptionalState: OptionalType = {};
        recipe?.optional_ingredients?.forEach(ingredient => {
            initialOptionalState[ingredient.name] = false;
        });
        setOptional(initialOptionalState);
    }, [recipe]);

    const filteredInstructions: Array<InstructionsType> = useMemo(() => {
      const result: Array<InstructionsType> = [];
      steps.forEach((step, index) => {
        result.push([])
        step.instructions.forEach(instruction => {
          if (
            !('optional' in instruction) || 
            (typeof instruction.optional === 'string' && optional[instruction.optional])
          ) {
            result[index].push(instruction);
          }
        })
      })

      return result.filter(value => Object.keys(value).length !== 0)
    }, [optional, steps])

    useEffect(() => {
      setMaxStep(filteredInstructions.length)
    }, [filteredInstructions])

    return (
      <RecipeContext.Provider value={{steps, step, setStep, recipe, maxStep, sortedIngredients, filteredInstructions, setOptional, optional}}>
          <>{children}</>
      </RecipeContext.Provider>
    )
}

export default RecipeContext