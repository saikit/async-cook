import { InstructionsType } from "../context/RecipeProvider"
import RecipeNoteIcon from "./RecipeNoteIcon"
import Markdown from "react-markdown"

function Instruction({ list }: { list: InstructionsType, index: number }) {
  const { instructions } = list
  const content = (
    <>
    {instructions.map((instruction, key) => {
        const icons = instruction.context &&
          instruction.context.map((note, notekey) => (
            <RecipeNoteIcon key={notekey} note={note} />
          ));
        return (
          <Markdown key={`md-${key}`} components={{
            li(props) {
              const {children, ...rest} = props;
              return <li className="mb-2" {...rest}>{children}{icons}</li>;
            },
            strong(props) {
              const {children, ...rest} = props;
              return <strong className="font-bold" {...rest}>{children}</strong>;
            }
          }}>{`- ${instruction.text}`}</Markdown>
        )
    })}
    </>
  )

  return content
}

export default Instruction