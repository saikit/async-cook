import Instruction from "./Instruction"
import RecipeContext from "@/context/RecipeProvider";
import { useContext } from "react";

function RecipeInstructionsList() {
    const { step, filteredInstructions } = useContext(RecipeContext)
    const content = (
        <>
        <h2 className='text-3xl mb-4'>{step > 0 ? `Step ${step}` : "Instructions"}</h2>
        {step === 0 
        ? 
        <ol className='list-decimal list-outside pl-4'>
            {filteredInstructions.map((instruction, index) => (
                <li key={`list-${index}`}>
                <Instruction index={index} list={instruction} />
                </li>
            ))}
        </ol>
        :
        <Instruction index={step - 1} list={filteredInstructions[step - 1]}/>
        }
        </>
    )

  return content
}
export default RecipeInstructionsList