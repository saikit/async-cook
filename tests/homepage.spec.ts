import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Async Cook/);
});

  
test('has recipe list', async ({ page, request }) => {
  const apiResponse = await request.get('http://localhost/api/recipes/');
  await expect(apiResponse).toBeOK();
  const recipes = await apiResponse.json();
  const recipeLength = recipes.data.length;
  await expect(page.getByRole('list')).toBeVisible({timeout: 10000});
  
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
  await expect(page.getByRole('list')).toBeVisible({timeout: 10000});
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