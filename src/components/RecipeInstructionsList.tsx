import Instruction from "./Instruction"
import RecipeContext from "@/context/RecipeProvider";
import { useContext } from "react";

function RecipeInstructionsList() {
    const { step, filteredInstructions } = useContext(RecipeContext)
    const content = (
        <>
        {step === 0 
        ? 
        <>
        <h2 className='text-3xl mb-4'>Instructions</h2>
        <ol className='list-decimal list-outside pl-4'>
            {filteredInstructions.map((instruction, index) => (
                <li key={`list-${index}`}>
                <Instruction index={index} list={instruction} />
                </li>
            ))}
        </ol>
        </>
        :
        <>
        <h2 className='text-3xl mb-4'>Step {step}: {filteredInstructions[step - 1].instructions[0].title}</h2>
        <Instruction index={step - 1} list={filteredInstructions[step - 1]}/>
        </>
        }
        </>
    )

  return content
}
export default RecipeInstructionsList