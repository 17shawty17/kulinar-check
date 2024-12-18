<template>
    <div class="register">
      <h1 class="home__title">Kulinar~Check</h1>
      <h2>Регистрация</h2>
      <form @submit.prevent="register">
        <input v-model="name" placeholder="Имя" required class="form-control mb-2" />
        <input v-model="email" type="email" placeholder="Email" required class="form-control mb-2" />
        <input v-model="password" type="password" placeholder="Пароль" required class="form-control mb-2" />
        <button type="submit" class="btn btn-success">Зарегистрироваться</button>
      </form>
      <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      register() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find((u) => u.email === this.email)) {
          alert('Пользователь с таким email уже зарегистрирован!');
          return;
        }
        users.push({ name: this.name, email: this.email, password: this.password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Вы успешно зарегистрированы!');
        this.$router.push('/login'); 
      },
    },
  };
  </script>
    
<style scoped>

.register{
  max-width: 600px;
  height: 500px;
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: rgb(245, 205, 157);
}

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
    font-size: 40px;
    
}

form{
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
  margin: 20px auto;
}

input{
  outline: none;
  padding: 10px;
  font-family: "Montserrat", serif;
  border: none;
  border-radius: 15px;
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

p{
  font-family: "Montserrat", serif;
    font-size: 0.9rem;
    color: #4e4e4e;
    font-size: 18px;
    text-align: center;
}
</style>