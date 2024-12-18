<template>
    <div class="home">
      <h1 class="home__title">Kulinar~Check</h1>
      <h2>Добро пожаловать, {{ user.name }}!</h2>
      <SideMenu />
    <div class="content">
    <h3 class="content__title">Рецепты</h3>
    
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Ищете блюдо..?"
        class="search-input"
      />
    </div>

    <h3 class="filter-container__title">Фильтры</h3>
    <div class="filter-container">
      
      <label for="category">Категория:</label>
      <select v-model="filters.category" id="category">
        <option value="">Все</option>
        <option value="Выпечка">Выпечка</option>
        <option value="Десерт">Десерт</option>
        <option value="Салат">Салат</option>
        <option value="Суп">Суп</option>
        <option value="Второе">Второе</option>
      </select>

      <label for="meat">Тип мяса:</label>
      <select v-model="filters.meat" id="meat">
        <option value="">Все</option>
        <option value="Говядина">Говядина</option>
        <option value="Курица">Курица</option>
        <option value="Рыба">Рыба</option>
        <option value="Без мяса">Без мяса</option>
      </select>

      <label for="sort">Сортировка:</label>
      <select v-model="filters.sort" id="sort">
        <option value="default">По умолчанию</option>
        <option value="asc">Рейтинг: по возрастанию</option>
        <option value="desc">Рейтинг: по убыванию</option>
      </select>
    </div>

    <div class="recipe-list">
        <RecipeCard
            v-for="recipe in paginatedRecipes" 
            :key="recipe.id"
            :recipe="recipe"
        />
    </div>
    </div>
    <div class="pagination" v-if="totalPages > 1">
        <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
        > 
        {{ page }}
        </button>
    </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import RecipeCard from '../components/RecipeCard.vue';
  import SideMenu from '../components/SideMenu.vue'

  export default {
    components: {
    RecipeCard,
    SideMenu,
    },
    data() {
      return {
        user: {},
        recipes: [],
        filters: {
            category: "",
            meat: "",
            sort: "default",
        },
        searchQuery: "",
        currentPage: 1,
        itemsPerPage: 9,
        };
        
    },

    computed: {
        filteredRecipes() {
      let filtered = [...this.recipes];

      
      if (this.filters.category) {
        filtered = filtered.filter((recipe) => recipe.category === this.filters.category);
      }

      
      if (this.filters.meat) {
        filtered = filtered.filter((recipe) => recipe.meat === this.filters.meat);
      }

      
      if (this.filters.sort === "asc") {
        filtered.sort((a, b) => a.rating - b.rating);
      } else if (this.filters.sort === "desc") {
        filtered.sort((a, b) => b.rating - a.rating);
      }
      
      if (this.searchQuery) {
      const query = this.normalizeText(this.searchQuery);
      filtered = filtered.filter(recipe =>
        this.normalizeText(recipe.title).includes(query)
      );
    }
      

      return filtered
    },
    totalPages() {
    return Math.ceil(this.filteredRecipes.length / this.itemsPerPage);
  },
  paginatedRecipes() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredRecipes.slice(start, end);
},
  },


  
  
    
    methods: {
        goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  },
  normalizeText(text) {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase() 
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "");
  },
    async fetchRecipes() {
      try {
        const response = await axios.get('https://676154ba6be7889dc360a4cd.mockapi.io/recipes/recipes');
        this.recipes = response.data;
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
    addToFavorites(recipe) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.find((fav) => fav.id === recipe.id)) {
        favorites.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Рецепт добавлен в избранное');
      } else {
        alert('Этот рецепт уже в избранном');
      }
    },

    logout() {
      localStorage.removeItem('authUser');
      this.$router.push('/login');
    },
    },
    mounted() {
      this.fetchRecipes();
    },
    

    created() {
      const authData = JSON.parse(localStorage.getItem('authToken'));
      if (authData) {
        this.user = authData;
      } else {
        this.$router.push('/login');
      }
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
    font-family: "Pacifico", serif;
    font-weight: 400;
    margin: 20px auto;
    
}
.content__title{
    font-family: "Montserrat", serif;
    font-size: 30px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 20px;
}

.search-bar{
    max-width: 800px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-input{
    width: 300px;
    height: 30px;
    border: 1px solid rgb(54, 54, 54);
    border-radius: 15px;
    padding: 5px;
    outline: none;
    font-family: "Montserrat", serif;
    font-size: 17px;
}
.search-input::placeholder{
    font-family: "Montserrat", serif;
    font-size: 17px;
}
.filter-container__title{
    font-family: "Montserrat", serif;
    font-weight: 500;
    margin-top: 40px;
}
p{
    font-family: "Montserrat", serif;
}
label{
    font-family: "Montserrat", serif;
    margin: 10px;
    font-size: 18px;
    max-width: 150px;
}
select{
    max-width: 150px;
    font-family: "Montserrat", serif;
    font-size: 14px;
    outline: none;
    border-radius: 10px;
    padding: 5px;
}
.nav-menu {
  margin: auto;
  display: flex;
  list-style: none;
  gap: 1rem;
  font-family: "Montserrat", serif;
}

.filter-container {
  max-width: 800px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}


.recipe-list{
    max-width: 1400px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.pagination {
  margin: 50px;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;
  border-radius: 5px;
  font-family: "Montserrat", serif;
}

.pagination button.active {
  background-color: rgb(42, 173, 42);
  color: #fff;
}

@media (max-width: 768px) {
    .home__title {
        font-size: 32px;
        text-align: center;
    }

    h2 {
        font-size: 24px;
        text-align: center;
    }

    .content__title {
        font-size: 20px;
        text-align: center;
    }

    .search-bar {
        flex-direction: column;
    }

    .filter-container {
        flex-direction: column;
        align-items: flex-start;
    }

    .filter-container select {
        margin-bottom: 10px;
    }

    .recipe-list {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .pagination {
        flex-direction: column;
    }

    .pagination button {
        margin: 5px 0;
    }
}

@media (max-width: 480px) {
    .recipe-list {
        grid-template-columns: repeat(1, 1fr);
    }

    .search-input {
        width: 100%;
    }

    .nav-menu {
        flex-direction: column;
        gap: 0.5rem;
    }

    .filter-container {
        width: 100%;
    }
}
</style>