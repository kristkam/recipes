import type { ReactNode } from 'react'

import './AppCard.css'

type AppCardProps = {
  children: ReactNode
  padding?: 'default' | 'compact'
  className?: string
}

export function AppCard({
  children,
  padding = 'default',
  className = '',
}: AppCardProps): React.ReactElement {
  return (
    <div className={`app-card app-card--padding-${padding} ${className}`.trim()}>
      {children}
    </div>
  )
}
