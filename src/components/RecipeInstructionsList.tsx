import Instruction from './Instruction';
import RecipeContext from '@/context/RecipeProvider';
import { useContext } from 'react';

function RecipeInstructionsList() {
  const { stepNumber, filteredInstructions, searchWords } =
    useContext(RecipeContext);
  const content = (
    <>
      {stepNumber === 0 ? (
        <>
          <p className="text-3xl mb-4">Instructions</p>
          <ol
            aria-label="Instruction List"
            className="list-decimal list-outside pl-4"
          >
            {filteredInstructions.map((instructionGroup, index) => (
              <li className="mb-4" key={`list-${index}`}>
                <Instruction
                  searchWords={searchWords}
                  instructionGroup={instructionGroup}
                />
              </li>
            ))}
          </ol>
        </>
      ) : (
        <>
          <h2 className="text-3xl mb-4">
            Step {stepNumber}: {filteredInstructions[stepNumber - 1].title}
          </h2>
          <Instruction
            searchWords={searchWords}
            instructionGroup={filteredInstructions[stepNumber - 1]}
          />
        </>
      )}
    </>
  );

  return content;
}
export default RecipeInstructionsList;
