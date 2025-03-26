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
}

function Recipe() {
const context = useContext(RecipeContext)

if (!context) {
  throw new Error("RecipeContext must be used within a RecipeProvider");
}

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

const { ingredients, instructions, title } = recipe;
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
    sortedIngredients.splice(1, 0, group)
})

  const content = (
    <div className='grid min-h-screen place-content-center'>
    <h1 className="text-3xl font-bold">
      {title}
    </h1>
    <h2>Ingredients</h2>
    <ul className='list-disc'>
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
    <hr />
    <h2>{step > 0 ? `Step ${step}` : "Instructions"}</h2>
    {step === 0 ? (
      instructions.map((instruction, index) => (
          <Instruction key={index}><Markdown>{instruction}</Markdown></Instruction>
      ))
    ) : (
        <Instruction key={step - 1}><Markdown>{instructions[step - 1]}</Markdown></Instruction>
    )}
    {step === 0
    ?
    <button onClick={() => setStep(step + 1)}>Start</button>
    :
    <>
    <button 
    onClick={() => setStep(step - 1)}
    >Previous Step</button>
    <button onClick={() => setStep(0)}>Reset</button>
    <button 
    onClick={() => setStep(step + 1)}
    disabled={maxStep === step ? true : false}
      >Next Step</button>
    </>
    }

    </div>
  )

    return content
}

export default Recipe
