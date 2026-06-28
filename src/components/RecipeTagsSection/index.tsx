import { useState, type KeyboardEvent } from 'react'

import { RecipeFormSection } from '@/components/RecipeFormSection'
import { normalizeTags } from '@/utils/recipeCreate'

import '@/styles/recipe-form.css'
import './RecipeTagsSection.css'

type RecipeTagsSectionProps = {
  tags: string[]
  onTagsChange: (tags: string[]) => void
}

export function RecipeTagsSection({ tags, onTagsChange }: RecipeTagsSectionProps): React.ReactElement {
  const [tagInput, setTagInput] = useState('')

  function addTag(): void {
    onTagsChange(normalizeTags([...tags, tagInput]))
    setTagInput('')
  }

  function removeTag(index: number): void {
    onTagsChange(tags.filter((_, itemIndex) => itemIndex !== index))
  }

  function onTagInputKeydown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTag()
    }
  }

  return (
    <RecipeFormSection heading="Tags">
      <p className="recipe-tags__hint">Optional. Add tags like Vegetarian, Quick, or Dinner.</p>

      {tags.length > 0 ? (
        <div className="recipe-tags__chips">
          {tags.map((tag, index) => (
            <button
              key={`${tag}-${index}`}
              type="button"
              className="recipe-tags__chip"
              aria-label={`Remove tag ${tag}`}
              onClick={() => removeTag(index)}
            >
              {tag}
              <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="recipe-tags__input-row">
        <input
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
          className="recipe-form-field__input"
          type="text"
          placeholder="Add a tag"
          aria-label="Add a tag"
          onKeyDown={onTagInputKeydown}
        />
        <button type="button" className="recipe-tags__add-btn" onClick={addTag}>
          + Add tag
        </button>
      </div>
    </RecipeFormSection>
  )
}
