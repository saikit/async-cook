import { MediaType } from '@/types/api';
import SelectMedia from './SelectMedia';

function InputCoverImage({ media }: { media: Array<MediaType> }) {
  if (media.length === 0) return null;

  const content = (
    <>
      <SelectMedia media={media} name="cover_img_id">
        <label className="block text-xs text-center underline text-blue-700">
          Select cover image
        </label>
      </SelectMedia>
    </>
  );
  return content;
}

export default InputCoverImage;
