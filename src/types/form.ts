import { FieldError, UseFormRegister } from 'react-hook-form';

export type FormData = {
  title: string;
  slug: string;
  published: boolean;
  intro: string;
  reference: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | 'title'
  | 'slug'
  | 'published'
  | 'intro'
  | 'reference';
