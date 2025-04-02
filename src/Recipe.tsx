import { useContext } from 'react'
import Ingredient from './components/Ingredient'
import Instruction from './components/Instruction'
import RecipeContext from './context/RecipeProvider'
import RecipeOptionalInput from './components/RecipeOptionalInput'

function Recipe() {
  const {step, recipe, sortedIngredients, filteredInstructions} = useContext(RecipeContext)

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { title, intro } = recipe;

  const content = (
    <div className='p-4'>
    <h1 className="text-4xl font-bold text-center m-2">
      {title}
    </h1>
    
    {intro && step === 0 ? (<p className='my-2'>{intro}</p>) : null}
    
    <h2 className='text-3xl mb-2'>Ingredients</h2>
    <ul>
    {sortedIngredients.map((group, key) => {
      return group.map((ingredient) => {
        if (ingredient.description.length > 1) {
          return (
            <div key={ingredient.name} className='my-2'>
            <h3><em>For the {ingredient.name}</em></h3>
            <ul key={key}>
              {ingredient.description.map((ing) => (
              <Ingredient 
                status={ingredient.status || "ready"} 
                description={ing}
                key={`${key}-${ing.name}`}
              />
              ))}
            </ul></div>
          );
        } else {
          if (!('cooked' in ingredient) || (('cooked' in ingredient) && step - 1 >= key)) {
            return ingredient.description.map((ing) => (
              <Ingredient
                status={ingredient.status || "ready"}
                key={`${key}-${ing.name}`}
                description={ing}
              />
            ));
          }
          return null;
        }
      });
    })}
    </ul>
    <RecipeOptionalInput/>
    <h2 className='text-2xl mb-2'>{step > 0 ? `Step ${step}` : "Instructions"}</h2>
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
