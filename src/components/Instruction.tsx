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
          <div key={index} className="mb-2">
            <Markdown components={{
              p(props) {
                const {children, ...rest} = props;
                return <p className="" {...rest}>{children}{icons}</p>;
              },
            }}>
              {instruction.text}
            </Markdown>
          </div>
        );
      })}
    </>
  )

  return content
}

export default Instruction