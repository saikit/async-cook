import { useContext } from "react"
import RecipeContext from "../context/RecipeProvider"
import { Button } from "@/components/ui/button"

function RecipeFooter () {
    const { step, setStep, maxStep } = useContext(RecipeContext)

    const content = (
        <div className=" py-2 w-full sticky bottom-0 gap-2 bg-slate-200">
            <div className='flex justify-center'>
                {step === 0
                ?
                <Button className='w-50S' onClick={() => setStep(step + 1)}>Start</Button>
                :
                <>
                <Button className='border disabled:opacity-80' 
                onClick={() => setStep(step - 1)}
                >Previous Step</Button>
                <Button className='border' onClick={() => setStep(0)}>Reset</Button>
                <Button className='border disabled:opacity-50'
                onClick={() => setStep(step + 1)}
                disabled={maxStep === step ? true : false}
                    >Next Step</Button>
                </>
                }
            </div>
            <p className="text-center text-sm">This recipe and app is hand-crafted by Sai-Kit Hui</p>
        </div>
    )

    return content

}

export default RecipeFooter