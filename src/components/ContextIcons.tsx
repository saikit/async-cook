import { LucideIcon, ChefHat, CircleAlert, CircleHelp } from 'lucide-react';

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
    default:
      Icon = CircleHelp;
  }

  return <Icon size={24} color="#57534d" />;
}

export default ContextIcons;
