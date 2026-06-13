import { useContext, useRef, useEffect } from 'react';
import RecipeContext from '../context/RecipeProvider';
import RecipeOptionalInput from '../components/RecipeOptionalInput';
import RecipeIngredientsList from '../components/RecipeIngredientsList';
import { ScrollArea } from '../components/ui/scrollarea';
import { Link } from 'react-router';
import NutritionalInformation from '../components/NutritionalInformation';
import LoadingIcon from '../components/LoadingIcon';
import RecipeInstructionsList from '../components/RecipeInstructionsList';
import FoodDataContext from '../context/FoodDataProvider';
import RecipeEquipmentTag from '../components/RecipeEquipmentTag';
import { Separator } from '@radix-ui/react-separator';
import RecipeTitle from '@/components/RecipeTitle';
import RecipeCoverImage from '@/components/RecipeCoverImage';
import RecipeIngredientCarousel from '@/components/RecipeIngredientCarousel';

function Recipe() {
  const { stepNumber, recipe } = useContext(RecipeContext);
  const { foodDataIsComplete } = useContext(FoodDataContext);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (viewportRef.current)
      viewportRef.current
        ?.querySelector('[data-radix-scroll-area-viewport]')
        ?.scrollTo({ top: 0 });
  };

  useEffect(() => {
    scrollToTop();
  }, [stepNumber]);

  if (!recipe) {
    return <LoadingIcon />;
  }

  const { intro, reference, equipment } = recipe;

  return (
    <>
      <RecipeCoverImage />
      <header className="p-4 z-1 relative bg-white">
        <RecipeTitle />

        {stepNumber === 0 && (
          <p className="my-4">
            {intro}&nbsp;
            {reference && (
              <a
                className="text-blue-700 underline print:hidden mr-2"
                href={reference}
                target="_blank"
              >
                See original recipe
              </a>
            )}
            {equipment &&
              equipment.map((equip, index) => {
                return <RecipeEquipmentTag equip={equip} index={index} />;
              })}
          </p>
        )}
        {stepNumber === 0 && (
          <div className="sm:flex sm:justify-center print:hidden gap-0 sm:gap-2">
            {foodDataIsComplete && <NutritionalInformation />}
            {recipe.optional_ingredients && <RecipeOptionalInput />}
          </div>
        )}
      </header>
      <main className="px-4 pb-4 z-1 relative bg-white">
        <h2 className="text-3xl mb-4">
          Ingredients <RecipeIngredientCarousel />
        </h2>
        {stepNumber > 0 ? (
          <ScrollArea className="h-[30vh]" ref={viewportRef}>
            <RecipeIngredientsList />
          </ScrollArea>
        ) : (
          <RecipeIngredientsList />
        )}
        <Separator className="my-4 border-slate-500 border" />
        <RecipeInstructionsList />
      </main>
    </>
  );
}

export default Recipe;
