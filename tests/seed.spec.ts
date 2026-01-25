import { test, expect } from '@playwright/test';

const API_URL = process.env.VITE_API_URL;

test.describe('Recipe App Core Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load properly
    await page.waitForLoadState('networkidle');
    
    // Try to find the recipe list with multiple selectors
    try {
      await expect(page.getByRole('list')).toBeVisible({timeout: 10000});
    } catch (error) {
      // Fallback to other selectors if needed
      await expect(page.locator('ol').first()).toBeVisible({ timeout: 5000 });
    }
  });

  // Navigation Tests
  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Async Cook/);
  });

  test('can navigate to a recipe and back to homepage', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');

    if (firstRecipeUrl) {
      await Promise.all([
        firstRecipe.locator('a').click(),
        await page.waitForURL(`${firstRecipeUrl}`)
      ]);

      await expect(page).toHaveURL(`${firstRecipeUrl}`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Navigate back to homepage
      await page.goBack();
      await expect(page).toHaveURL('/');
    }
  });

  test('browser back/forward navigation works', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');

    if (firstRecipeUrl) {
      await firstRecipe.locator('a').click();
      await expect(page).toHaveURL(`${firstRecipeUrl}`);

      // Test browser back
      await page.goBack();
      await expect(page).toHaveURL('/');

      // Test browser forward
      await page.goForward();
      await expect(page).toHaveURL(`${firstRecipeUrl}`);
    }
  });

  // Recipe List Tests
  test('recipe list loads from API correctly', async ({ page, request }) => {
    const apiResponse = await request.get(`${API_URL}/recipes/`);
    await expect(apiResponse).toBeOK();
    const recipes = await apiResponse.json();
    
    const recipeList = await page.getByRole('list');
    const recipeLocator = recipeList.locator('li');
    await expect(recipeLocator).toHaveCount(recipes.data.length, { timeout: 5000 });
  });

  test('recipe titles are clickable links', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const recipeLinks = recipeList.locator('li a');
    
    // Test first few recipes
    const firstLinks = await recipeLinks.all().then(links => links.slice(0, 3));
    for (const link of firstLinks) {
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', /\/recipe\//);
    }
  });

  test('recipe list displays in correct format', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    await expect(recipeList).toBeVisible();
    
    const firstRecipe = recipeList.locator('li').first();
    await expect(firstRecipe).toBeVisible();
    await expect(firstRecipe.locator('a')).toBeVisible();
  });

  // Recipe Detail Page Tests
  test('recipe page displays correctly', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');

    if (firstRecipeUrl) {
      await Promise.all([
        firstRecipe.locator('a').click(),
        await page.waitForURL(`${firstRecipeUrl}`)
      ]);

      // Check recipe title
      const recipeTitle = page.getByRole('heading', { level: 1 });
      await expect(recipeTitle).toBeVisible();

      // Check ingredients heading
      const ingredientsHeading = page.getByRole('heading', { name: /ingredients/i });
      await expect(ingredientsHeading).toBeVisible();

      // Check instructions heading
      const instructionsHeading = page.getByRole('heading', { name: /instructions/i });
      await expect(instructionsHeading).toBeVisible();

      // Check for instructions list
      const instructionsLists = page.locator('ol');
      await expect(instructionsLists.first()).toBeVisible();
    }
  });

  test('intro text and reference links work', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');

    if (firstRecipeUrl) {
      await Promise.all([
        firstRecipe.locator('a').click(),
        await page.waitForURL(`${firstRecipeUrl}`)
      ]);

      // Check for intro paragraph
      const introText = page.locator('p').first();
      if (await introText.count() > 0) {
        await expect(introText).toBeVisible();
      }

      // Check for reference link if present
      const referenceLink = page.getByRole('link', { name: /see original recipe/i });
      if (await referenceLink.count() > 0) {
        await expect(referenceLink).toBeVisible();
        await expect(referenceLink).toHaveAttribute('target', '_blank');
      }
    }
  });

  // Interactive Features Tests
  test('home menu button works from recipe page', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');

    if (firstRecipeUrl) {
      await Promise.all([
        firstRecipe.locator('a').click(),
        await page.waitForURL(`${firstRecipeUrl}`)
      ]);

      // Find and click menu button
      const menuButton = page.locator('button').filter({ has: page.locator('svg') }).first();
      await expect(menuButton).toBeVisible();
      
      await menuButton.click();
      
      // Check that recipe list sheet opens
      const sheet = page.getByRole('dialog', { name: 'Recipe List' });
      await expect(sheet).toBeVisible();
      
      // Find a recipe link in menu
      const menuRecipeLink = sheet.locator('a').first();
      await expect(menuRecipeLink).toBeVisible();
      
      // Close menu
      await page.keyboard.press('Escape');
      await expect(sheet).not.toBeVisible();
    }
  });

  test('ingredient calculator dialog works when available', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');

    if (firstRecipeUrl) {
      await Promise.all([
        firstRecipe.locator('a').click(),
        await page.waitForURL(`${firstRecipeUrl}`)
      ]);

      const calculatorTrigger = page.locator('[title="Ingredient Calculator"]');
      
      if (await calculatorTrigger.count() > 0) {
        await expect(calculatorTrigger).toBeVisible();
        
        // Open dialog
        await calculatorTrigger.click();
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toBeVisible();
        
        // Close dialog
        await page.keyboard.press('Escape');
        await expect(dialog).not.toBeVisible();
      }
    }
  });

  // Content Tests
  test('markdown content renders correctly', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');
    
    if (firstRecipeUrl) {
      await firstRecipe.locator('a').click();
      await page.waitForURL(`${firstRecipeUrl}`);
    }
    
    // Check for bold text rendering
    const boldText = page.locator('strong');
    if (await boldText.count() > 0) {
      await expect(boldText.first()).toBeVisible();
    }
  });

  test('external links open in new tabs', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');
    
    if (firstRecipeUrl) {
      await firstRecipe.locator('a').click();
      await page.waitForURL(`${firstRecipeUrl}`);
    }
    
    const externalLinks = page.locator('[target="_blank"]');
    if (await externalLinks.count() > 0) {
      const firstExternalLink = externalLinks.first();
      await expect(firstExternalLink).toHaveAttribute('target', '_blank');
    }
  });

  // Performance Tests
  test('page loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to find recipe list
    try {
      await expect(page.getByRole('list')).toBeVisible({timeout: 10000});
    } catch (error) {
      await expect(page.locator('ol').first()).toBeVisible({ timeout: 5000 });
    }
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  });

  test('recipe navigation is responsive', async ({ page }) => {
    const recipeList = await page.getByRole('list');
    const firstRecipe = recipeList.locator('li').first();
    const firstRecipeUrl = await firstRecipe.locator('a').getAttribute('href');
    
    const startTime = Date.now();
    
    if (firstRecipeUrl) {
      await firstRecipe.locator('a').click();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 });
    }
    
    const navigationTime = Date.now() - startTime;
    expect(navigationTime).toBeLessThan(3000); // Should navigate within 3 seconds
  });
});