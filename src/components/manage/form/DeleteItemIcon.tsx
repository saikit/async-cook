import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

const API_URL = import.meta.env.VITE_API_URL;

function DeleteItemIcon({
  model,
  id,
  children,
}: {
  model: string;
  id: number;
  children: React.ReactNode;
}) {
  if (!model || !id) return null;
  const content = (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={`${API_URL}/recipe/${model}/${id}`}>
          <DialogHeader>
            <DialogTitle className="text-xl mb-2 font-bold uppercase">
              Delete Item
            </DialogTitle>
            <DialogDescription className="text-left">
              <p className="mb-4">Are you sure you want to delete this item?</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
  return content;
}

export default DeleteItemIcon;
