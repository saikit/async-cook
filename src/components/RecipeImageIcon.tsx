import type { InstructionType } from '@/types/api';
import ContextIcons from './ContextIcons';
import { useContext } from 'react';
import RecipeContext from '@/context/RecipeProvider';

function RecipeImageIcon({ instruction }: { instruction: InstructionType }) {
  const { media } = instruction;
  const { setRecipeImage, stepNumber, setExpandImg } =
    useContext(RecipeContext);

  if (!media || stepNumber === 0) return null;

  const onClick = () => {
    setRecipeImage(media.url);
    setExpandImg(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const icon = media.url.toLowerCase().endsWith('.mp4') ? 'video' : 'image';
  return (
    <div onClick={onClick} className="inline-block">
      <ContextIcons category={icon} />
    </div>
  );
}
export default RecipeImageIcon;
