import './PortionStepper.css'

type PortionStepperProps = {
  portions: number
  min?: number
  max?: number
  onIncrement: () => void
  onDecrement: () => void
}

export function PortionStepper({
  portions,
  min = 1,
  max = 20,
  onIncrement,
  onDecrement,
}: PortionStepperProps): React.ReactElement {
  const canDecrement = portions > min
  const canIncrement = portions < max

  return (
    <div className="portion-stepper">
      <span className="portion-stepper__label">Portions:</span>
      <div className="portion-stepper__controls" role="group" aria-label="Adjust portions">
        <button
          type="button"
          className="portion-stepper__btn"
          disabled={!canDecrement}
          aria-label="Decrease portions"
          onClick={onDecrement}
        >
          −
        </button>
        <span className="portion-stepper__value" aria-live="polite">
          {portions}
        </span>
        <button
          type="button"
          className="portion-stepper__btn"
          disabled={!canIncrement}
          aria-label="Increase portions"
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    </div>
  )
}
