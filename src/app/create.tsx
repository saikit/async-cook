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
import { useRouteLoaderData } from 'react-router';
import type { UserType } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmit } from 'react-router';
import { toast } from 'sonner';

type FormData = z.input<typeof recipeFormSchema>;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.json();
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
  const data =
    useRouteLoaderData<Route.ComponentProps['loaderData']>('manage-layout');
  const user = data?.user as UserType | undefined;

  const hookForm = useForm<FormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: '',
      category: 'None',
      intro: '',
      reference: '',
      equipment: [],
      user_id: user?.id || 0,
    },
  });
  const submit = useSubmit();
  const onSubmit = (data: FormData) => {
    console.log(data);
    submit(data, { method: 'POST', encType: 'application/json' });
  };

  useEffect(() => {
    if (actionData && actionData.errors) {
      console.error(actionData.errors);
    }
    if (actionData && actionData.success !== false && actionData.data?.slug) {
      navigate(`/manage/update/${actionData.data.slug}`, { replace: true });
      toast(actionData.message);
    }
  }, [actionData, navigate]);
  return (
    <>
      <ManageForm hookForm={hookForm} onSubmit={onSubmit}>
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          <div className="lg:col-span-2">
            <input {...hookForm.register('user_id')} type="hidden" />
            <InputTitle />
            <InputIntro />
            <InputReference />
            <InputCategory />
          </div>
          <div>
            <InputEquipment />
          </div>
        </div>
      </ManageForm>
      <ManageFooter buttonName="Create Recipe" />
    </>
  );
}

export default CreateRecipe;
