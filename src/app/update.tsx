import { useNavigate } from 'react-router';
import type { Route } from './+types/update';
import { getHeaders } from '@/hooks/getHeaders';
import { useEffect } from 'react';
import ManageFooter from '@/components/manage/ManageFooter';
import { useNotification } from '@/context/NotificationProvider';
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

type FormData = z.input<typeof updateRecipeFormSchema>;

type UpdateFormType = {
  recipe: RecipeType;
  equipment: RecipeType['equipment'];
  categories: Array<{
    id: number;
    category: string;
  }>;
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
  return recipe;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const id = formData.get('id');
  const res = await fetch(`${API_URL}/recipe/${id}/recipe`, {
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
  const { recipe }: UpdateFormType = loaderData.data;
  const { slug } = recipe;
  const { notify } = useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    if (actionData) {
      notify(actionData.message);
      if (
        actionData.success !== false &&
        actionData.data?.slug &&
        actionData.data.slug !== slug
      ) {
        navigate(`/manage/update/${actionData.data.slug}`, { replace: true });
      }
    }
  }, [actionData, notify, navigate, slug]);

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
      equipment: [],
    },
    values: recipe,
  });
  const submit = useSubmit();
  const onSubmit = (data: FormData) => {
    submit(data);
  };

  return (
    <>
      <ManageForm hookForm={hookForm} onSubmit={onSubmit}>
        <input {...hookForm.register('id')} type="hidden" />
        <input {...hookForm.register('user_id')} type="hidden" />
        <InputTitle hookForm={hookForm} />
        <InputCategory hookForm={hookForm} />
        <InputSlug hookForm={hookForm} />
        <InputIntro hookForm={hookForm} />
        <InputReference hookForm={hookForm} />
        <InputPublished hookForm={hookForm} />
        <InputEquipment hookForm={hookForm} />
      </ManageForm>
      <ManageFooter buttonName="Update Recipe" />
    </>
  );
}

export default UpdateRecipe;
