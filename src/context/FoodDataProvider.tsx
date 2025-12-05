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
        name: string,
        amount: number,
        unitName: string,
        number: number
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
    '645', // Fatty acids, total monounsaturated
    '646', // Fatty acids, total polyunsaturated
    '291', // Fiber, total dietary
]

const params = new URLSearchParams({    
    api_key: API_KEY,
    format: 'abridged',
    nutrients: nutrients.join(','),
    sortBy: 'description',
    sortOrder: 'asc'
})

const FoodDataContext = createContext<FoodDataContextType>({ foodData: [] } as FoodDataContextType);

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const FoodDataProvider = ({ children } : ChildrenType ) => {
    const [foodData, setFoodData] = useState<foodDataType>([]);
    const [foodDataIsComplete, setfoodDataIsComplete] = useState<boolean>(false);
    const { fdc_ids, isComplete } = useContext(RecipeContext)

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
            if (fdc_ids === undefined || fdc_ids.length === 0) {
                return;
            } else {
                params.set('fdcIds', fdc_ids.join(','));
                const path = `https://api.nal.usda.gov/fdc/v1/foods/?${params.toString()}`;
                fetchJSONDataFrom(path);
            }
        }
    
      }, [fetchJSONDataFrom, fdc_ids, isComplete]);
    
      return (
        <FoodDataContext.Provider value={{foodData, foodDataIsComplete}}>
            <>{children}</>
        </FoodDataContext.Provider>
      )

};

export default FoodDataContext;