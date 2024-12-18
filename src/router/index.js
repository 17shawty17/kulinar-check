import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import HomePage from '../views/HomePage.vue';
import FavoritesPage from '../views/FavoritesPage.vue';
import AddRecipe from '@/views/AddRecipe.vue';
import RecipeDetailsPage from '@/views/RecipeDetailsPage.vue';

const routes = [
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/add-recipe', name: 'AddRecipe', component: AddRecipe },
  { path: '/', name: 'HomePage', component: HomePage, meta: { requiresAuth: true } },
  { path: '/favorites', name: 'FavoritesPage', component: FavoritesPage, meta: { requiresAuth: true } },
  { path: '/recipe/:id', name: 'RecipeDetailsPage', component: RecipeDetailsPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;  

