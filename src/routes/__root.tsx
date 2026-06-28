import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import { APP_BASE_PATH } from '@/app-config'
import { RecipesProvider } from '@/state/recipes-context'

import '@/styles/design-tokens.css'
import '@/styles/list-dividers.css'
import './__root.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My Recipes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'My Recipes' },
      { name: 'theme-color', content: '#6b8e7b' },
    ],
    links: [
      { rel: 'icon', href: `${APP_BASE_PATH}/favicon.ico` },
      { rel: 'manifest', href: `${APP_BASE_PATH}/manifest.webmanifest` },
      { rel: 'apple-touch-icon', href: `${APP_BASE_PATH}/favicon.ico` },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent(): React.ReactElement {
  return (
    <RootDocument>
      <RecipesProvider>
        <Outlet />
      </RecipesProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="app">
          <main className="app__frame">
            <div className="app__route">{children}</div>
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
