import { useForm, FieldValues, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadMediaSchema } from '@/types/form';
import { apiClient } from '@/lib/apiClient';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL;

function UploadMedia() {
  const { manageView, refetch } = useManage();

  const submitHandler = async function (formData: FieldValues) {
    try {
      const data = await apiClient<any>(`${API_URL}/media`, {
        method: 'POST',
        body: JSON.stringify(formData),
        includeAuth: true,
      });
      await refetch();
      if (data.message) return toast(data.message);
    } catch (error) {
      toast('Failed to update equipment.');
    }
  };

  const { recipes } = manageView;

  const hookForm = useForm({
    resolver: zodResolver(uploadMediaSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = hookForm;
  const { fields } = useFieldArray({
    control,
    name: 'media',
  });

  return (
    <form
      id="upload-media"
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(submitHandler, (errors) => {
          console.error('Validation Errors:', errors);
        })(e);
      }}
      className="mb-4"
    >
      <fieldset className="mb-4">
        <select {...register(`model_id`)} className="border rounded">
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.title}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset className="mb-4">
        <input {...register('media')} type="file" className="border rounded" />
        {errors?.media && (
          <p className="text-red-500">{errors.media.message}</p>
        )}
      </fieldset>
      <fieldset className="contents">
        <Button type="submit" form="upload-media">
          Upload Media
        </Button>
      </fieldset>
    </form>
  );
}

export default UploadMedia;
