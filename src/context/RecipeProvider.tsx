import React, {
  createContext,
  useState,
  useCallback,
  ReactElement,
  useEffect,
  useMemo,
} from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  RecipeType,
  StepType,
  InstructionGroupType,
  InstructionType,
  IngredientGroupType,
  IngredientType,
} from '@/types/api';
import { apiClient } from '@/lib/apiClient';

type RecipeContextType = {
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
  maxStep: number;
  recipe: RecipeType | undefined;
  sortedIngredients: Array<IngredientGroupType>;
  filteredInstructions: Array<InstructionGroupType>;
  optional: OptionalType;
  setOptional: React.Dispatch<
    React.SetStateAction<RecipeContextType['optional']>
  >;
  searchWords: Array<string[]>;
  isComplete?: boolean;
  recipeImage: string | undefined;
  setRecipeImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  expandImg: boolean;
  setExpandImg: React.Dispatch<React.SetStateAction<boolean>>;
};

type ChildrenType = { children?: ReactElement | ReactElement[] };

type OptionalType = { [key: number]: boolean };

const RecipeContext = createContext<RecipeContextType>({} as RecipeContextType);

type routerParams = {
  slug: string;
  step?: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children }: ChildrenType) => {
  const [stepNumber, setStepNumber] =
    useState<RecipeContextType['stepNumber']>(0);
  const [recipe, setRecipe] = useState<RecipeType>();
  const [optional, setOptional] = useState<OptionalType>({});
  const [maxStep, setMaxStep] = useState<number>(0);
  const [recipeImage, setRecipeImage] = useState<string>();
  const [expandImg, setExpandImg] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { slug } = useParams<routerParams>();
  const navigate = useNavigate();

  const fetchJSONDataFrom = useCallback(
    async (path: string) => {
      try {
        const data = await apiClient<{ data: RecipeType }>(path);
        setRecipe(data.data);
      } catch (error: unknown) {
        console.error('Error fetching recipe data:', error);
        if (error instanceof Error && error.status === 404) {
          navigate('/not-found');
        }
      } finally {
        setIsComplete(true);
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (!slug) {
      console.error('No recipe ID provided in the URL.');
      return;
    }
    const path = `${API_URL}/recipes/${slug}`;
    fetchJSONDataFrom(path);
  }, [fetchJSONDataFrom, slug]);

  const { steps = [] } = recipe ?? { steps: [] };

  useEffect(() => {
    if (stepNumber === 0 && recipe?.cover_img) {
      setRecipeImage(recipe.cover_img.url);
    } else {
      setRecipeImage('');
    }
  }, [recipe, stepNumber]);

  const filteredIngredients: Array<IngredientGroupType> = useMemo(() => {
    const result: Array<IngredientGroupType> = [];
    let currentStep = 1;
    let isIngredientEmpty = false;
    steps.forEach((step) => {
      const { ingredients }: { ingredients: IngredientGroupType } = step;
      const filtered: IngredientGroupType = {
        ...ingredients,
        step: currentStep,
        ingredients: ingredients.ingredients.filter(
          (ingredient: IngredientType) => {
            return (
              (typeof ingredient.optional === 'number' &&
                optional[ingredient.optional]) ||
              (!('optional' in ingredient) &&
                (!ingredient.cooked ||
                  (ingredient.cooked && stepNumber >= currentStep)))
            );
          },
        ),
      };
      isIngredientEmpty = filtered.ingredients.length === 0;
      if (
        (!('optional' in filtered) ||
          (typeof filtered.optional === 'number' &&
            optional[filtered.optional])) &&
        !isIngredientEmpty
      ) {
        result.push(filtered);
        currentStep += 1;
      }
    });
    return result;
  }, [steps, optional, stepNumber]);

  const sortedIngredients: Array<IngredientGroupType> = useMemo(() => {
    const result: Array<IngredientGroupType> = [];
    filteredIngredients.map((group, index) => {
      const sorted: IngredientGroupType = {
        ...group,
        status:
          stepNumber > 0 && stepNumber - 1 === index
            ? 'active'
            : stepNumber > 0 && stepNumber > index
              ? 'complete'
              : 'ready',
      };
      result.push(sorted);
    });

    const categoryOrder = {
      active: 0,
      ready: 1,
      complete: 2,
    };

    return result.sort((a, b) => {
      const categoryAOrder = categoryOrder[a.status || 'ready'];
      const categoryBOrder = categoryOrder[b.status || 'ready'];
      if (categoryAOrder !== categoryBOrder) {
        return categoryAOrder - categoryBOrder;
      }

      return 0;
    });
  }, [stepNumber, filteredIngredients]);

  const searchWords = useMemo(() => {
    if (stepNumber === 0) {
      return [];
    } else {
      const words: Array<string[]> = [];
      filteredIngredients[stepNumber - 1].ingredients.forEach((item) => {
        if (item.name) words.push(item.name.split(' '));
      });
      return words;
    }
  }, [stepNumber, filteredIngredients]);

  useEffect(() => {
    const initialOptionalState: OptionalType = {};
    const { optional_ingredients } = recipe ?? { optional_ingredients: [] };
    if (optional_ingredients && optional_ingredients.length > 0) {
      optional_ingredients.forEach((ingredient) => {
        initialOptionalState[ingredient.id] = false;
      });
      setOptional(initialOptionalState);
    }
  }, [recipe]);

  const filteredInstructions: Array<InstructionGroupType> = useMemo(() => {
    const result: Array<InstructionGroupType> = [];
    steps.forEach((step: StepType) => {
      const { instructions: instructionGroup } = step;
      const {
        instructions,
      }: { instructions: InstructionGroupType['instructions'] } =
        instructionGroup;
      const filtered: InstructionGroupType = {
        ...instructionGroup,
        title: instructionGroup.title,
        background: instructionGroup.background,
        instructions: Array.isArray(instructions)
          ? instructions.filter((instruction: InstructionType) => {
              return (
                !('optional' in instruction) ||
                (typeof instruction.optional === 'number' &&
                  optional[instruction.optional])
              );
            })
          : [],
      };
      if (filtered.instructions.length > 0) result.push(filtered);
    });

    return result;
  }, [optional, steps]);

  useEffect(() => {
    setMaxStep(filteredInstructions.length);
  }, [filteredInstructions]);

  return (
    <RecipeContext.Provider
      value={{
        stepNumber,
        setStepNumber,
        recipeImage,
        setRecipeImage,
        recipe,
        maxStep,
        sortedIngredients,
        filteredInstructions,
        setOptional,
        searchWords,
        optional,
        isComplete,
        expandImg,
        setExpandImg,
      }}
    >
      <>{children}</>
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
