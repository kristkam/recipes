import type { ReactNode } from 'react'
import styled from 'styled-components'

type AppCardPadding = 'default' | 'compact'

type AppCardProps = {
  children: ReactNode
  padding?: AppCardPadding
  className?: string
}

export function AppCard({
  children,
  padding = 'default',
  className = '',
}: AppCardProps): React.ReactElement {
  return (
    <Card $padding={padding} className={className}>
      {children}
    </Card>
  )
}

const Card = styled.div<{ $padding: AppCardPadding }>`
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: ${({ $padding }) =>
    $padding === 'compact' ? '0.625rem 0.75rem' : '1rem 1.125rem 1.25rem'};
`
