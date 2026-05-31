import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'

import App from '../App.vue'

describe('App', () => {
  it('renders the recipe list route', async () => {
    setActivePinia(createPinia())

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'recipe-list',
          component: { template: '<div>My Recipes</div>' },
        },
      ],
    })

    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('My Recipes')
  })
})
