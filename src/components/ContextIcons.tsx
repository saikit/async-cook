import {
  LucideIcon,
  ChefHat,
  CircleAlert,
  CircleHelp,
  Clock,
  Play,
  Image,
  Images,
  GalleryHorizontal,
} from 'lucide-react';

function ContextIcons({ category }: { category: string }) {
  let Icon: LucideIcon;
  switch (category) {
    case 'alert':
      Icon = CircleAlert;
      break;
    case 'explanation':
      Icon = CircleHelp;
      break;
    case 'recommendation':
      Icon = ChefHat;
      break;
    case 'preparation':
      Icon = Clock;
      break;
    case 'video':
      Icon = Play;
      break;
    case 'image':
      Icon = Image;
      break;
    case 'images':
      Icon = Images;
      break;
    case 'gallery':
      Icon = GalleryHorizontal;
      break;
    default:
      Icon = CircleHelp;
  }

  return <Icon size={24} color="#57534d" />;
}

export default ContextIcons;
