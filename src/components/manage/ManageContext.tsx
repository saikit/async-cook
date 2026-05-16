import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  useForm,
  FieldValues,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageContextSchema } from '@/types/form';
import { getHeaders } from '@/hooks/getHeaders';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useManage } from '@/context/Manage/ManageProvider';
import ContextIcons from '../ContextIcons';
import { CirclePlus } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { RecipeNoteIconType } from '@/types/api';
import { useState } from 'react';
import { useRevalidator } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

function ManageContext({
  context,
  ingredient_id,
  instruction_id,
}: {
  context: RecipeNoteIconType[];
  ingredient_id?: number;
  instruction_id?: number;
}) {
  const { revalidate } = useRevalidator();

  const submitHandler = async function (request: FieldValues) {
    const res = await fetch(`${API_URL}/recipe/context`, {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: getHeaders(),
      credentials: 'include',
    });

    if (!res.ok) {
      toast('Failed to update context.');
      return;
    }

    revalidate();
    setOpen(false);
    const data = await res.json();
    if (data.message) return toast(data.message);
  };

  const { manageView } = useManage();
  const { icons } = manageView;
  const [open, setOpen] = useState(false);

  const hookForm = useForm({
    resolver: zodResolver(manageContextSchema),
    values: {
      context:
        context?.length > 0
          ? context.map((item) => ({
              ...item,
              category_id: item.category_id ?? item.icon?.id,
            }))
          : [
              {
                category_id: icons?.[0]?.id,
                note: '',
                instruction_id: instruction_id ?? null,
                ingredient_id: ingredient_id ?? null,
              },
            ],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = hookForm;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'context',
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-1 cursor-pointer">
          {context?.length > 0 ? (
            context.map((note, i) => (
              <ContextIcons key={i} category={note.icon.category} />
            ))
          ) : (
            <CirclePlus size={24} color="#57534d" />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl mb-2 font-bold uppercase">
            Manage Context
          </DialogTitle>
          <DialogDescription className="text-left"></DialogDescription>
        </DialogHeader>
        <form
          id="manage-context"
          className="mb-4 p-4 border rounded bg-card text-card-foreground shadow-sm"
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(submitHandler, (errors) => {
              console.error('Validation Errors:', errors);
            })(e);
          }}
        >
          {fields.map((field, contextIndex) => (
            <div className="grid gap-3" key={field.id}>
              <fieldset>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Category
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(contextIndex)}
                    className="text-red-500 h-6 w-6 p-0 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="mt-1">
                  <select
                    {...register(`context.${contextIndex}.category_id`)}
                    className="border rounded p-2 mt-1"
                  >
                    {icons?.map((icon) => (
                      <option key={icon.id} value={icon.id}>
                        {icon.category?.[0]?.toUpperCase() +
                          icon.category?.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
              <fieldset className="mt-3">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Note
                </label>
                <textarea
                  rows="3"
                  className="w-full border rounded p-2 mt-1"
                  {...register(`context.${contextIndex}.note`)}
                />
                {errors?.context?.[contextIndex]?.note && (
                  <p className="text-red-500">
                    {errors.context[contextIndex].note.message}
                  </p>
                )}
              </fieldset>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                append({
                  category_id: icons?.[0]?.id,
                  note: '',
                  instruction_id: instruction_id ?? null,
                  ingredient_id: ingredient_id ?? null,
                });
              }}
            >
              Add Context
            </Button>
            <Button type="submit" form="manage-context" size="sm">
              Update Context
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ManageContext;
