import * as z from 'zod';

export const recipeFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title must be less than 255 characters.' }),
  intro: z.string(),
  reference: z.url().optional().or(z.literal('').nullable()),
  category: z.string(),
  equipment: z.array(
    z.preprocess((val) => {
      if (typeof val === 'object' && val !== null && 'id' in val) {
        return Number((val as { id: unknown }).id);
      }
      const parsed = Number(val);
      return Number.isNaN(parsed) ? undefined : parsed;
    }, z.number()),
  ),
  user_id: z.number(),
});

export const updateRecipeFormSchema = recipeFormSchema.extend({
  id: z.number(),
  published: z.coerce.number().optional(),
  optional_ingredients: z.array(
    z.object({
      name: z.string(),
      id: z.number(),
    }),
  ),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
    .min(1, { message: 'Slug is required.' })
    .max(255, { message: 'Slug must be less than 255 characters.' }),
  steps: z.array(
    z.object({
      step: z.number(),
      ingredient_groups: z.object({
        id: z.number().optional(),
        text: z.string().nullable(),
        optional: z.number().nullish(),
        ingredients: z.array(
          z.object({
            id: z.number().optional(),
            name: z.string(),
            quantity: z.coerce.number().nullable(),
            unit: z.string().nullable(),
            ing_order: z.coerce.number(),
            cooked: z.boolean(),
            fdc_id: z.coerce.number().nullable(),
            group_id: z.number().optional(),
          }),
        ),
      }),
      instruction_groups: z.object({
        id: z.number().optional(),
        title: z.string(),
        background: z.string().nullable(),
        instructions: z.array(
          z.object({
            id: z.number().optional(),
            text: z.string(),
            optional: z.number().nullish(),
            int_order: z.coerce.number(),
            group_id: z.number().optional(),
          }),
        ),
        optional: z.number().nullish(),
      }),
    }),
  ),
});

export const manageEquipmentSchema = z.object({
  equipment: z.array(
    z.object({
      id: z.number().optional(),
      name: z
        .string()
        .min(1, { message: 'Name is required.' })
        .max(25, { message: 'Name must be less than 25 characters.' }),

      description: z.string().min(1, { message: 'Description is required.' }),
    }),
  ),
});

export const manageCategoriesSchema = z.object({
  category: z.array(
    z.object({
      id: z.number().optional(),
      cat_order: z.coerce.number(),
      category: z
        .string()
        .min(1, { message: 'Category is required.' })
        .max(25, { message: 'Category must be less than 25 characters.' }),
    }),
  ),
});
