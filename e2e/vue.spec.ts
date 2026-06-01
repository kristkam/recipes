import { test, expect } from '@playwright/test'

test.describe('Recipe app', () => {
  test('lists recipes, searches, opens detail, and adjusts portions', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'My Recipes' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Creamy Mushroom Pasta' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Chicken Tikka Masala' })).toBeVisible()

    await page.getByRole('searchbox', { name: 'Search recipes' }).fill('berry')
    await expect(page.getByRole('link', { name: 'Berry Smoothie' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Creamy Mushroom Pasta' })).not.toBeVisible()

    await page.getByRole('searchbox', { name: 'Search recipes' }).clear()
    await page.getByRole('link', { name: 'Creamy Mushroom Pasta' }).click()

    await expect(page.getByRole('heading', { name: 'Creamy Mushroom Pasta', level: 1 })).toBeVisible()
    await expect(page.getByText('25 min • Vegetarian')).toBeVisible()

    const pastaAmount = page.locator('.ingredient-list__item').filter({ hasText: 'Pasta' }).locator('.ingredient-list__amount')
    await expect(pastaAmount).toHaveText('400 g')

    await page.getByRole('button', { name: 'Increase portions' }).click()
    await expect(page.getByRole('group', { name: 'Adjust portions' })).toContainText('5')
    await expect(pastaAmount).toHaveText('500 g')

    await page.getByRole('button', { name: 'Decrease portions' }).click()
    await expect(page.getByRole('group', { name: 'Adjust portions' })).toContainText('4')
    await expect(pastaAmount).toHaveText('400 g')

    await page.getByRole('link', { name: 'Edit' }).click()
    await expect(page.getByRole('heading', { name: 'Edit Recipe', level: 1 })).toBeVisible()
    await expect(page.getByLabel('Recipe name')).toHaveValue('Creamy Mushroom Pasta')

    await page.getByLabel('Recipe name').fill('Herbed Mushroom Pasta')
    await page.getByLabel('Cooking time (minutes)').fill('30')
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByLabel('Ingredient 1 name').fill('Pasta')
    await page.getByLabel('Ingredient 1 amount').fill('450')
    await page.getByLabel('Ingredient 1 unit').fill('g')
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByLabel('Instruction step 1').fill('Cook pasta until al dente.')
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByLabel('Add a tag').fill('Quick')
    await page.getByRole('button', { name: '+ Add tag' }).click()
    await page.getByRole('button', { name: 'Save Recipe' }).click()

    await expect(page.getByRole('heading', { name: 'Herbed Mushroom Pasta', level: 1 })).toBeVisible()
    await expect(page.getByText('30 min • Vegetarian, Quick')).toBeVisible()
    await expect(page.getByText('Cook pasta until al dente.')).toBeVisible()
    await expect(pastaAmount).toHaveText('450 g')

    await page.getByRole('button', { name: '< Back' }).click()
    await expect(page.getByRole('link', { name: 'Herbed Mushroom Pasta' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Creamy Mushroom Pasta' })).not.toBeVisible()

    await page.getByRole('button', { name: '< Back' }).click()
    await expect(page.getByRole('heading', { name: 'My Recipes' })).toBeVisible()
  })

  test('creates a recipe through the wizard and shows it in detail', async ({ page }) => {
    await page.goto('/')

    await page.locator('header').getByRole('button', { name: '+ Add Recipe' }).click()
    await expect(page.getByRole('heading', { name: 'Add Recipe', level: 1 })).toBeVisible()

    await page.getByLabel('Recipe name').fill('Weeknight Lentil Bowl')
    await page.getByLabel('Cooking time (minutes)').fill('20')
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByRole('heading', { name: 'Ingredients', level: 2 })).toBeVisible()

    await page.getByLabel('Ingredient 1 name').fill('Red lentils')
    await page.getByLabel('Ingredient 1 amount').fill('200')
    await page.getByLabel('Ingredient 1 unit').fill('g')
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByLabel('Instruction step 1').fill('Simmer lentils until tender.')
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByRole('heading', { name: 'Tags', level: 2 })).toBeVisible()

    await page.getByLabel('Add a tag').fill('Vegetarian')
    await page.getByRole('button', { name: '+ Add tag' }).click()

    await page.getByRole('button', { name: 'Save Recipe' }).click()

    await expect(
      page.getByRole('heading', { name: 'Weeknight Lentil Bowl', level: 1 }),
    ).toBeVisible()
    await expect(page.getByText('20 min • Vegetarian')).toBeVisible()
    await expect(page.getByText('Red lentils')).toBeVisible()
    await expect(page.getByText('Simmer lentils until tender.')).toBeVisible()

    await page.getByRole('button', { name: '< Back' }).click()
    await expect(page.getByRole('link', { name: 'Weeknight Lentil Bowl' })).toBeVisible()
  })
})
