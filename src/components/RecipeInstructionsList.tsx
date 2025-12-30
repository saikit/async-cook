import Instruction from "./Instruction"
import RecipeContext from "@/context/RecipeProvider";
import { useContext } from "react";

function RecipeInstructionsList() {
    const { stepNumber, filteredInstructions, searchWords } = useContext(RecipeContext)
    const content = (
        <>
        {stepNumber === 0 
        ? 
        <>
        <h2 className='text-3xl mb-4'>Instructions</h2>
        <ol className='list-decimal list-outside pl-4'>
            {filteredInstructions.map((instruction, index) => (
                <li key={`list-${index}`}>
                <Instruction searchWords={searchWords} list={instruction} />
                </li>
            ))}
        </ol>
        </>
        :
        <>
        <h2 className='text-3xl mb-4'>Step {stepNumber}: {filteredInstructions[stepNumber - 1].instructions[0].title}</h2>
        <Instruction searchWords={searchWords} list={filteredInstructions[stepNumber - 1]}/>
        </>
        }
        </>
    )

  return content
}
export default RecipeInstructionsList