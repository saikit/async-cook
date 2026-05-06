import type { Route } from './+types/create';
import ManageFooter from '@/components/manage/ManageFooter';
const API_URL = import.meta.env.VITE_API_URL;
import { getHeaders } from '@/hooks/getHeaders';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import ManageForm from '@/components/manage/form/ManageForm';
import InputCategory from '@/components/manage/form/InputCategory';
import InputEquipment from '@/components/manage/form/InputEquipment';
import InputIntro from '@/components/manage/form/InputIntro';
import InputReference from '@/components/manage/form/InputReference';
import InputTitle from '@/components/manage/form/InputTitle';
import z from 'zod';
import { recipeFormSchema } from '@/types/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmit } from 'react-router';

type FormData = z.input<typeof recipeFormSchema>;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const res = await fetch(`${API_URL}/recipe/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders(),
    credentials: 'include',
  });

  if (!res.ok) {
    return { success: false, message: 'Failed to create recipe.' };
  }

  const recipe = await res.json();

  return recipe;
}

function CreateRecipe({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const hookForm = useForm<FormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: '',
      category: 'None',
      intro: '',
      reference: '',
      equipment: [],
    },
  });
  const submit = useSubmit();
  const onSubmit = (data: FormData) => {
    submit(data);
  };

  useEffect(() => {
    if (actionData) {
      navigate(`/manage/update/${actionData.data.slug}`, { replace: true });
    }
  }, [actionData, navigate]);
  return (
    <>
      <ManageForm hookForm={hookForm} onSubmit={onSubmit}>
        <InputTitle hookForm={hookForm} />
        <InputCategory hookForm={hookForm} />
        <InputIntro hookForm={hookForm} />
        <InputReference hookForm={hookForm} />
        <InputEquipment hookForm={hookForm} />
      </ManageForm>
      <ManageFooter buttonName="Create Recipe" />
    </>
  );
}

export default CreateRecipe;
