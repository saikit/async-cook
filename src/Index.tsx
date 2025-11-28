import { RecipesListProvider } from './context/RecipesListProvider.tsx'
import Landing from './Landing.tsx'

function Index () {
    return (
        <RecipesListProvider>
            <Landing />
        </RecipesListProvider>
    )
}

export default Index

