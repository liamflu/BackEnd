<template>
  <div class="register-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <select v-model="role" required>
        <option value="">Selecione o tipo</option>
        <option value="paciente">Paciente</option>
        <option value="secretario">Secretário</option>
      </select>
      <button type="submit">Cadastrar</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
    <router-link to="/login">Já tem conta? Entrar</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:5000/api/users/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        });
        this.success = 'Cadastro realizado! Faça login.';
        this.error = '';
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar';
        this.success = '';
      }
    }
  }
};
</script>

<style scoped>
.register-container { max-width: 350px; margin: 40px auto; padding: 2em; border: 1px solid #ccc; border-radius: 8px;background : rgb(167, 209, 233); }
input, select { display: block; width: 100%; margin-bottom: 1em; padding: 0.5em; }
button { width: 100%; padding: 0.7em; background: #388e3c; color: #fff; border: none; border-radius: 4px; }
.error { color: red; margin-top: 1em; }
.success { color: green; margin-top: 1em; }
</style>
