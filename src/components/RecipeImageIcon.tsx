import type { InstructionType } from '@/types/api';
import ContextIcons from './ContextIcons';
import { useContext } from 'react';
import RecipeContext from '@/context/RecipeProvider';

function RecipeImageIcon({ instruction }: { instruction: InstructionType }) {
  const { image_url } = instruction;
  const { setRecipeImage, stepNumber, setExpandImg } =
    useContext(RecipeContext);

  if (!image_url || stepNumber === 0) return null;

  const onClick = () => {
    setRecipeImage(image_url);
    setExpandImg(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const icon = image_url.toLowerCase().endsWith('.mp4') ? 'video' : 'image';
  return (
    <div onClick={onClick} className="inline-block">
      <ContextIcons category={icon} />
    </div>
  );
}
export default RecipeImageIcon;
