export type RecipeType = {
  steps: Array<StepType>;
  title: string;
  intro?: string;
  reference?: string;
  optional_ingredients?: Array<{
    name: string;
    id: number;
  }>;
  equipment: Array<EquipmentType>;
};

export type EquipmentType = {
  id: number;
  name: string;
  description: string;
};

export type StepType = {
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
  category: string;
  note: string;
};

export type RecipesListType = {
  id: number;
  title: string;
  slug: string;
  tags: Array<{ equipment: { name: string; icon: string } }>;
};

export type foodDataType = Array<{
  description: string;
  foodNutrients: Array<{
    name: string;
    amount: number;
    unitName: string;
    number: number;
  }>;
}>;
