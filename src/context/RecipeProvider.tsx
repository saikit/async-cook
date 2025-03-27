import { createContext, useState, ReactElement, useEffect } from "react";

type RecipeContextType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<RecipeContextType['step']>>,
    maxStep: number,
    recipe: RecipeType | undefined
}

type ChildrenType = { children?: ReactElement | ReactElement[] }

type Ingredients = Array<Array<{
  name: string,
  description: string[] | string,
  status: "ready" | "active" | "complete"
}>>

export type RecipeType = {
  ingredients: Ingredients,
  instructions: string[],
  title: string,
  description?: string,
}

const RecipeContext = createContext<RecipeContextType>({} as RecipeContextType);

export const RecipeProvider = ({ children } : ChildrenType) => {
    const [step, setStep] = useState<RecipeContextType['step']>(0);
    const [recipe, setRecipe] = useState<RecipeType>()

    useEffect(() => {
      const fetchRecipe = async (): Promise<RecipeType> => {
        const data = await fetch('http://localhost:5173/data/pasta.json').then(res => {
          return res.json()
        }).catch(err => {
            if (err instanceof Error) console.log(err.message)
        })
        return data
      }

      fetchRecipe().then(recipe => setRecipe(recipe))
    },[])

    const instructions = recipe?.instructions || [];
    const maxStep = instructions.length;

    return (
      <RecipeContext.Provider value={{step, setStep, recipe, maxStep}}>
          {children}
      </RecipeContext.Provider>
    )
}

export default RecipeContext