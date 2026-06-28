import { describe, expect, it } from 'vitest'

import { APP_BASE_PATH } from '@/app-config'

describe('app config', () => {
  it('uses a base path without a trailing slash', () => {
    expect(APP_BASE_PATH).toBe('/recipes')
    expect(APP_BASE_PATH.endsWith('/')).toBe(false)
  })
})
