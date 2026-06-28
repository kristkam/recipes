import './RecipeSearch.css'

type RecipeSearchProps = {
  value: string
  onChange: (value: string) => void
  compact?: boolean
  className?: string
}

export function RecipeSearch({
  value,
  onChange,
  compact = false,
  className = '',
}: RecipeSearchProps): React.ReactElement {
  return (
    <label className={`recipe-search${compact ? ' recipe-search--compact' : ''} ${className}`.trim()}>
      <svg
        className="recipe-search__icon"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12.5 12.5 L15.5 15.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        className="recipe-search__input"
        placeholder="Search recipes"
        aria-label="Search recipes"
      />
    </label>
  )
}
