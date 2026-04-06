export type RecipeType = {
  steps: Array<StepType>,
  title: string,
  intro?: string,
  reference?: string,
  optional_ingredients?: Array<{
    name: string
  }>,
  tags: Array<{
    'equipment': EquipmentType
  }>
}

export type EquipmentType = {
  name: string,
  description: string
}

export type StepType = {
  ingredients: IngredientGroupType,
  instructions: InstructionGroupType,
}

export type InstructionGroupType = {
  title: string,
  background?: string,
  instructions: Array<InstructionType>
  optional?: string,
}

export type InstructionType = {
  text: string,
  optional?: string,
  context?: Array<RecipeNoteIconType>
}

export type IngredientGroupType = {
  text?: string,
  step: number,
  calculator?: {
    text: string,
    calculator_ingredients: Array<IngredientType>
  },
  ingredients: Array<IngredientType>,
  optional?: string,
  status?: "ready" | "active" | "complete";
}

export type IngredientType = {
  name: string,
  quantity?: number,
  unit?: string,
  variable?: number,
  context?: Array<RecipeNoteIconType>,
  cooked?: boolean,
  fdc_id?: number
}

export type RecipeNoteIconType = {
  category: string,
  note: string,
}
