import { useContext, useState, useEffect } from 'react'
import Ingredient from './components/Ingredient'
import Instruction from './components/Instruction'
import RecipeContext from './context/RecipeProvider'
import Markdown from 'react-markdown'

type Ingredients = Array<Array<{
  name: string,
  description: string[] | string,
  status: "ready" | "active" | "complete"
}>>

export type RecipeType = {
  ingredients: Ingredients,
  instructions: string[],
  title: string,
  description?: string,
}

function Recipe() {
const context = useContext(RecipeContext)

const { step, setStep } = context;
const [recipe, setRecipe] = useState<RecipeType>()

useEffect(() => {
  const fetchRecipe = async (): Promise<RecipeType> => {
    const data = await fetch('http://localhost:5173/data/pasta.json').then(res => {
      return res.json()
    }).catch(err => {
        if (err instanceof Error) console.log(err.message)
    })
    return data
  }

    fetchRecipe().then(recipe => setRecipe(recipe))
},[])


if (!recipe) {
  return <div>Loading...</div>;
}

const { ingredients, instructions, title, description } = recipe;
const maxStep = instructions.length;
const sortedIngredients : Ingredients = []

ingredients.map((group, index) => {
  const status = step > 0 && step - 1 === index ? "active" : step > 0 && step > index ? "complete" : "ready"
  group.map(ingredient => {
    ingredient.status = status
  })
  if(status === 'active') 
    sortedIngredients.unshift(group)
  else if(status === 'complete')
    sortedIngredients.push(group)
  else
    sortedIngredients.splice(sortedIngredients.length, 0, group)
})

  const content = (
    <div className='grid p-4'>
    <h1 className="text-4xl font-bold text-center m-2">
      {title}
    </h1>
    {description ? (<p className='my-2'>{description}</p>) : null}
    <h2 className='text-3xl mb-2'>Ingredients</h2>
    <ul>
    {sortedIngredients.map((group, key) => {
      return group.map((ingredient) => {
        if (Array.isArray(ingredient.description)) {
          return ingredient.description.map((ing: string) => (
            <Ingredient status={ingredient.status} name={ing} key={`${key}-${ing}`}>{ing}</Ingredient>
          ));
        } else {
          return <Ingredient status={ingredient.status} key={`${key}-${ingredient.description}`} name={ingredient.name}>{ingredient.description}</Ingredient>;
        }
      });
    })}
    </ul>
    <hr className='my-4' />
    <h2 className='text-2xl mb-2'>{step > 0 ? `Step ${step}` : "Instructions"}</h2>
    {step === 0 
    ? 
    <ol className='list-decimal list-outside pl-4'>{instructions.map((instruction, index) => (<li key={index}><Instruction ><Markdown>{instruction}</Markdown></Instruction></li> ))}</ol>    
    :
      <Instruction key={step - 1}><Markdown>{instructions[step - 1]}</Markdown></Instruction>
    }

    <div className='flex justify-center p-2 gap-2'>
      {step === 0
      ?
      <button className='w-50 border p-2 rounded-2xl' onClick={() => setStep(step + 1)}>Start</button>
      :
      <>
      <button className='border p-2 rounded-2xl disabled:opacity-80' 
      onClick={() => setStep(step - 1)}
      >Previous Step</button>
      <button className='border p-2 rounded-2xl' onClick={() => setStep(0)}>Reset</button>
      <button className='border p-2 rounded-2xl disabled:opacity-50'
      onClick={() => setStep(step + 1)}
      disabled={maxStep === step ? true : false}
        >Next Step</button>
      </>
      }
    </div>

    </div>
  )

    return content
}

export default Recipe
