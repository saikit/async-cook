import { useManage } from '@/context/Manage/ManageProvider';
import { useFormContext } from 'react-hook-form';

function InputCategory() {
  const { register } = useFormContext();
  const { manageView } = useManage();
  const { categories } = manageView;
  const content = (
    <select {...register('category')} className="w-full mb-4">
      {categories?.map((category) => (
        <option key={category.id} value={category.category}>
          {category.category}
        </option>
      ))}
    </select>
  );
  return content;
}

export default InputCategory;
