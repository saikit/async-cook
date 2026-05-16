import { useNavigate } from 'react-router';
import type { Route } from './+types/update';
import { getHeaders } from '@/hooks/getHeaders';
import { useEffect } from 'react';
import ManageFooter from '@/components/manage/ManageFooter';
import { redirect } from 'react-router';
import type { RecipeType } from '@/types/api';
import ManageForm from '@/components/manage/form/ManageForm';
import InputCategory from '@/components/manage/form/InputCategory';
import InputEquipment from '@/components/manage/form/InputEquipment';
import InputIntro from '@/components/manage/form/InputIntro';
import InputReference from '@/components/manage/form/InputReference';
import InputTitle from '@/components/manage/form/InputTitle';
import InputSlug from '@/components/manage/form/InputSlug';
import InputPublished from '@/components/manage/form/InputPublished';
import { updateRecipeFormSchema } from '@/types/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router';
import InputStep from '@/components/manage/form/InputStep';
import InputIngredient from '@/components/manage/form/InputIngredient';
import InputInstructionGroup from '@/components/manage/form/InputInstructionGroup';
import InputIngredientGroup from '@/components/manage/form/InputIngredientGroup';
import InputInstruction from '@/components/manage/form/InputInstruction';
import InputOptionalIngredients from '@/components/manage/form/InputOptionalIngredients';
import { toast } from 'sonner';
import CreateStep from '@/components/manage/CreateStep';

type FormData = z.input<typeof updateRecipeFormSchema>;

export type UpdateFormType = {
  recipe: RecipeType;
};

const API_URL = import.meta.env.VITE_API_URL;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`${API_URL}/manage/recipe/${params.slug}`, {
    headers: getHeaders(),
    credentials: 'include',
  });
  if (!res.ok) {
    if (res.status === 403) throw redirect('/not-found');
  }
  const recipe = await res.json();
  console.log(recipe);
  return recipe;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.json();
  const id = data.id;
  const res = await fetch(`${API_URL}/manage/recipe/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: getHeaders(),
    credentials: 'include',
  });

  if (!res.ok) {
    return { success: false, message: 'Failed to update project.' };
  }

  const recipe = await res.json();

  return recipe;
}

function UpdateRecipe({ loaderData, actionData }: Route.ComponentProps) {
  const { recipe }: UpdateFormType = loaderData;
  const { slug } = recipe;
  const navigate = useNavigate();
  useEffect(() => {
    if (actionData) {
      toast(actionData.message);
      if (
        actionData.success !== false &&
        actionData.data?.slug &&
        actionData.data.slug !== slug
      ) {
        navigate(`/manage/update/${actionData.data.slug}`, { replace: true });
      }
    }
  }, [actionData, navigate, slug]);

  const hookForm = useForm<FormData>({
    resolver: zodResolver(updateRecipeFormSchema),
    defaultValues: {
      id: 0,
      user_id: 0,
      title: '',
      category: 'None',
      slug: '',
      intro: '',
      reference: '',
      published: 0,
      optional_ingredients: [],
      equipment: [],
      steps: [
        {
          ingredients: {
            text: null,
            ingredients: [
              {
                quantity: null,
                cooked: false,
                ing_order: 0,
                unit: '',
                name: '',
                fdc_id: null,
              },
            ],
          },
          instructions: {
            title: '',
            instructions: [
              {
                text: '',
                int_order: 0,
              },
            ],
          },
        },
      ],
    },
    values: recipe,
  });
  const submit = useSubmit();
  const onSubmit = (data: FormData) => {
    submit(data, { method: 'PUT', encType: 'application/json' });
  };

  if (!recipe) return <>Loading...</>;

  return (
    <>
      <ManageForm hookForm={hookForm} onSubmit={onSubmit}>
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          <div className="lg:col-span-2">
            <input {...hookForm.register('id')} type="hidden" />
            <input {...hookForm.register('user_id')} type="hidden" />
            <InputTitle />
            <InputIntro />
            <InputReference />
          </div>
          <div>
            <InputCategory />
            <InputSlug />
            <InputPublished />
            <InputEquipment />
            {(recipe.optional_ingredients?.length ?? 0) > 0 && (
              <InputOptionalIngredients />
            )}
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          {recipe.steps.map((step, index) => {
            return (
              <>
                <InputStep key={index} step={step}>
                  <InputIngredientGroup index={index}>
                    <>
                      <InputIngredient index={index} />
                      <hr className="my-4" />
                    </>
                  </InputIngredientGroup>
                  <InputInstructionGroup index={index}>
                    <InputInstruction index={index} />
                  </InputInstructionGroup>
                </InputStep>
              </>
            );
          })}
        </div>
      </ManageForm>
      <CreateStep recipe={recipe} />
      <ManageFooter buttonName="Update Recipe" />
    </>
  );
}

export default UpdateRecipe;
