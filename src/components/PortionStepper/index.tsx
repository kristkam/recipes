import styled from 'styled-components'

import { PORTION_LIMITS } from '@/constants/recipe'

type PortionStepperProps = {
  portions: number
  min?: number
  max?: number
  onIncrement: () => void
  onDecrement: () => void
}

export function PortionStepper({
  portions,
  min = PORTION_LIMITS.min,
  max = PORTION_LIMITS.max,
  onIncrement,
  onDecrement,
}: PortionStepperProps): React.ReactElement {
  const canDecrement = portions > min
  const canIncrement = portions < max

  return (
    <Stepper>
      <Label>Portions:</Label>
      <Controls role="group" aria-label="Adjust portions">
        <Button
          type="button"
          disabled={!canDecrement}
          aria-label="Decrease portions"
          onClick={onDecrement}
        >
          −
        </Button>
        <Value aria-live="polite">
          {portions}
        </Value>
        <Button
          type="button"
          disabled={!canIncrement}
          aria-label="Increase portions"
          onClick={onIncrement}
        >
          +
        </Button>
      </Controls>
    </Stepper>
  )
}

const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

const Label = styled.span`
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
`

const Controls = styled.div`
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
`

const Button = styled.button`
  width: 2.5rem;
  height: 2.25rem;
  border: none;
  background: var(--color-chip);
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.6);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 1px;
  }
`

const Value = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  padding: 0 0.5rem;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  background: var(--color-surface);
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text);
`
