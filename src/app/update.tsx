import { Input } from '../components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Link, useNavigate } from 'react-router';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '../components/ui/textarea';
import { Form } from 'react-router';
import type { Route } from './+types/update';
import { getHeaders } from '@/hooks/getHeaders';
import { useState, useEffect } from 'react';
import ManageFooter from '@/components/manage/ManageFooter';
import { useNotification } from '@/context/NotificationProvider';
import { redirect } from 'react-router';
import type { RecipeType } from '@/types/api';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type UpdateFormType = {
  recipe: RecipeType;
  equipment: RecipeType['equipment'];
  categories: Array<{
    id: number;
    category: number;
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
  const { recipe, equipment, categories }: UpdateFormType = loaderData.data;
  const { title, id, user_id, intro, reference, slug, published } = recipe;
  const [isPublished, setIsPublished] = useState(published);
  const [selectEquipment, setSelectEquipment] = useState<{
    [key: string]: boolean;
  }>({});
  const [showReference, setShowReference] = useState<string | undefined>(
    reference,
  );
  const { notify } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const initialSelectedEquipment: { [key: string]: boolean } = {};
    recipe.equipment.forEach((item) => {
      initialSelectedEquipment[item.id] = true;
    });
    setSelectEquipment(initialSelectedEquipment);
  }, [equipment, recipe.equipment]);

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

  return (
    <>
      <Form method="put" className="p-4" id="form">
        <FieldGroup>
          <Input type="hidden" value={id} name="id" />
          <Input type="hidden" value={user_id} name="user_id" />
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Textarea
              className="text-4xl font-bold text-center h-min"
              name="title"
              defaultValue={title}
              required
            ></Textarea>
          </Field>
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select
              name="category_id"
              defaultValue={recipe.category_id ? recipe.category_id : '0'}
            >
              <SelectTrigger className="w-100">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">None</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Slug</FieldLabel>
            <Input name="slug" defaultValue={slug} />
          </Field>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea name="intro" defaultValue={intro}></Textarea>
          </Field>
          <Field>
            <FieldLabel>Reference</FieldLabel>
            <Input
              name="reference"
              defaultValue={reference}
              onChange={(e) => setShowReference(e.target.value)}
              placeholder="Enter valid url"
            />
            <Link
              className="text-blue-700 underline"
              target="_blank"
              to={showReference || '#'}
            >
              <small>Preview URL</small>
            </Link>
          </Field>
          <Field orientation="horizontal">
            <Input type="hidden" name="published" value="0" />
            <Checkbox
              id="published"
              name="published"
              checked={!!isPublished}
              onCheckedChange={(value) => setIsPublished(!!value)}
              value="1"
            />
            <FieldLabel htmlFor="published">Published</FieldLabel>
          </Field>
          <Field>
            <FieldLabel>Equipment</FieldLabel>
            {equipment?.map((equip) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={`equipment[${equip.id}]`}
                  name="equipment[]"
                  checked={!!selectEquipment[equip.id]}
                  value={equip.id}
                  onCheckedChange={(value) =>
                    setSelectEquipment((prev) => ({
                      ...prev,
                      [equip.id]: !!value,
                    }))
                  }
                />
                <FieldLabel htmlFor={`equipment[${equip.id}]`}>
                  {equip.name}
                </FieldLabel>
              </Field>
            ))}
          </Field>
        </FieldGroup>
      </Form>
      <ManageFooter buttonName="Update Recipe" />
    </>
  );
}

export default UpdateRecipe;
