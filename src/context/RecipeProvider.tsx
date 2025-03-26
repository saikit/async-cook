import { createContext, useState, ReactElement } from "react";

type RecipeContextType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<RecipeContextType['step']>>
}

type ChildrenType = { children?: ReactElement | ReactElement[] }

const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProvider = ({ children } : ChildrenType) => {
    const [step, setStep] = useState<RecipeContextType['step']>(0);
  return (
    <RecipeContext.Provider value={{step, setStep}}>
        {children}
    </RecipeContext.Provider>
  )
}

export default RecipeContext