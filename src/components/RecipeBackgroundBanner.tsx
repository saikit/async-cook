import { useContext, useState, useEffect } from "react"
import RecipeContext from "../context/RecipeProvider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


function RecipeBackgroundBanner() {
    const context = useContext(RecipeContext)
    const { step, filteredInstructions } = context
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000)

      return () => clearTimeout(timer);
    }, [step]);

    const background = step > 0 && filteredInstructions[step - 1].instructions[0].background ? filteredInstructions[step - 1].instructions[0].background : null

    if(!background || !isVisible)
        return null

  const content = (
    <Alert className=" w-80 fixed top-5 left-1/2 transform -translate-x-1/2">
      <AlertTitle><div className="text-xl">Heads up!</div></AlertTitle>
      <AlertDescription>
      <p>{background}</p>
      </AlertDescription>
    </Alert>
  )

  return content
}
export default RecipeBackgroundBanner