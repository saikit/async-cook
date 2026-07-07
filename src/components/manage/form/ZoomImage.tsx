import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';

function ZoomImage({ children, media }) {
  const content = (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <img src={media.url_thumbnail} className="w-full" alt={media.name} />
      </DialogContent>
    </Dialog>
  );
  return content;
}

export default ZoomImage;
