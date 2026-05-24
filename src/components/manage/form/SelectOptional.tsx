import { useRouteLoaderData } from 'react-router';
import { UpdateFormType } from '@/app/update';
import { useFormContext } from 'react-hook-form';

function SelectOptional({ values }) {
  const { register } = useFormContext();
  const routeLoaderData = useRouteLoaderData('update') as UpdateFormType;
  const { recipe } = routeLoaderData;
  if (recipe.optional_ingredients?.length === 0) return false;

  const content = (
    <select
      {...register(values, {
        setValueAs: (v) => (v === '' || v === null ? null : Number(v)),
      })}
      className="border rounded w-full"
    >
      <option value="">None</option>
      {recipe.optional_ingredients?.map((ingredient) => (
        <option key={ingredient.id} value={ingredient.id}>
          {ingredient.name}
        </option>
      ))}
    </select>
  );
  return content;
}

export default SelectOptional;
