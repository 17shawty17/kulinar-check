<template>
  <div class="add-recipe-page">
    <h1 class="home__title">Kulinar~Check</h1>
    <SideMenu />
    <h2>Добавить рецепт</h2>
    <form @submit.prevent="submitRecipe" class="recipe-form">
      <div class="form-group">
        <label for="title">Название</label>
        <input type="text" v-model="recipe.title" id="title" placeholder="Введите название" required />
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <textarea v-model="recipe.description" id="description" placeholder="Введите описание" required></textarea>
      </div>

      <div class="form-group">
        <label for="description">Способ приготовления</label>
        <textarea v-model="recipe.howtodo" id="howtodo" placeholder="Как приготовить" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">URL изображения</label>
        <input type="url" v-model="recipe.image" id="image" placeholder="Вставьте ссылку на изображение" required />
      </div>

      <div class="form-group">
        <label for="category">Категория</label>
        <select v-model="recipe.category" id="category" required>
          <option value="" disabled>Выберите категорию</option>
          <option value="Выпечка">Выпечка</option>
          <option value="Салат">Салат</option>
          <option value="Суп">Суп</option>
          <option value="Десерт">Десерт</option>
          <option value="Второе">Второе</option>
        </select>
      </div>

      <div class="form-group">
        <label for="time">Время приготовления (минуты)</label>
        <input type="number" v-model="recipe.time" id="time" min="1" placeholder="Введите время" required />
      </div>

      <div class="form-group">
        <label for="meat">Тип мяса</label>
        <select v-model="recipe.meat" id="meat" required>
          <option value="" disabled>Выберите тип мяса</option>
          <option value="Говядина">Говядина</option>
          <option value="Курица">Курица</option>
          <option value="Рыба">Рыба</option>
          <option value="Без мяса">Без мяса</option>
        </select>
      </div>

      <div class="form-group">
        <label for="rating">Оценка блюда</label>
        <input type="number" v-model="recipe.rating" id="rating" min="1" max="10" placeholder="Введите оценку" required />
      </div>

      <button type="submit" class="submit-button">Добавить рецепт</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import SideMenu from '../components/SideMenu.vue'

export default {
  components: {
    SideMenu,
    },
  data() {
    return {
      recipe: {
        title: "",
        description: "",
        image: "",
        category: "",
        time: "",
        meat: "",
        rate: null,
        howtodo: "",
      },
    };
  },
  methods: {
    async submitRecipe() {
      try {
        await axios.post("https://676154ba6be7889dc360a4cd.mockapi.io/recipes/recipes", this.recipe);
        alert("Рецепт успешно добавлен!");
        this.$router.push("/");
      } catch (error) {
        console.error("Ошибка при добавлении рецепта:", error);
        alert("Не удалось добавить рецепт. Попробуйте еще раз.");
      }
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

h2{
    font-family: "Montserrat", serif;
    font-weight: 500;
    margin: 20px auto;
    font-size: 30px;
    
}  


.add-recipe-page {

  margin: 0 auto;

  font-family: Arial, sans-serif;
}

.recipe-form {
  max-width: 600px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: "Montserrat", serif;

}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 12px;
  font-family: "Montserrat", serif;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 15px;
  outline: none;
  font-family: "Montserrat", serif;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #23bb2b;
}

textarea {
  resize: vertical;
  font-family: "Montserrat", serif;
}

.submit-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #35c230;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  font-family: "Montserrat", serif;
  margin: 50px auto;
}

.submit-button:hover {
  background-color: #177917;
}
</style>


  