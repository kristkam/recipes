import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/recipes'),
  routes: [
    {
      path: '/',
      name: 'recipe-list',
      component: () => import('@/views/RecipeListView.vue'),
    },
    {
      path: '/recipes/new',
      name: 'recipe-new',
      component: () => import('@/views/RecipeNewView.vue'),
    },
    {
      path: '/recipes/:recipeId',
      name: 'recipe-detail',
      component: () => import('@/views/RecipeDetailView.vue'),
      props: true,
    },
    {
      path: '/recipes/:recipeId/edit',
      name: 'recipe-edit',
      component: () => import('@/views/RecipeEditView.vue'),
      props: true,
    },
  ],
})

export default router
