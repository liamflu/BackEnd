<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <router-link to="/register">Não tem conta? Cadastre-se</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao logar';
      }
    }
  }
};
</script>

<style scoped>
.login-container { max-width: 350px; margin: 40px auto; padding: 2em; border: 1px solid #66131e; border-radius: 8px;background: rgb(167, 209, 233); }
input { display: block; width: 100%; margin-bottom: 1em; padding: 0.5em; }
button { width: 100%; padding: 0.7em; background: #1976d2; color: #fff; border: none; border-radius: 4px; }
.error { color: red; margin-top: 1em; }
</style>
