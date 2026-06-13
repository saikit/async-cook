import { useFormContext } from 'react-hook-form';
import { useState, ReactNode } from 'react';
import { MediaType } from '@/types/api';

function SelectMedia({
  media,
  name,
  children,
}: {
  media: MediaType[];
  name: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { register } = useFormContext();
  const content = (
    <>
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {children}
      </div>
      <div
        className={`${open ? 'flex' : 'hidden'} flex-wrap gap-2 p-2 border rounded bg-slate-50`}
      >
        <div>
          <label className="flex items-center gap-1 text-sm">
            <input {...register(name)} type="radio" value="" />
            None
          </label>
        </div>
        {media.map((img) => (
          <div key={img.id}>
            <label className="flex flex-col items-center gap-1 cursor-pointer">
              <input {...register(name)} type="radio" value={img.uuid} />
              <img
                src={img.url_thumbnail}
                title={img.name}
                alt=""
                width="50"
                className="rounded"
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
  return content;
}

export default SelectMedia;
