import { Field, FieldLabel } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useManage } from '@/context/Manage/ManageProvider';

function InputCategory({ hookForm }) {
  const { manageView } = useManage();
  const { categories } = manageView;
  const content = (
    <Controller
      name="category"
      control={hookForm.control}
      render={({ field }) => (
        <Field>
          <FieldLabel>Category</FieldLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-100">
              <SelectValue placeholder="Select a category">
                {field.value}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.category}>
                    {category.category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
  return content;
}

export default InputCategory;
