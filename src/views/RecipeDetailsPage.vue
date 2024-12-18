<template>
    <div class="recipe-details">
    <h2 class="home__title">Kulinar~Check</h2>
    <SideMenu />
      <div v-if="recipe" class="recipe-container">
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <p class="recipe-description">{{ recipe.description }}</p>
        <p class="recipe-description">{{ recipe.howtodo }}</p>
  
        <div class="recipe-info">
          <div class="info-item">
            <strong>Категория:</strong> <span>{{ recipe.category }}</span>
          </div>
          <div class="info-item">
            <strong>Время приготовления:</strong> <span>{{ recipe.time }} минут</span>
          </div>
          <div class="info-item">
            <strong>Тип мяса:</strong> <span>{{ recipe.meat }}</span>
          </div>
          <div class="info-item">
            <strong>Оценка блюда:</strong> <span>{{ recipe.rating }}/10</span>
          </div>
        </div>
  
        <button class="favorite-button" @click="addToFavorites">Добавить в избранное</button>
      </div>
  
      <div v-else class="loading">
        <p>Загрузка данных рецепта...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import SideMenu from '../components/SideMenu.vue'
  
  export default {
    components: {
    SideMenu,
    },
    data() {
      return {
        recipe: null,
      };
    },
    async created() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`https://676154ba6be7889dc360a4cd.mockapi.io/recipes/recipes/${id}`);
        this.recipe = response.data;
      } catch (error) {
        console.error('Ошибка загрузки данных рецепта:', error);
      }
    },
    methods: {
      addToFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.some((fav) => fav.id === this.recipe.id)) {
          favorites.push(this.recipe);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          alert('Рецепт добавлен в избранное!');
        } else {
          alert('Рецепт уже в избранном!');
        }
      },
      logout() {
        localStorage.removeItem('authUser');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
<style scoped>

.home__title{
    font-family: "Playwrite TZ Guides", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 50px;
    margin: 20px auto;
}

.recipe-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.recipe-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.recipe-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.recipe-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  font-family: "Montserrat", serif;
}

.recipe-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
  font-family: "Montserrat", serif;
}

.recipe-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-family: "Montserrat", serif;
}

.info-item {
  flex: 1 1 calc(50% - 10px);
  font-size: 18px;
  padding: 10px;
  background-color: rgb(245, 205, 157);
  color: rgb(61, 61, 61);
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Montserrat", serif;
}

.favorite-button {
  padding: 15px 20px;
  background-color: #3bbb36;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  cursor: pointer;
  align-self: center;
  font-family: "Montserrat", serif;
  margin: 30px;
}

.favorite-button:hover {
  background-color: #198021;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
  font-family: "Montserrat", serif;
}
</style>
  
  