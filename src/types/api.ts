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
  cover_img_id: number;
  cover_img: MediaType;
  optional_ingredients?: Array<{
    name: string;
    id: number;
  }>;
  equipment: Array<EquipmentType>;
  published: number;
  fdc_ids: Array<number>;
  media: Array<MediaType>;
};

export type EquipmentType = {
  id: number;
  name: string;
  description: string;
};

export type StepType = {
  id: number;
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
  step_id: number;
  step: number;
  id?: number;
};

export type InstructionType = {
  text: string;
  optional?: number;
  context?: Array<RecipeNoteIconType>;
  media: MediaType;
  int_order: number;
  group_id?: number;
  id?: number;
};

export type CategoryType = {
  id: number;
  category: string;
  cat_order: number;
};

export type IngredientGroupType = {
  id?: number;
  text?: string;
  step_id: number;
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
  id?: number;
  name: string;
  quantity?: number;
  unit?: string;
  variable?: number;
  context?: Array<RecipeNoteIconType>;
  cooked?: boolean;
  fdc_id?: number;
  ing_order: number;
  optional?: number;
  group_id?: number;
  image_url?: string;
  media: MediaType;
  flavors: Array<FlavorType>;
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

export type MediaType = {
  id: number;
  uuid: string;
  url_thumbnail: string;
  url: string;
  mime_type: string;
  name: string;
  collection_name: string;
};

export type FlavorType = {
  id: number;
  name: string;
  color: number;
};
