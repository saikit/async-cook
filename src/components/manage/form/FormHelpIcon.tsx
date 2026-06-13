import ContextIcons from '@/components/ContextIcons';
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from '@/components/ui/popover';

function FormHelpIcon({ children }) {
  const content = (
    <Popover>
      <PopoverTrigger className="align-top ml-1 print:hidden">
        <ContextIcons category="help" />
      </PopoverTrigger>
      <PopoverContent>
        <p>{children}</p>
      </PopoverContent>
    </Popover>
  );
  return content;
}

export default FormHelpIcon;
