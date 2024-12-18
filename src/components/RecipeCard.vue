<template>
    <div class="recipe-card">
      <img :src="recipe.image" alt="Recipe Image" class="recipe-image"  @click="navigateToDetails"/>
      <h3 class="recipe-title"  @click="navigateToDetails">{{ recipe.title }}</h3>
      <p class="recipe-description"  @click="navigateToDetails">{{ recipe.description }}</p>
      
      <button @click="addToFavorites">Добавить в избранное</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
    methods: {
      navigateToDetails() {
        this.$router.push(`/recipe/${this.recipe.id}`);
      },
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
    },
  };
  </script>
  
  <style scoped>
  .recipe-card {
    max-width: 600px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .recipe-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .recipe-image {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .recipe-title {
    font-family: "Montserrat", serif;
    font-size: 18px;
    margin: 0 0 8px;
    text-align: center;
  }
  
  .recipe-description {
    font-family: "Montserrat", serif;
    font-size: 0.9rem;
    color: #666;
    text-align: center;
  }

  button{
    font-family: "Montserrat", serif;
    padding: 7px;
    border: none;
    border-radius: 10px;
    background-color: rgb(42, 173, 42);
    color: white;
    transition: 250ms;
  }

  button:hover{
    transform: scale(1.1);
    cursor: pointer;
  }
  </style>
  