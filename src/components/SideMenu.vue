<template>
    <nav>
      <ul class="nav-menu">
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/favorites">Избранное</router-link></li>
        <li><router-link to="/add-recipe">Добавить рецепт</router-link></li>
        <li><button @click="logout">Выйти</button></li>
      </ul>
    </nav>
</template>

<script>
 export default{
    data(){

    },
    methods:{
    logout() {
      localStorage.removeItem('authUser');
      this.$router.push('/login');
    },
    }
 }
</script>

<style scoped>

nav{
    background-color: rgb(245, 205, 157);
    padding: 15px;
    margin: 0;
}
.nav-menu {
  display: flex;
  max-width: 700px;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  gap: 1rem;
}
a {
  font-family: "Pacifico", serif;
  font-weight: 300;
  font-size: 18px;
  text-decoration: none;
  display: block;
  padding: 5px 0;
  color: black;
  transition: 250ms;
  padding: 10px;
  background-color: rgb(235, 235, 235);
  border-radius: 15px;
}
a:hover {
  background-color: rgb(235, 235, 235);
  border-radius: 15px;
  transform: scale(1.1);
}

button{
    padding: 10px;
    border: none;
    background-color: rgb(207, 76, 76);
    color: white;
    font-weight: 500;
    border-radius: 10px;
    transition: 250ms;
    font-family: "Pacifico", serif;
    font-weight: 300;
    font-size: 18px;
}

button:hover{
    background-color: rgb(156, 4, 4);
    color: white;
    transform: scale(1.1);
    cursor: pointer;
}
</style>