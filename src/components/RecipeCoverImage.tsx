const APP_URL = import.meta.env.VITE_URL;
import { Maximize2, Minimize2, LucideIcon } from 'lucide-react';
import { useContext, useEffect } from 'react';
import RecipeContext from '@/context/RecipeProvider';

function RecipeCoverImage() {
  const { recipeImage, expandImg, setExpandImg } = useContext(RecipeContext);

  useEffect(() => {
    if (!recipeImage) {
      setExpandImg(false);
    }
  }, [recipeImage, setExpandImg]);

  let Icon: LucideIcon;
  if (expandImg) Icon = Minimize2;
  else Icon = Maximize2;

  if (!recipeImage) return null;

  const isVideo = recipeImage.toLowerCase().endsWith('.mp4');
  const content = (
    <>
      <div
        onClick={() => setExpandImg((prev) => !prev)}
        className={`${expandImg ? 'h-[50vh]' : 'h-16'} w-full transition-all duration-300 ease-in-out z-1 relative bg-cover bg-center overflow-hidden`}
        style={{
          backgroundImage: !isVideo
            ? `url(${APP_URL}/storage/${recipeImage})`
            : undefined,
        }}
      >
        <Icon
          className="top-2 right-2 absolute m-auto opacity-80 shadow-black z-10"
          color="white"
        />
        {isVideo && (
          <video
            key={recipeImage}
            loop
            autoPlay
            muted
            className="h-full w-full absolute object-cover -z-1 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          >
            <source
              src={`${APP_URL}/storage/${recipeImage}`}
              type="video/mp4"
            />
          </video>
        )}
      </div>
    </>
  );
  return content;
}

export default RecipeCoverImage;
