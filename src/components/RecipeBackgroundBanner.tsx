import { useContext } from "react"
import RecipeContext from "../context/RecipeProvider"

function RecipeBackgroundBanner() {
    const context = useContext(RecipeContext)
    const { step, filteredInstructions } = context

    const background = step > 0 && filteredInstructions[step - 1][0]?.background ? filteredInstructions[step - 1][0].background : null

    if(!background)
        return null

  const content = (
    <p className="sticky top-0 p-2 bg-slate-300 opacity-80 text-center">{background}</p>
  )

  return content
}
export default RecipeBackgroundBanner