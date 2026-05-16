export type RecipeType = {
  id: number;
  slug: string;
  steps: Array<StepType>;
  title: string;
  intro?: string;
  reference?: string;
  category: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  optional_ingredients?: Array<{
    name: string;
    id: number;
  }>;
  equipment: Array<EquipmentType>;
  published: number;
};

export type EquipmentType = {
  id: number;
  name: string;
  description: string;
};

export type StepType = {
  ingredient_groups: IngredientGroupType;
  instruction_groups: InstructionGroupType;
  step: number;
  ingredients: IngredientGroupType;
  instructions: InstructionGroupType;
};

export type InstructionGroupType = {
  title: string;
  background?: string;
  instructions: Array<InstructionType>;
  optional?: number;
};

export type InstructionType = {
  text: string;
  optional?: number;
  context?: Array<RecipeNoteIconType>;
};

export type CategoryType = {
  id: number;
  category: string;
  cat_order: number;
};

export type IngredientGroupType = {
  text?: string;
  step: number;
  calculator?: {
    text: string;
    calculator_ingredients: Array<IngredientType>;
  };
  ingredients: Array<IngredientType>;
  optional?: number;
  status?: 'ready' | 'active' | 'complete';
};

export type IngredientType = {
  id: number;
  name: string;
  quantity?: number;
  unit?: string;
  variable?: number;
  context?: Array<RecipeNoteIconType>;
  cooked?: boolean;
  fdc_id?: number;
};

export type RecipeNoteIconType = {
  id: number;
  category_id: number;
  instruction_id?: number;
  ingredient_id?: number;
  icon: {
    category: string;
  };
  note: string;
};

export type RecipesListType = Record<string, RecipeType[]>;

export type foodDataType = Array<{
  description: string;
  foodNutrients: Array<{
    name: string;
    amount: number;
    unitName: string;
    number: number;
  }>;
}>;
