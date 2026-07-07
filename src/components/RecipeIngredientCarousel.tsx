import ContextIcons from './ContextIcons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useContext } from 'react';
import RecipeContext from '@/context/RecipeProvider';
import { useCallback } from 'react';
import { IngredientType } from '@/types/api';
import Markdown from 'react-markdown';

function RecipeIngredientCarousel() {
  const { sortedIngredients, stepNumber } = useContext(RecipeContext);
  const gallery = useCallback(() => {
    const array: IngredientType[] = [];
    sortedIngredients.forEach((ingredientGroup) => {
      ingredientGroup.ingredients.forEach((ingredient) => {
        if (ingredient.media && ingredient.media !== null)
          array.push(ingredient);
      });
    });
    return array;
  }, [sortedIngredients]);

  if (!sortedIngredients || stepNumber > 0) return null;
  const galleryItems = gallery();
  if (galleryItems.length === 0) return null;

  const content = (
    <Dialog>
      <DialogTrigger className="ml-1 print:hidden">
        <ContextIcons category="images" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingredients</DialogTitle>
        </DialogHeader>
        <Carousel>
          <CarouselContent>
            {galleryItems.map((ingredient) => (
              <CarouselItem key={ingredient.id}>
                <img src={ingredient.media.url} alt={ingredient.name} />
                <p className="mt-2 text-center">
                  {(ingredient.quantity || ingredient.unit) && (
                    <strong>
                      {ingredient.quantity ? ingredient.quantity : ''}
                      {ingredient.unit ? `${ingredient.unit} ` : ''}
                    </strong>
                  )}
                  <Markdown
                    components={{
                      // Replaces the <p> tag wrapper entirely
                      p: ({ children }) => <>{children}</>,
                    }}
                  >
                    {ingredient.name}
                  </Markdown>
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          {galleryItems.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
  return content;
}

export default RecipeIngredientCarousel;
