import { useContext } from "react"
import RecipeContext from "../context/RecipeProvider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


function RecipeBackgroundBanner() {
    const context = useContext(RecipeContext)
    const { step, steps } = context


    const background = step > 0 && steps[step - 1]?.background ? steps[step - 1].background : null

    if(!background)
        return null

  const content = (
    <Alert>
      <AlertTitle><div className="text-xl">Heads up!</div></AlertTitle>
      <AlertDescription>
      <p>{background}</p>
      </AlertDescription>
    </Alert>
  )

  return content
}
export default RecipeBackgroundBanner