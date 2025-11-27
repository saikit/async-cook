import { useContext } from 'react'
import RecipeContext from './context/RecipeProvider'
import RecipeOptionalInput from './components/RecipeOptionalInput'
import RecipeIngredientsList from './components/RecipeIngredientsList'
//import { ScrollArea } from './components/ui/scrollarea'
import { Link } from 'react-router'
import LoadingIcon from '@/components/LoadingIcon'
import RecipeInstructionsList from './components/RecipeInstructionsList'

function Recipe() {
  const {step, recipe} = useContext(RecipeContext)

  if (!recipe) {
    return <LoadingIcon/>
  }

  const { title, intro, reference, optional_ingredients } = recipe;

  const content = (
    <div className='p-4'>
    <h1 className="text-4xl font-bold text-center m-2">
      {title}
    </h1>
    
    {intro && step === 0 ?
    <div>
      <p className='my-2'>
        {intro}&nbsp;
        {reference && (
          <Link className='text-blue-500 underline' to={reference} target='_blank'>See original recipe</Link>
        )}
      </p>
    </div> 
    : null
    }
    
    { optional_ingredients && step === 0 ?
    <div className='flex justify-center mb-2'><RecipeOptionalInput/></div>
    : null}
    <h2 className='text-3xl mb-2'>Ingredients</h2>
    
    {/* {step > 0 ?
    <ScrollArea className='h-[35vh]'>
        <RecipeIngredientsList/>
    </ScrollArea>
    : <RecipeIngredientsList/>} */}
    <RecipeIngredientsList/>
    <hr className='my-4'/>
    <RecipeInstructionsList/>

    </div>
  )

    return content
}

export default Recipe
