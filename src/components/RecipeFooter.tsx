import { useContext } from "react"
import RecipeContext from "../context/RecipeProvider"
import { Button } from "@/components/ui/button"

function RecipeFooter () {
    const { stepNumber, setStepNumber, maxStep } = useContext(RecipeContext)

    const content = (
        <footer className=" p-4 w-full sticky bottom-0 bg-slate-200 print:hidden">
            <div className='flex justify-center gap-2'>
                {stepNumber === 0
                ?
                <Button className='w-50S bg-slate-800' onClick={() => setStepNumber(stepNumber + 1)}>Start</Button>
                :
                <>
                <Button className='border disabled:opacity-80 bg-slate-800' 
                onClick={() => setStepNumber(stepNumber - 1)}
                disabled={stepNumber > 1 ? false : true}
                >Previous Step</Button>
                <Button className={`border ${stepNumber === maxStep ? 'bg-green-500' : 'slate-800'}`} onClick={() => setStepNumber(0)}>{stepNumber === maxStep ? "Done!" : "Restart"}</Button>
                <Button className='border bg-slate-800 disabled:opacity-50'
                onClick={() => setStepNumber(stepNumber + 1)}
                disabled={maxStep === stepNumber ? true : false}
                    >Next Step</Button>
                </>
                }
            </div>
            <p className="text-center text-sm pt-4">This recipe and app is handcrafted by <a href="https://saikithui.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Sai-Kit Hui</a></p>
        </footer>
    )

    return content

}

export default RecipeFooter