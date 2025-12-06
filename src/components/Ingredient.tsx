import { IngredientType } from "@/context/RecipeProvider"
import RecipeNoteIcon from "./RecipeNoteIcon"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Ingredient = ({ description, status }: { description: IngredientType['description'][0], status: IngredientType['status'] }) => {
  const { name, context, cooked } = description
  const icons = (
    context && context.map((note, key) => <RecipeNoteIcon note={note} key={key}/>) 
  )

  const createMarkdownComponents = (includeIcons: boolean = false, includeCooked: boolean = false) => ({
    li(props: React.HTMLProps<HTMLLIElement>) {
      const {children, ...rest} = props;
      return <li className={`mb-0.5 ${includeCooked && 'text-slate-500'}`} {...rest}>{children}{includeIcons && icons}</li>;
    },
    strong(props: React.HTMLProps<HTMLElement>) {
      const {children, ...rest} = props;
      return <strong className="font-bold" {...rest}>{children}</strong>;
    }
  })

  const markdownComponents = createMarkdownComponents(true, false)
  const markdownComponentsWithoutIcons = createMarkdownComponents(false, false)
  const markdownComponentsWithCooked = createMarkdownComponents(true, true)

  const content = (
    (status === "active" && cooked ) ?
      <Markdown components={markdownComponentsWithCooked}>{`- **${name}**`}</Markdown>
    :
    (status === "active") ?
      <Markdown components={markdownComponents}>{`- **${name}**`}</Markdown>
    :
    (status === "complete") ?
      <Markdown components={markdownComponentsWithoutIcons} remarkPlugins={[remarkGfm]}>{`- ~~${name}~~`}</Markdown>
    :
      <Markdown components={markdownComponents}>{`- ${name}`}</Markdown>
  )

  return content
}

export default Ingredient