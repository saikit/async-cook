import { useContext, useRef, useEffect } from 'react'
import RecipeContext from './context/RecipeProvider'
import RecipeOptionalInput from './components/RecipeOptionalInput'
import RecipeIngredientsList from './components/RecipeIngredientsList'
import { ScrollArea } from './components/ui/scrollarea'
import { Link } from 'react-router'
import NutritionalInformation from './components/NutritionalInformation'
import LoadingIcon from './components/LoadingIcon'
import RecipeInstructionsList from './components/RecipeInstructionsList'
import FoodDataContext from './context/FoodDataProvider'


function Recipe() {
  const {stepNumber, recipe, optional_ingredients} = useContext(RecipeContext)
  const { foodDataIsComplete } = useContext(FoodDataContext)
  const viewportRef = useRef<HTMLDivElement>(null)
    const scrollToTop = () => {
      if(viewportRef.current)
        viewportRef.current?.querySelector('[data-radix-scroll-area-viewport]')?.scrollTo({top: 0})
    }

    useEffect(() => {
      scrollToTop()
    }, [stepNumber])

  if (!recipe) {
    return <LoadingIcon/>
  }

  const { title, intro, reference } = recipe;

  const content = (
    <div className='p-4'>
    <h1 className="text-4xl font-bold text-center m-4">
      {title}
    </h1>
    
    {intro && stepNumber === 0 && (
      <p className='my-4'>
        {intro}&nbsp;
        {reference && (
          <Link className='text-blue-500 underline print:hidden' to={reference} target='_blank'>See original recipe</Link>
        )}
      </p>
    )}
    { stepNumber === 0 && (
    <div className='sm:flex sm:justify-center mb-2 print:hidden gap-0 sm:gap-2'>
      {foodDataIsComplete && (
      <NutritionalInformation />
      )}
      { optional_ingredients && (
      <RecipeOptionalInput/>
      )}
    </div>
    )}
    <h2 className='text-3xl mb-4'>Ingredients</h2>
    
    {stepNumber > 0 ?
    <ScrollArea className='h-[35vh]' ref={viewportRef}>
        <RecipeIngredientsList/>
    </ScrollArea>
    : <RecipeIngredientsList/>}
    <hr className='my-4'/>
    <RecipeInstructionsList/>

    </div>
  )

    return content
}

export default Recipe
