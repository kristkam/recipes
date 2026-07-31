import { createRouter } from '@tanstack/react-router'

import { APP_BASE_PATH } from './app-config'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    basepath: APP_BASE_PATH,
    trailingSlash: 'never',
    scrollRestoration: true,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
