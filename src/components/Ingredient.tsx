import { IngredientType } from "@/context/RecipeProvider"
import RecipeNoteIcon from "./RecipeNoteIcon"


const Ingredient = ({ description, status }: { description: IngredientType['description'][0], status: IngredientType['description'][0]['status'] }) => {
  const { name, context } = description
  const icon = (
    (context) ?
      (context.map((note, key) => <RecipeNoteIcon note={note} key={key}/>)) 
    : null
  )
  const content = (
    (status === "active") ?
      <li className={status}><b>{name}</b>{icon}</li>
    :
    (status === "complete") ?
      <li className={status}><s>{name}</s></li>
    :
      <li className={status}>{name}{icon}</li>
  )

  return content
}

export default Ingredient