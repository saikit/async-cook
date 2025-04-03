import { InstructionType } from "../context/RecipeProvider"
import RecipeNoteIcon from "./RecipeNoteIcon"
import Markdown from "react-markdown"

function Instruction({ instructions }: { instructions: InstructionType[] }) {
  const content = (
    <>
      {instructions.map((instruction, index) => {
        const icons = instruction.context &&
          instruction.context.map((note, key) => (
            <RecipeNoteIcon key={key} note={note} />
          ));
        return (
          <div key={index}>
            <Markdown components={{
              p(props) {
                const {children, ...rest} = props;
                return <p className="mb-2" {...rest}>{children}{icons}</p>;
              },
              li(props) {
                const {children, ...rest} = props;
                return <li {...rest} className="mb-2">{children}</li>;
              },
            }}>
              {instruction.step}
            </Markdown>
          </div>
        );
      })}
    </>
  )

  return content
}

export default Instruction