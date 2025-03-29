import { useContext } from "react"
import RecipeContext from "../context/RecipeProvider"

function RecipeFooter () {
    const { step, setStep, maxStep } = useContext(RecipeContext)

    const content = (
        <div className='flex justify-center py-2 w-full sticky bottom-0 gap-2 bg-slate-200'>
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
    )

    return content

}

export default RecipeFooter