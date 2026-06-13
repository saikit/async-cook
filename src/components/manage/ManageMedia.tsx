import { useForm, FieldValues, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageMediaSchema } from '@/types/form';
import { apiClient } from '@/lib/apiClient';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { toast } from 'sonner';
import DeleteItemIcon from './form/DeleteItemIcon';

const API_URL = import.meta.env.VITE_API_URL;

function ManageMedia() {
  const { manageView, refetch } = useManage();

  const submitHandler = async function (formData: FieldValues) {
    try {
      const data = await apiClient<any>(`${API_URL}/media`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        includeAuth: true,
      });
      await refetch();
      if (data.message) return toast(data.message);
    } catch (error) {
      toast('Failed to update equipment.');
    }
  };

  const { media, recipes } = manageView;

  const hookForm = useForm({
    resolver: zodResolver(manageMediaSchema),
    values: {
      media: media.map((image) => ({
        model_id: image.model_id,
        id: image.id,
      })),
    },
  });

  const { register, handleSubmit, control } = hookForm;
  const { fields } = useFieldArray({
    control,
    name: 'media',
  });

  return (
    <form
      id="manage-media"
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(submitHandler, (errors) => {
          console.error('Validation Errors:', errors);
        })(e);
      }}
      className="mb-4"
    >
      {fields.map((field, index) => (
        <div className="grid grid-cols-4 gap-4 mb-2" key={field.id}>
          <img
            src={media[index].url_thumbnail}
            alt={media[index].name}
            className="w-1/4"
          />
          <select
            {...register(`media.${index}.model_id`)}
            className="border rounded col-span-2"
          >
            {recipes.map((recipe) => (
              <option key={recipe.id} value={recipe.id}>
                {recipe.title}
              </option>
            ))}
          </select>
          <DeleteItemIcon model="media" id={media[index].id}>
            <a>Delete</a>
          </DeleteItemIcon>
        </div>
      ))}
      <fieldset className="contents">
        <Button type="submit" form="manage-media">
          Update Media
        </Button>
      </fieldset>
    </form>
  );
}

export default ManageMedia;
