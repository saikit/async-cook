import { Badge } from './ui/badge';
import { FlavorType } from '@/types/api';
import { cn } from '@/lib/utils';

function RecipeFlavorBadge({
  flavor,
  index,
  className,
}: {
  flavor: FlavorType;
  index?: number;
  className?: string;
}) {
  const twBadgeColors = [
    'text-red-600 border-red-600',
    'text-lime-500 border-lime-500',
    'text-red-300 border-red-300',
    'text-cyan-400 border-cyan-400',
    'text-purple-500 border-purple-500',
    'text-amber-900 border-amber-900',
    'text-stone-800 border-stone-800',
    'text-yellow-500 border-yellow-500',
    'text-black border-black',
  ];

  return (
    <Badge
      variant="outline"
      className={cn(
        'align-middle print:hidden',
        twBadgeColors[flavor.color],
        className,
      )}
      key={`flavor-${index}`}
    >
      {flavor.name}
    </Badge>
  );
}
export default RecipeFlavorBadge;
