import { IngredientType } from "@/context/RecipeProvider"
import RecipeNoteIcon from "./RecipeNoteIcon"
import Markdown from "react-markdown"


const Ingredient = ({ description, status }: { description: IngredientType['description'][0], status: IngredientType['status'] }) => {
  const { name, context, cooked } = description
  const icons = (
    context && context.map((note, key) => <RecipeNoteIcon note={note} key={key}/>) 
  )

  const createMarkdownComponents = (includeIcons: boolean = false) => ({
    p(props: React.HTMLProps<HTMLParagraphElement>) {
      const {children, ...rest} = props;
      return <p className="mb-0.5" {...rest}>{children}{includeIcons && icons}</p>;
    },
    strong(props: React.HTMLProps<HTMLElement>) {
      const {children, ...rest} = props;
      return <strong className="font-bold" {...rest}>{children}</strong>;
    }
  })

  const markdownComponents = createMarkdownComponents(true)
  const markdownComponentsWithoutIcons = createMarkdownComponents(false)

  const content = (
    (status === "active" && cooked ) ?
      <li><b className="text-stone-500"><Markdown components={markdownComponents}>{name}</Markdown></b></li>
    :
    (status === "active") ?
      <li className={status}><b><Markdown components={markdownComponents}>{name}</Markdown></b></li>
    :
    (status === "complete") ?
      <li className={status}><s><Markdown components={markdownComponentsWithoutIcons}>{name}</Markdown></s></li>
    :
      <li className={status}><Markdown components={markdownComponents}>{name}</Markdown></li>
  )

  return content
}

export default Ingredient