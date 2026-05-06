import * as z from 'zod';

export const recipeFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title must be less than 255 characters.' }),
  intro: z.string(),
  reference: z.url().optional().or(z.literal('')),
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
});

export const updateRecipeFormSchema = recipeFormSchema.extend({
  id: z.number(),
  user_id: z.number(),
  published: z.coerce.number().optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
    .min(1, { message: 'Slug is required.' })
    .max(255, { message: 'Slug must be less than 255 characters.' }),
});
