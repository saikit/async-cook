import { createContext, useEffect, useState, useCallback, ReactElement, useContext } from 'react'
import RecipeContext from './RecipeProvider';

const API_KEY = import.meta.env.VITE_DATA_GOV_KEY
type FoodDataContextType = {
  foodData: foodDataType,
  foodDataIsComplete?: boolean
}

export type foodDataType = Array<{
    description: string;
    foodNutrients: Array<{
        name: string;
        amount: number;
        unitName: string;
    }>
}>;

const nutrients = [
    '208', // Energy
    '203', // Protein
    '204', // Total lipid (fat)
    '205', // Carbohydrate, by difference
    '269', // Sugars, total including NLEA
    '307', // Sodium, Na
    '601', // Cholesterol
    '606', // Fatty acids, total saturated
]

const params = new URLSearchParams({    
    api_key: API_KEY,
    format: 'abridged',
    nutrients: nutrients.join(','),
})

const FoodDataContext = createContext<FoodDataContextType>({ foodData: [] } as FoodDataContextType);

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const FoodDataProvider = ({ children } : ChildrenType ) => {
    const [foodData, setFoodData] = useState<FoodDataContextType>({});
    const [foodDataIsComplete, setfoodDataIsComplete] = useState<boolean>(false);
    const { sortedIngredients, isComplete } = useContext(RecipeContext)

    const fetchJSONDataFrom = useCallback(async (path : string) => {
        try {
            const response = await fetch(path, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
            });
            const data = await response.json();
            setFoodData(data);
        } catch (error) {
            console.error("Error fetching food data:", error);
        } finally {
            setfoodDataIsComplete(true);
        }
      }, []);
    
      useEffect(() => {
        if(!isComplete) {
            return;
        } else {
            const fdc_ids: number[] = [];
            sortedIngredients.forEach((ingredient) => {
                ingredient.description.forEach((item) => {
                    if('fdc_id' in item && item.fdc_id) {
                        fdc_ids.push(item.fdc_id);
                    }
                })
            });
            if (fdc_ids.length === 0) {
                return;
            } else {
                params.set('fdcIds', fdc_ids.join(','));
                const path = `https://api.nal.usda.gov/fdc/v1/foods/?${params.toString()}`;
                fetchJSONDataFrom(path);
            }
        }
    
      }, [fetchJSONDataFrom, sortedIngredients, isComplete]);
    
      return (
        <FoodDataContext.Provider value={{foodData, foodDataIsComplete}}>
            <>{children}</>
        </FoodDataContext.Provider>
      )

};

export default FoodDataContext;