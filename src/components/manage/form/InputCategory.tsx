import { useManage } from '@/context/Manage/ManageProvider';
import { useFormContext } from 'react-hook-form';

function InputCategory() {
  const { register } = useFormContext();
  const { manageView } = useManage();
  const { categories } = manageView;
  const content = (
    <div className="mb-4 flex gap-2">
      <label>Category</label>
      <select {...register('category')} className="w-full border rounded">
        {categories?.map((category) => (
          <option key={category.id} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
    </div>
  );
  return content;
}

export default InputCategory;
