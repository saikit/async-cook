import type { RecipeNoteIconType } from '@/types/api';
import ContextIcons from './ContextIcons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function RecipeNoteIcon({ note }: { note: RecipeNoteIconType }) {
  return (
    <Popover>
      <PopoverTrigger
        className="align-top ml-1 print:hidden"
        title={note.icon.category}
      >
        <ContextIcons category={note.icon.category} />
      </PopoverTrigger>
      <PopoverContent>
        <p>{note.note}</p>
      </PopoverContent>
    </Popover>
  );
}
export default RecipeNoteIcon;
