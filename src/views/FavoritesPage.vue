<template>
    <div>
      <h2 class="home__title">Kulinar~Check</h2>
      <SideMenu />
      <div class="content">
        <h2>Избранное</h2>
        <div class="recipe-list">
          <div
            v-for="recipe in favorites"
            :key="recipe.id"
            class="recipe-card"
          >
            <img :src="recipe.image" alt="Recipe Image" @click="goToRecipeDetails(recipe.id)"/>
            <h3 @click="goToRecipeDetails(recipe.id)" class="recipe-title">{{ recipe.title }}</h3>
            <p @click="goToRecipeDetails(recipe.id)" class="recipe-description">{{ recipe.description }}</p>
            <button @click="removeFromFavorites(recipe.id)">Удалить из избранного</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>

 import SideMenu from '../components/SideMenu.vue'

  export default {
    components: {
    SideMenu,
    },
    data() {
      return {
        favorites: [],
        
      };
      
    },
    methods: {
      fetchFavorites() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      },
      goToRecipeDetails(recipeId) {
        this.$router.push({ name: 'RecipeDetailsPage', params: { id: recipeId } });
      },
      navigateToDetails() {
        this.$router.push(`/recipe/${this.recipe.id}`);
      },
      removeFromFavorites(recipeId) {
        this.favorites = this.favorites.filter((fav) => fav.id !== recipeId);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        alert('Рецепт удалён из избранного');
      },
      logout() {
        localStorage.removeItem('authUser');
        this.$router.push('/login');
      },
    },
    mounted() {
      this.fetchFavorites();
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
h2{
    font-family: "Montserrat", serif;
    font-weight: 500;
    margin: 20px auto;
    font-size: 30px;
    
}
p{
    font-family: "Montserrat", serif;
}
button{
    font-family: "Montserrat", serif;
}
.nav-menu {
  display: flex;
  list-style: none;
  gap: 1rem;
}
.recipe-list{
    max-width: 1400px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}
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
.recipe-card img {
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
    background-color: rgb(228, 46, 46);
    color: white;
    transition: 250ms;
}

button:hover{
    transform: scale(1.1);
    cursor: pointer;
    background-color: rgb(151, 8, 8);
}
</style>
