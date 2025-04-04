import { useContext } from 'react'
import Instruction from './components/Instruction'
import RecipeContext from './context/RecipeProvider'
import RecipeOptionalInput from './components/RecipeOptionalInput'
import RecipeIngredientsList from './components/RecipeIngredientsList'
import { ScrollArea } from './components/ui/scrollarea'


function Recipe() {
  const {step, recipe, filteredInstructions} = useContext(RecipeContext)

  if (!recipe) {
    return <div className='h-screen text-center'>Loading...</div>;
  }

  const { title, intro } = recipe;

  const content = (
    <div className='p-4'>
    <h1 className="text-4xl font-bold text-center m-2">
      {title}
    </h1>
    
    {intro && step === 0 ? (<p className='my-2'>{intro}</p>) : null}
    
    <div className='flex justify-center'><RecipeOptionalInput/></div>
    <h2 className='text-3xl mb-2'>Ingredients</h2>
    
    {step > 0 ?
    <ScrollArea className='h-[40vh]'>
      <RecipeIngredientsList/>
    </ScrollArea>
    : <RecipeIngredientsList/>}
    <hr className='my-4'/>
    <h2 className='text-3xl mb-2'>{step > 0 ? `Step ${step}` : "Instructions"}</h2>
    {step === 0 
    ? 
    <ol className='list-decimal list-outside pl-4'>{filteredInstructions.map((instructions, index) => (
        <li key={index}>
          <Instruction instructions={instructions} />
        </li>
    ))}</ol>
    :
   <Instruction key={step - 1} instructions={filteredInstructions[step - 1]}/>
    }

    </div>
  )

    return content
}

export default Recipe
