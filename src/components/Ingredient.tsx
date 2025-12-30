import { IngredientType } from "@/context/RecipeProvider";
import RecipeNoteIcon from "./RecipeNoteIcon";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { twColors } from "@/lib/constants";

const Ingredient = ({
  description,
  status,
  quantityState,
  groupName,
  index
}: {
  description: IngredientType["description"][0];
  status: IngredientType["status"];
  quantityState: Record<string, number | "">;
  groupName: string,
  index: number
}) => {
  const { name, unit, quantity, context, cooked } = description;
  const icons =
    context &&
    context.map((note, key) => <RecipeNoteIcon note={note} key={key} />);

  const quantityValue = groupName in quantityState && typeof quantityState[groupName] === 'object' ? quantityState[groupName][name as keyof typeof quantityState[typeof groupName]] : quantity;
  const measurement = `${quantityValue || ""}${unit ? `${unit} `: ""}`.trim();
  const ingredient = `${measurement ? `**${measurement}** ` : ""}${name}`;

  const createMarkdownComponents = (
    includeIcons: boolean = false,
    includeCooked: boolean = false
  ) => ({
    li(props: React.HTMLProps<HTMLLIElement>) {
      const { children, ...rest } = props;
      return (
        <li className={`mb-0.5 ${includeCooked && "text-slate-500"} ${status}`} {...rest}>
          {children}
          {includeIcons && icons}
        </li>
      );
    },
    strong(props: React.HTMLProps<HTMLElement>) {
      const { children, ...rest } = props;
      return (
        <strong className={`font-bold ${status === 'active' ? twColors[index] : ""}`} {...rest}>
          {children}
        </strong>
      );
    },
  });

  const markdownComponents = createMarkdownComponents(true, false);
  const markdownComponentsWithoutIcons = createMarkdownComponents(false, false);
  const markdownComponentsWithCooked = createMarkdownComponents(true, true);

  const content =
    status === "active" && cooked ? (
      <Markdown
        components={markdownComponentsWithCooked}
      >{`- **${ingredient}**`}</Markdown>
    ) : status === "active" ? (
      <Markdown components={markdownComponents}>{`- **${ingredient}**`}</Markdown>
    ) : status === "complete" ? (
      <Markdown
        components={markdownComponentsWithoutIcons}
        remarkPlugins={[remarkGfm]}
      >{`- ~~${ingredient}~~`}</Markdown>
    ) : (
      <Markdown components={markdownComponents}>{`- ${ingredient}`}</Markdown>
    );

  return content;
};

export default Ingredient;
