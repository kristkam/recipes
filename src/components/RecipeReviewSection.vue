<script setup lang="ts">
import RecipeFormSection from '@/components/RecipeFormSection.vue'
import type { RecipeDraft } from '@/types/recipe'
import { formatRecipeMeta, formatTags } from '@/utils/recipeFormat'

defineProps<{
  draft: RecipeDraft
}>()

function formatIngredientLine(draft: RecipeDraft, index: number): string {
  const ingredient = draft.ingredients[index]
  if (!ingredient?.name.trim()) return ''
  const amount = ingredient.amount.trim()
  const unit = ingredient.unit.trim()
  if (!amount || !unit) return ingredient.name.trim()
  return `${ingredient.name.trim()} — ${amount} ${unit}`
}

function visibleIngredients(draft: RecipeDraft): string[] {
  return draft.ingredients
    .map((_, index) => formatIngredientLine(draft, index))
    .filter(Boolean)
}

function visibleInstructions(draft: RecipeDraft): string[] {
  return draft.instructions.map((step) => step.trim()).filter(Boolean)
}
</script>

<template>
  <RecipeFormSection heading="Review">
    <dl class="recipe-review">
      <div class="recipe-review__group">
        <dt class="recipe-review__label">Recipe name</dt>
        <dd class="recipe-review__value">{{ draft.title.trim() || '—' }}</dd>
      </div>

      <div class="recipe-review__group">
        <dt class="recipe-review__label">Summary</dt>
        <dd class="recipe-review__value">
          {{
            draft.title.trim()
              ? formatRecipeMeta(
                  Number.parseInt(draft.prepTimeMinutes, 10) || 0,
                  draft.portions,
                  draft.tags,
                )
              : '—'
          }}
        </dd>
      </div>

      <div class="recipe-review__group">
        <dt class="recipe-review__label">Tags</dt>
        <dd class="recipe-review__value">
          {{ draft.tags.length > 0 ? formatTags(draft.tags) : 'None' }}
        </dd>
      </div>

      <div class="recipe-review__group">
        <dt class="recipe-review__label">Ingredients</dt>
        <dd class="recipe-review__value">
          <ul v-if="visibleIngredients(draft).length > 0" class="recipe-review__list">
            <li v-for="(ingredient, index) in visibleIngredients(draft)" :key="index">
              {{ ingredient }}
            </li>
          </ul>
          <span v-else>—</span>
        </dd>
      </div>

      <div class="recipe-review__group">
        <dt class="recipe-review__label">Instructions</dt>
        <dd class="recipe-review__value">
          <ol v-if="visibleInstructions(draft).length > 0" class="recipe-review__list recipe-review__list--ordered">
            <li v-for="(step, index) in visibleInstructions(draft)" :key="index">
              {{ step }}
            </li>
          </ol>
          <span v-else>—</span>
        </dd>
      </div>
    </dl>
  </RecipeFormSection>
</template>

<style scoped>
.recipe-review {
  margin: 0;
}

.recipe-review__group + .recipe-review__group {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.recipe-review__label {
  margin: 0 0 0.25rem;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
}

.recipe-review__value {
  margin: 0;
  font-size: var(--font-size-base);
  line-height: 1.5;
  color: var(--color-text);
}

.recipe-review__list {
  margin: 0;
  padding-left: 1.125rem;
}

.recipe-review__list--ordered {
  padding-left: 1.25rem;
}
</style>
