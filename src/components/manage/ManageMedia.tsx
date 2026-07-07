import { useForm, FieldValues, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageMediaSchema } from '@/types/form';
import { apiClient } from '@/lib/apiClient';
import { Button } from '../ui/button';
import { useManage } from '@/context/Manage/ManageProvider';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import DeleteItemIcon from './form/DeleteItemIcon';

const API_URL = import.meta.env.VITE_API_URL;

function ManageMedia() {
  const { manageView, refetch } = useManage();

  const submitHandler = async function (formData: FieldValues) {
    try {
      const data = await apiClient<{ message: string }>(`${API_URL}/media`, {
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
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Image</th>
            <th>Recipe collection</th>
            <th>Delete</th>
          </tr>
        </thead>
        {fields.map((field, index) => (
          <tr>
            <td className="pb-4">
              <img
                src={media[index].url_thumbnail}
                alt={media[index].name}
                className="w-50"
              />
            </td>
            <td className="pb-4">
              <select
                {...register(`media.${index}.model_id`)}
                className="border rounded w-full"
              >
                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.title}
                  </option>
                ))}
              </select>
            </td>
            <td className="align-middle pb-4">
              <DeleteItemIcon model="media" id={media[index].id}>
                <Trash2 />
              </DeleteItemIcon>
            </td>
          </tr>
        ))}
        <tfoot className="contents">
          <tr>
            <td colSpan={3}>
              <Button type="submit" form="manage-media">
                Update Media
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  );
}

export default ManageMedia;
