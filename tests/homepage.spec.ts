import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; 

const API_URL = process.env.VITE_API_URL;

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('list')).toBeVisible({timeout: 5000});
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Async Cook/);

  await expect(page.getByRole('heading', {name: /The Async Cook/})).toBeVisible();
});
  
test('has recipe list', async ({ page, request }) => {
  const apiResponse = await request.get(`${API_URL}/recipes/`);
  await expect(apiResponse).toBeOK();
  const recipes = await apiResponse.json();
  const recipeLength = recipes.data.length;
  const recipeLocator = await page.getByRole('listitem')
  
  await expect(page.getByRole('list')).toBeVisible();
  await expect(recipeLocator).toHaveCount(recipeLength, {timeout: 5000});
});

test('click on a recipe and go back to homepage', async ({ page }) => {
  const firstRecipe = await page.getByRole('listitem').first();
  const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');

  await Promise.all([
    firstRecipe.locator('a').click(),
    await page.waitForURL(`${firstRecipeUrl}`)
  ]);

  await expect(page).toHaveURL(`${firstRecipeUrl}`);

  await page.goBack()

  await expect(page).toHaveURL('/');
})

test('click on each recipe item and go back to homepage', async ({ page }) => {
  const recipeList = await page.getByRole('list');
  const allLinks = await recipeList.locator('a').all();

  for (const recipeLink of allLinks) {
    const currentRecipeUrl = await recipeLink.getAttribute('href');

    await recipeLink.click();

    await expect(page).toHaveURL(`${currentRecipeUrl}`);

    await page.goBack()

    await expect(page).toHaveURL('/');
  }
})

test('test if external link works', async ({ page }) => {
  const externalLink = await page.getByRole('link', {name: /Sai-Kit Hui/});
  const externalLinkUrl = await externalLink.getAttribute('href');
  const externalPromise = page.waitForEvent('popup');

  await externalLink.click();

  const externalPage = await externalPromise;

  await expect(externalPage).toHaveURL(`${externalLinkUrl}`);
});

test('should not have any automatically detectable accessibility issues', async ({ page }) => {

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});