import { useFieldArray, useFormContext } from 'react-hook-form';

function InputOptionalIngredients() {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: 'optional_ingredients',
  });

  const content = (
    <div className="mb-4">
      <label>Optional Ingredients</label>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              {...register(`optional_ingredients.${index}.name`)}
              placeholder="Ingredient name"
            />
            <input
              type="hidden"
              {...register(`optional_ingredients.${index}.id`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
  return content;
}

export default InputOptionalIngredients;
