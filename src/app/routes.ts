import {
  type RouteConfig,
  route,
  prefix,
  index,
  layout,
} from '@react-router/dev/routes';

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  ...prefix('recipe', [
    layout('../layouts/App.tsx', [route(':slug/:step?', './recipe.tsx')]),
  ]),
  ...prefix('manage', [
    layout('../layouts/Manage.tsx', { id: 'manage-layout' }, [
      index('./manage.tsx'),
      route('create', './create.tsx'),
      route('update/:slug', './update.tsx'),
    ]),
  ]),
  layout('../layouts/RecipesList.tsx', [index('./index.tsx')]),
  route('not-found', './notfound.tsx'),
  layout('../layouts/Login.tsx', [route('login', './login.tsx')]),
  route('*', './catchall.tsx'),
] satisfies RouteConfig;
