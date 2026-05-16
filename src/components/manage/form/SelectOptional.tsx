function SelectOptional({ values }) {
  const content = (
    <select {...register(values)} className="border rounded">
      <option value={null}>None</option>
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
