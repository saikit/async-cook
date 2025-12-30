import { InstructionsType } from "../context/RecipeProvider"
import RecipeNoteIcon from "./RecipeNoteIcon"
import Markdown from "react-markdown"
import InstructionHighlights from "./InstructionHighlight"

function Instruction({ list, searchWords }: { list: InstructionsType, searchWords: Array<string[]> }) {
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
              if(searchWords && searchWords.length > 0)
                return <InstructionHighlights searchWords={searchWords} children={children}/>
              else
                return <strong {...rest}>{children}</strong>
            }
          }}>{`- ${instruction.text}`}</Markdown>
        )
    })}
    </>
  )

  return content
}

export default Instruction