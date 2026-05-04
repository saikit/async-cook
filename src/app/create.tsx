import type { Route } from './+types/create';
import { Form } from 'react-router';
import ManageFooter from '@/components/manage/ManageFooter';
const API_URL = import.meta.env.VITE_API_URL;
import { getHeaders } from '@/hooks/getHeaders';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

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
  useEffect(() => {
    if (actionData) {
      navigate(`/manage/update/${actionData.data.slug}`, { replace: true });
    }
  }, [actionData, navigate]);
  return (
    <>
      <Form
        className="flex justify-center p-4 h-[calc(100vh-136px))]"
        id="form"
      >
        <textarea
          className="text-4xl font-bold text-center w-100"
          name="title"
          rows={3}
          placeholder="Recipe title"
          required
        ></textarea>
      </Form>
      <ManageFooter buttonName="Create Recipe" />
    </>
  );
}

export default CreateRecipe;
