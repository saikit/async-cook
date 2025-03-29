import React, { createContext, useState, ReactElement, useEffect, useMemo } from "react";
import data from "../data/pasta.json"

type RecipeContextType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<RecipeContextType['step']>>,
    maxStep: number,
    recipe: RecipeType | undefined,
    sortedIngredients: Array<IngredientsType>,
    optionalIngredients: IngredientsType,
    filteredInstructions: Array<InstructionsType>,
    optional: OptionalType,
    setOptional: React.Dispatch<React.SetStateAction<RecipeContextType['optional']>>
}

type ChildrenType = { children?: ReactElement | ReactElement[] }

export type IngredientsType = Array<
{
  name: string,
  description: string[] | string,
  status?: "ready" | "active" | "complete",
  optional?: boolean
}>

export type InstructionsType = Array<{
  step: string,
  background?: string,
  optional?: string
}>

export type RecipeType = {
  ingredients: Array<IngredientsType>,
  instructions: Array<InstructionsType>,
  title: string,
  description?: string,
}

type OptionalType = { [key: string]: boolean } 

const RecipeContext = createContext<RecipeContextType>({} as RecipeContextType);

export const RecipeProvider = ({ children } : ChildrenType) => {
    const [step, setStep] = useState<RecipeContextType['step']>(0);
    const [recipe, setRecipe] = useState<RecipeType>()
    const [optional, setOptional] = useState<OptionalType>({})
    const [maxStep, setMaxStep] = useState<number>(0)

    useEffect(() => {
      setRecipe(data as RecipeType)
    },[optional])

    const { instructions = [], ingredients = [] } = recipe || {}

    const filteredIngredients : Array<IngredientsType> = useMemo(() => {
      const result : Array<IngredientsType> = []
      ingredients.forEach((group, index) => {
        result.push([])
        group.forEach((ingredient) => {
          if(
              (!('optional' in ingredient)) || 
              ('optional' in ingredient && (optional[ingredient.name] || (typeof ingredient.optional === 'string' && optional[ingredient.optional])))) {
              result[index].push(ingredient)
            }
        })
      })

      return result.filter(value => Object.keys(value).length !== 0)
    }, [ingredients, optional])


    const sortedIngredients : Array<IngredientsType> = useMemo(() => {
      const result: Array<IngredientsType> = []
      filteredIngredients.map((group, index) => {
        const status = step > 0 && step - 1 === index ? "active" : step > 0 && step > index ? "complete" : "ready";
        group.forEach(ingredient => {
          ingredient.status = status;
        });
        if (status === 'active') 
          result.unshift(group);
        else if (status === 'complete')
          result.push(group);
        else
          result.splice(result.length, 0, group);
      });
      return result
    }, [step, filteredIngredients])

    const optionalIngredients: IngredientsType = useMemo(() => {
        const result: IngredientsType = [];
        ingredients.forEach((group) => {
            group.forEach(ingredient => {
                if ('optional' in ingredient && typeof ingredient.optional !== 'undefined' && 'cooked' in ingredient === false) {
                    result.push(ingredient);
                }
            });
        });
        return result;
    }, [ingredients]);

    useEffect(() => {
        const initialOptionalState: OptionalType = {};
        optionalIngredients.forEach(ingredient => {
            initialOptionalState[ingredient.name] = false;
        });
        setOptional(initialOptionalState);
    }, [optionalIngredients]);

    const filteredInstructions: Array<InstructionsType> = useMemo(() => {
      const result: Array<InstructionsType> = [];
      instructions.forEach((group, index) => {
        result.push([])
        group.forEach(instruction => {
          if (
            !('optional' in instruction) || 
            (typeof instruction.optional === 'string' && optional[instruction.optional])
          ) {
            result[index].push(instruction);
          }
        })
      })
      return result.filter(value => Object.keys(value).length !== 0)
    }, [optional, instructions])

    useEffect(() => {
      setMaxStep(filteredInstructions.length)
    }, [filteredInstructions])

    return (
      <RecipeContext.Provider value={{step, setStep, recipe, maxStep, optionalIngredients, sortedIngredients, filteredInstructions, setOptional, optional}}>
          <>{children}</>
      </RecipeContext.Provider>
    )
}

export default RecipeContext