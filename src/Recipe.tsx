import { useContext } from 'react'
import Ingredient from './components/Ingredient'
import Instruction from './components/Instruction'
import RecipeContext from './context/RecipeProvider'
import Markdown from 'react-markdown'
import RecipeOptionalInput from './components/RecipeOptionalInput'

function Recipe() {
  const {step, recipe, sortedIngredients, filteredInstructions} = useContext(RecipeContext)

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { title, description } = recipe;

  const content = (
    <div className='grid p-4'>
    <h1 className="text-4xl font-bold text-center m-2">
      {title}
    </h1>

    
    
    {description && step === 0 ? (<p className='my-2'>{description}</p>) : null}
    
    <h2 className='text-3xl mb-2'>Ingredients</h2>
    <ul>
    {sortedIngredients.map((group, key) => {
      return group.map((ingredient) => {
        if (Array.isArray(ingredient.description)) {
          return (
            <div key={ingredient.name} className='my-2'>
            <h3><em>For the {ingredient.name}</em></h3>
            <ul key={key}>{ingredient.description.map((ing: string) => (
            <Ingredient 
              status={ingredient.status || "ready"} 
              name={ing} 
              key={`${key}-${ing}`}
            >
              {ing}
            </Ingredient>)
          )}</ul></div>);
        } else {
          return (
            (!('cooked' in ingredient) || (('cooked' in ingredient) && step - 1 >= key)) ?
            <Ingredient
              status={ingredient.status || "ready"}
              key={`${key}-${ingredient.description}`}
              name={ingredient.name}
            >
              {ingredient.description}
            </Ingredient> : null
          );
        }
      });
    })}
    </ul>
    <RecipeOptionalInput/>
    <hr className='my-4' />
    <h2 className='text-2xl mb-2'>{step > 0 ? `Step ${step}` : "Instructions"}</h2>
    {step === 0 
    ? 
    <ol className='list-decimal list-outside pl-4'>{filteredInstructions.map((group, index) => (
      group.map((instruction, instructionIndex) => (
        <li key={`${index}-${instructionIndex}`}>
          <Instruction>
            <Markdown>{instruction.step}</Markdown>
          </Instruction>
        </li>
      ))
    ))}</ol>
    :
    filteredInstructions[step - 1].map(instruction => (<Instruction key={step - 1}><Markdown>{instruction.step}</Markdown></Instruction>))
    }
    </div>
  )

    return content
}

export default Recipe
