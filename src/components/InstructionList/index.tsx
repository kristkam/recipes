import './InstructionList.css'

type InstructionListProps = {
  instructions: string[]
}

export function InstructionList({ instructions }: InstructionListProps): React.ReactElement {
  return (
    <section className="instruction-list">
      <h2 className="instruction-list__heading">Instructions</h2>
      <ol className="instruction-list__items">
        {instructions.map((step, index) => (
          <li key={`${index}-${step}`} className="instruction-list__item">
            <span className="instruction-list__number">{index + 1}.</span>
            <span className="instruction-list__text">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
