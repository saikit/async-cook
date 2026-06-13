import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '@/lib/apiClient';
import z from 'zod';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import type { RecipeType, StepType } from '@/types/api';
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

  const submitHandler = async function (formData) {
    try {
      const data = await apiClient<StepType>(`${API_URL}/recipe/step`, {
        method: 'POST',
        body: JSON.stringify(formData),
        includeAuth: true,
      });
      if (data.message) {
        toast(data.message);
        setMaxStep((prev) => prev + 1);
        hookForm.setValue('step', maxStep + 1);
        navigate(`/manage/update/${recipe.slug}`, {
          replace: true,
          preventScrollReset: true,
        });
      }
      return data;
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message || 'Failed to create step.',
      };
    }
  };

  const { register, handleSubmit } = hookForm;
  const content = (
    <form onSubmit={handleSubmit(submitHandler)} className="px-4 mb-4">
      <label className="text-xs font-bold uppercase mr-2">Add Step</label>
      <input
        type="number"
        {...register('step')}
        className="border rounded p-2 mr-2"
        min="1"
        max={maxStep}
      />
      <Button type="submit">Add Step</Button>
    </form>
  );
  return content;
}

export default CreateStep;
