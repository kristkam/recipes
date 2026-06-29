import { expect, test, type Locator, type Page } from '@playwright/test'

type RecipeFormInput = {
  title: string
  cookingTimeMinutes: string
  ingredient: {
    name: string
    amount: string
    unit: string
  }
  instruction: string
  tag: string
}

const mushroomPasta = 'Creamy Mushroom Pasta'
const chickenTikka = 'Chicken Tikka Masala'
const berrySmoothie = 'Berry Smoothie'

function recipeLink(page: Page, name: string): Locator {
  return page.getByRole('list', { name: 'Recipes' }).getByRole('link', { name })
}

function portionsControl(page: Page): Locator {
  return page.getByRole('group', { name: 'Adjust portions' })
}

function addRecipeButton(page: Page): Locator {
  return page.getByRole('button', { name: '+ Add Recipe' }).first()
}

function ingredientRow(page: Page, ingredientName: string): Locator {
  return page.getByRole('listitem').filter({
    has: page.getByText(ingredientName, { exact: true }),
  })
}

async function openRecipe(page: Page, name: string): Promise<void> {
  await page.goto('/')
  await recipeLink(page, name).click()
}

async function expectRecipeDetail(page: Page, name: string, meta: string): Promise<void> {
  await expect(page.getByRole('heading', { name, level: 1 })).toBeVisible()
  await expect(page.getByText(meta)).toBeVisible()
}

async function fillRecipeBasics(
  page: Page,
  recipe: Pick<RecipeFormInput, 'title' | 'cookingTimeMinutes'>,
): Promise<void> {
  await page.getByLabel('Recipe name').fill(recipe.title)
  await page.getByLabel('Cooking time (minutes)').fill(recipe.cookingTimeMinutes)
}

async function fillFirstIngredient(page: Page, ingredient: RecipeFormInput['ingredient']): Promise<void> {
  await page.getByLabel('Ingredient 1 name').fill(ingredient.name)
  await page.getByLabel('Ingredient 1 amount').fill(ingredient.amount)
  await page.getByLabel('Ingredient 1 unit').fill(ingredient.unit)
}

async function fillFirstInstruction(page: Page, instruction: string): Promise<void> {
  await page.getByLabel('Instruction step 1').fill(instruction)
}

async function addTag(page: Page, tag: string): Promise<void> {
  await page.getByLabel('Add a tag').fill(tag)
  await page.getByRole('button', { name: '+ Add tag' }).click()
}

async function saveRecipeThroughWizard(page: Page, recipe: RecipeFormInput): Promise<void> {
  await fillRecipeBasics(page, recipe)
  await page.getByRole('button', { name: 'Next' }).click()
  await expect(page.getByRole('heading', { name: 'Ingredients', level: 2 })).toBeVisible()

  await fillFirstIngredient(page, recipe.ingredient)
  await page.getByRole('button', { name: 'Next' }).click()

  await fillFirstInstruction(page, recipe.instruction)
  await page.getByRole('button', { name: 'Next' }).click()
  await expect(page.getByRole('heading', { name: 'Tags', level: 2 })).toBeVisible()

  await addTag(page, recipe.tag)
  await page.getByRole('button', { name: 'Save Recipe' }).click()
}

test.describe('Recipe app', () => {
  test('lists seeded recipes and filters by search query', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'My Recipes' })).toBeVisible()
    await expect(recipeLink(page, mushroomPasta)).toBeVisible()
    await expect(recipeLink(page, chickenTikka)).toBeVisible()

    await page.getByRole('searchbox', { name: 'Search recipes' }).fill('berry')
    await expect(recipeLink(page, berrySmoothie)).toBeVisible()
    await expect(recipeLink(page, mushroomPasta)).not.toBeVisible()
  })

  test('opens a recipe detail and adjusts portions', async ({ page }) => {
    await openRecipe(page, mushroomPasta)

    await expectRecipeDetail(page, mushroomPasta, '25 min • Vegetarian')
    await expect(ingredientRow(page, 'Pasta')).toContainText('400 g')

    await test.step('increase portions', async () => {
      await page.getByRole('button', { name: 'Increase portions' }).click()
      await expect(portionsControl(page)).toContainText('5')
      await expect(ingredientRow(page, 'Pasta')).toContainText('500 g')
    })

    await test.step('decrease portions', async () => {
      await page.getByRole('button', { name: 'Decrease portions' }).click()
      await expect(portionsControl(page)).toContainText('4')
      await expect(ingredientRow(page, 'Pasta')).toContainText('400 g')
    })
  })

  test('edits a recipe through the wizard and updates the recipe list', async ({ page }) => {
    const updatedRecipe: RecipeFormInput = {
      title: 'Herbed Mushroom Pasta',
      cookingTimeMinutes: '30',
      ingredient: {
        name: 'Pasta',
        amount: '450',
        unit: 'g',
      },
      instruction: 'Cook pasta until al dente.',
      tag: 'Quick',
    }

    await openRecipe(page, mushroomPasta)

    await page.getByRole('link', { name: 'Edit' }).click()
    await expect(page.getByRole('heading', { name: 'Edit Recipe', level: 1 })).toBeVisible()
    await expect(page.getByLabel('Recipe name')).toHaveValue(mushroomPasta)

    await saveRecipeThroughWizard(page, updatedRecipe)

    await expectRecipeDetail(page, updatedRecipe.title, '30 min • Vegetarian, Quick')
    await expect(page.getByText(updatedRecipe.instruction)).toBeVisible()
    await expect(ingredientRow(page, updatedRecipe.ingredient.name)).toContainText('450 g')

    await page.getByRole('button', { name: '< Back' }).click()
    await expect(recipeLink(page, updatedRecipe.title)).toBeVisible()
    await expect(recipeLink(page, mushroomPasta)).not.toBeVisible()
    await expect(page.getByRole('heading', { name: 'My Recipes' })).toBeVisible()
  })

  test('creates a recipe through the wizard and shows it in detail', async ({ page }) => {
    const newRecipe: RecipeFormInput = {
      title: 'Weeknight Lentil Bowl',
      cookingTimeMinutes: '20',
      ingredient: {
        name: 'Red lentils',
        amount: '200',
        unit: 'g',
      },
      instruction: 'Simmer lentils until tender.',
      tag: 'Vegetarian',
    }

    await page.goto('/')

    await addRecipeButton(page).click()
    await expect(page.getByRole('heading', { name: 'Add Recipe', level: 1 })).toBeVisible()

    await saveRecipeThroughWizard(page, newRecipe)

    await expectRecipeDetail(page, newRecipe.title, '20 min • Vegetarian')
    await expect(ingredientRow(page, newRecipe.ingredient.name)).toContainText('200 g')
    await expect(page.getByText(newRecipe.instruction)).toBeVisible()

    await page.getByRole('button', { name: '< Back' }).click()
    await expect(recipeLink(page, newRecipe.title)).toBeVisible()
  })
})
