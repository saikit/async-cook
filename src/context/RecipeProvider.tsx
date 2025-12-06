import React, { createContext, useState, useCallback, ReactElement, useEffect, useMemo } from "react";
import { useParams } from "react-router";

type RecipeContextType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<RecipeContextType['step']>>,
    maxStep: number,
    recipe: RecipeType | undefined,
    sortedIngredients: IngredientsType,
    filteredInstructions: FilteredInstructionsType,
    optional: OptionalType,
    setOptional: React.Dispatch<React.SetStateAction<RecipeContextType['optional']>>,
    fdc_ids?: number[],
    isComplete?: boolean,
}

type ChildrenType = { children?: ReactElement | ReactElement[] }
type statusType = "ready" | "active" | "complete";

export type stepType = {
  ingredients: IngredientType,
  instructions: InstructionsType,
  background?: string,
}

export type RecipeNoteIconType = {
  category: string,
  note: string,
}

export type InstructionType = {
  background?: string,
  title?: string,
  text: string,
  optional?: string,
  context?: Array<RecipeNoteIconType>
}

export type InstructionsType = {
  instructions: Array<InstructionType>
}

export type DescriptionType = {
  name: string,
  context?: Array<RecipeNoteIconType>,
  cooked?: boolean,
  fdc_id?: number
}

export type IngredientType = {
  text?: string,
  description: Array<DescriptionType>,
  optional?: string,
  status?: statusType
}

export type IngredientsType = Array<IngredientType>
export type FilteredInstructionsType = Array<InstructionsType>

export type RecipeType = {
  steps: Array<stepType>,
  title: string,
  intro?: string,
  reference?: string,
  optional_ingredients?: string
}

type OptionalType = { [key: string]: boolean } 

const RecipeContext = createContext<RecipeContextType>({} as RecipeContextType);

type routerParams = {
    section?: string,
    id: string
}

const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children } : ChildrenType) => {
    const [step, setStep] = useState<RecipeContextType['step']>(0);
    const [recipe, setRecipe] = useState<RecipeType>()
    const [optional, setOptional] = useState<OptionalType>({})
    const [maxStep, setMaxStep] = useState<number>(0)
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const { section, id } = useParams<routerParams>();

    const fetchJSONDataFrom = useCallback(async (path : string) => {
      const response = await fetch(path, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const data = await response.json();
      setRecipe(data.data);
      setIsComplete(true);
    }, []);
  
    useEffect(() => {
      if (!id) {
        console.error("No recipe ID provided in the URL.");
        return;
      }
      const path = `${API_URL}/recipes/${id}`;
      fetchJSONDataFrom(path);

    }, [fetchJSONDataFrom, section, id]);
    
    const { steps = [] } = recipe ?? { steps: [] };

    const fdc_ids: number[] = useMemo(() => {
      const ids: number[] = [];
      steps.forEach((step) => {
        const { ingredients } : { ingredients : IngredientType } = step
        ingredients.description.forEach((item) => {
            if('fdc_id' in item && item.fdc_id) {
                ids.push(item.fdc_id);
            }
        })
      });
      return ids;
    }, [steps]);

    const filteredIngredients : IngredientsType = useMemo(() => {
      const result : IngredientsType = [];
      steps.forEach((step) => {
        const { ingredients } : { ingredients : IngredientType } = step
        const filtered : IngredientType = {
          ...ingredients,
          description: ingredients.description.filter((ingredient : DescriptionType) => {
              return (!('optional' in ingredient ) || typeof ingredient.optional === 'string' && optional[ingredient.optional])
          })
        }
        if((!('optional' in filtered)) || (typeof filtered.optional === 'string' && optional[filtered.optional]))
          result.push(filtered);
      })
      return result;
      
    }, [steps, optional])

    const sortedIngredients : IngredientsType = useMemo(() => {
      const result: IngredientsType = []
      filteredIngredients.map((group, index) => {
        const sorted : IngredientType = {
          ...group,
          status: step > 0 && step - 1 === index ? "active" : step > 0 && step > index ? "complete" : "ready"
        }
        result.push(sorted)
      });

      const categoryOrder = {
        'active': 0,
        'ready': 1,
        'complete': 2
      }

      return result.sort((a, b) => {
        const categoryAOrder = categoryOrder[a.status || 'ready'];
        const categoryBOrder = categoryOrder[b.status || 'ready'];
        if (categoryAOrder !== categoryBOrder) {
          return categoryAOrder - categoryBOrder;
        }

        return 0
      });
    }, [step, filteredIngredients])

    useEffect(() => {
        const initialOptionalState: OptionalType = {};
        let optionalArray : string[] = [];
        if(typeof recipe?.optional_ingredients === 'string' && recipe?.optional_ingredients !== null) {
          optionalArray = recipe.optional_ingredients.split(',')
          optionalArray.forEach(ingredient => {
              initialOptionalState[ingredient] = false;
          });
          setOptional(initialOptionalState);
        }
    }, [recipe]);

    const filteredInstructions: FilteredInstructionsType = useMemo(() => {
      const result: FilteredInstructionsType = [];
      steps.forEach((step : stepType) => {
        const { instructions } = step
        const filtered : InstructionsType = {
          ...instructions,
          instructions: Array.isArray(instructions) ? instructions.filter((instruction : InstructionType) => {
              return (!('optional' in instruction) || 
            (typeof instruction.optional === 'string' && optional[instruction.optional]))
          }) : []
        }
        if(filtered.instructions.length > 0)
          result.push(filtered);
      })

      return result
    }, [optional, steps])

    useEffect(() => {
      setMaxStep(filteredInstructions.length)
    }, [filteredInstructions])

    return (
      <RecipeContext.Provider value={{step, setStep, recipe, maxStep, sortedIngredients, filteredInstructions, setOptional, optional, fdc_ids, isComplete}}>
          <>{children}</>
      </RecipeContext.Provider>
    )
}

export default RecipeContext