import { useNavigate } from 'react-router';
import type { Route } from './+types/update';
import { apiClient } from '@/lib/apiClient';
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
import InputCoverImage from '@/components/manage/form/InputCoverImage';
import { useState } from 'react';
import { Maximize2, Minimize2, LucideIcon } from 'lucide-react';
import type { UpdateFormType } from '@/app/update';
import { Skeleton } from '@/components/ui/skeleton';

type FormData = z.input<typeof updateRecipeFormSchema>;

export type UpdateFormType = {
  recipe: RecipeType;
};

const API_URL = import.meta.env.VITE_API_URL;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const recipe = await apiClient<RecipeType>(
      `${API_URL}/manage/recipe/${params.slug}`,
      {
        includeAuth: true,
      },
    );
    return recipe;
  } catch (error) {
    if ((error as any).status === 403) throw redirect('/not-found');
    throw error;
  }
}

export async function clientAction({
  request: routeRequest,
}: Route.ClientActionArgs) {
  try {
    const data = await routeRequest.json();
    const id = data.id;
    return await apiClient<any>(`${API_URL}/manage/recipe/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      includeAuth: true,
    });
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to update project.',
    };
  }
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

  const normalizeRecipeForForm = (recipe: RecipeType): FormData => ({
    id: recipe.id ?? 0,
    user_id: recipe.user_id ?? 0,
    title: recipe.title ?? '',
    category: recipe.category ?? 'None',
    slug: recipe.slug ?? '',
    intro: recipe.intro ?? '',
    reference: recipe.reference ?? '',
    published: recipe.published ?? 0,
    optional_ingredients: recipe.optional_ingredients ?? [],
    equipment: recipe.equipment ?? [],
    cover_img_id: recipe.cover_img?.uuid ?? '',
    steps:
      recipe.steps?.length > 0
        ? recipe.steps.map((step) => ({
            ...step,
            ingredients: {
              id: step.ingredients?.id,
              text: step.ingredients?.text ?? null,
              optional: step.ingredients?.optional ?? null,
              step_id: step.ingredients?.step_id ?? 0,
              ingredients: step.ingredients?.ingredients?.map((ingredient) => ({
                id: ingredient.id,
                quantity: ingredient.quantity ?? null,
                cooked: ingredient.cooked ?? false,
                ing_order: ingredient.ing_order ?? 0,
                unit: ingredient.unit ?? '',
                name: ingredient.name ?? '',
                fdc_id: ingredient.fdc_id ?? null,
                group_id: ingredient.group_id,
                optional: ingredient.optional ?? null,
                context: ingredient.context ?? [],
                media_id: ingredient.media?.uuid ?? '',
              })) ?? [
                {
                  quantity: null,
                  cooked: false,
                  ing_order: 0,
                  unit: '',
                  name: '',
                  fdc_id: null,
                  optional: null,
                  context: [],
                  media_id: '',
                },
              ],
            },
            instructions: {
              id: step.instructions?.id,
              title: step.instructions?.title ?? '',
              optional: step.instructions?.optional ?? null,
              step_id: step.instructions?.step_id ?? 0,
              instructions: step.instructions?.instructions?.map(
                (instruction) => ({
                  id: instruction.id,
                  text: instruction.text ?? '',
                  int_order: instruction.int_order ?? 0,
                  group_id: instruction.group_id,
                  optional: instruction.optional ?? null,
                  context: instruction.context ?? [],
                  media_id: instruction.media?.uuid ?? '',
                }),
              ) ?? [
                {
                  text: '',
                  int_order: 0,
                  optional: null,
                  context: [],
                  media_id: '',
                },
              ],
            },
          }))
        : [
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
                    optional: null,
                    media_id: '',
                  },
                ],
              },
              instructions: {
                title: '',
                instructions: [
                  {
                    text: '',
                    int_order: 0,
                    optional: null,
                    media_id: '',
                  },
                ],
              },
            },
          ],
  });

  const hookForm = useForm<FormData>({
    resolver: zodResolver(updateRecipeFormSchema),
    values: normalizeRecipeForForm(recipe),
  });
  const submit = useSubmit();
  const onSubmit = (data: FormData) => {
    submit(data as any, { method: 'PUT', encType: 'application/json' });
  };

  const [expandImg, setExpandImg] = useState(false);
  let Icon: LucideIcon;
  if (expandImg) Icon = Minimize2;
  else Icon = Maximize2;
  const recipeImage = recipe.cover_img?.url ?? '';
  const isVideo = recipeImage.toLowerCase().endsWith('.mp4');

  if (!recipe) return <>Loading...</>;

  return (
    <>
      {!recipe.cover_img ? (
        <></>
      ) : (
        <div
          onClick={() => setExpandImg((prev) => !prev)}
          className={`${expandImg ? 'h-[50vh]' : 'h-16'} w-full transition-all duration-300 ease-in-out z-1 relative bg-cover bg-center overflow-hidden`}
          style={{
            backgroundImage: !isVideo ? `url(${recipeImage})` : undefined,
          }}
        >
          <Icon
            className="top-2 right-2 absolute m-auto opacity-80 shadow-black z-10"
            color="white"
          />
          {isVideo && (
            <video
              key={recipeImage}
              loop
              autoPlay
              muted
              className="h-full w-full absolute object-cover -z-1 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            >
              <source src={recipeImage} type="video/mp4" />
            </video>
          )}
        </div>
      )}
      <ManageForm hookForm={hookForm} onSubmit={onSubmit}>
        <InputCoverImage media={recipe.media} />
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
            <InputOptionalIngredients />
          </div>
        </div>
        <hr className="my-4" />
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
