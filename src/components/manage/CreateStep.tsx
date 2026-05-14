import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getHeaders } from '@/hooks/getHeaders';
import z from 'zod';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import type { RecipeType } from '@/types/api';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function CreateStep({ recipe }: { recipe: RecipeType }) {
  const navigate = useNavigate();
  const { steps } = recipe;
  const [maxStep, setMaxStep] = useState(steps.length + 1);
  const hookForm = useForm({
    resolver: zodResolver(
      z.object({ step: z.number(), recipe_id: z.number() }),
    ),
    defaultValues: {
      step: maxStep,
      recipe_id: recipe.id,
    },
  });

  const submitHandler = async function (request) {
    const res = await fetch(`${API_URL}/recipe/step`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: getHeaders(),
      credentials: 'include',
    });

    if (!res.ok) {
      return { success: false, message: 'Failed to create step.' };
    }

    const step = await res.json();
    if (step.message) {
      toast(step.message);
      navigate(`/manage/update/${recipe.slug}`, {
        replace: true,
        preventScrollReset: true,
      });
    }

    return step;
  };

  const { register, handleSubmit } = hookForm;
  const content = (
    <form onSubmit={handleSubmit(submitHandler)} className="px-4">
      <label className="text-xs font-bold uppercase">Add Step</label>
      <input
        type="number"
        {...register('step')}
        className="border rounded p-2"
        min="1"
        max={maxStep}
      />
      <Button type="submit">Add Step</Button>
    </form>
  );
  return content;
}

export default CreateStep;
