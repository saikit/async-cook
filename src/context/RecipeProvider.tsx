import React, { createContext, useState, useCallback, ReactElement, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";

type RecipeContextType = {
    stepNumber: number,
    setStepNumber: React.Dispatch<React.SetStateAction<number>>,
    maxStep: number,
    recipe: RecipeType | undefined,
    sortedIngredients: IngredientsType,
    filteredInstructions: FilteredInstructionsType,
    optional: OptionalType,
    setOptional: React.Dispatch<React.SetStateAction<RecipeContextType['optional']>>,
    fdc_ids?: number[],
    optional_ingredients?: string[],
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
  quantity?: number,
  unit?: string,
  variable?: number,
  context?: Array<RecipeNoteIconType>,
  cooked?: boolean,
  fdc_id?: number
}

export type IngredientType = {
  text?: string,
  step: number,
  calculator?: {
    text: string,
  } | undefined,
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
    slug: string,
    step?: string
}

const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children } : ChildrenType) => {
    const [stepNumber, setStepNumber] = useState<RecipeContextType['stepNumber']>(0);
    const [recipe, setRecipe] = useState<RecipeType>()
    const [optional, setOptional] = useState<OptionalType>({})
    const [maxStep, setMaxStep] = useState<number>(0)
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const { slug, step } = useParams<routerParams>();
    const navigate = useNavigate();

    const fetchJSONDataFrom = useCallback(async (path : string) => {
      try {
        const response = await fetch(path, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        if(!response.ok) {
          if(response.status === 404) {
            navigate('/not-found');
          }
        } else {
          const data = await response.json();
          setRecipe(data.data);
        }
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      } finally {
        setIsComplete(true);
      }
    }, [navigate]);
  
    useEffect(() => {
      if (!slug) {
        console.error("No recipe ID provided in the URL.");
        return;
      }
      const path = `${API_URL}/recipes/${slug}`;
      fetchJSONDataFrom(path);

    }, [fetchJSONDataFrom, slug]);
    
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

    const optional_ingredients: string[] = useMemo(() => {
      const optionalArray: string[] = [];
      steps.forEach((step) => {
        const { ingredients } : { ingredients : IngredientType } = step
        if('optional' in ingredients && typeof ingredients.optional === 'string') {
            optionalArray.push(ingredients.optional);
        }
      });
      return Array.from(new Set(optionalArray));
    }, [steps]);

    const filteredIngredients : IngredientsType = useMemo(() => {
      const result : IngredientsType = [];
      steps.forEach((step) => {
        const { ingredients } : { ingredients : IngredientType } = step
        const filtered : IngredientType = {
          ...ingredients,
          step: result.length + 1,
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
          status: stepNumber > 0 && stepNumber - 1 === index ? "active" : stepNumber > 0 && stepNumber > index ? "complete" : "ready"
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
    }, [stepNumber, filteredIngredients])

    useEffect(() => {
        const initialOptionalState: OptionalType = {};
        if(optional_ingredients && optional_ingredients.length > 0) {
          optional_ingredients.forEach(ingredient => {
              initialOptionalState[ingredient] = false;
          });
          setOptional(initialOptionalState);
        }
    }, [optional_ingredients]);

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

    useEffect(() => {
      if(step && parseInt(step) <= maxStep)
        setStepNumber(parseInt(step))
    }, [step, maxStep])

    return (
      <RecipeContext.Provider value={{stepNumber, setStepNumber, recipe, maxStep, sortedIngredients, filteredInstructions, setOptional, optional, fdc_ids, optional_ingredients, isComplete}}>
          <>{children}</>
      </RecipeContext.Provider>
    )
}

export default RecipeContext