import { InstructionsType } from "../context/RecipeProvider"
import RecipeNoteIcon from "./RecipeNoteIcon"
import Markdown from "react-markdown"

function Instruction({ list }: { list: InstructionsType }) {
  const { instructions } = list
  const content = (
    <>
    {instructions.map((instruction) => {
        const icons = instruction.context &&
          instruction.context.map((note, key) => (
            <RecipeNoteIcon key={key} note={note} />
          ));
        return <>
          <Markdown components={{
            p(props) {
              const {children, ...rest} = props;
              return <p className="mb-2" {...rest}>{children}{icons}</p>;
            },
            strong(props) {
              const {children, ...rest} = props;
              return <strong className="font-bold" {...rest}>{children}</strong>;
            }
          }}>
            {instruction.text}
          </Markdown>
        </>
    })}
    </>
  )

  return content
}

export default Instruction