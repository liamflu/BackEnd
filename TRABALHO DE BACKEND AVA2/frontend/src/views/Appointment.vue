<template>
  <div class="appointment-container">
    <h2>Agendar Consulta</h2>
    <form @submit.prevent="agendar">
      <input v-model="date" type="datetime-local" required />
      <input v-model="cep" type="text" placeholder="CEP" maxlength="8" required @blur="buscarEndereco" />
      <input v-model="address" type="text" placeholder="Endereço" readonly />
      <button type="submit">Agendar</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
    <router-link to="/dashboard">Voltar</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      date: '',
      cep: '',
      address: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async buscarEndereco() {
      if (this.cep.length === 8) {
        try {
          const res = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`);
          if (res.data.erro) throw new Error('CEP inválido');
          this.address = `${res.data.logradouro}, ${res.data.bairro}, ${res.data.localidade} - ${res.data.uf}`;
        } catch {
          this.address = '';
          this.error = 'CEP inválido';
        }
      }
    },
    async agendar() {
      this.error = '';
      this.success = '';
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:5000/api/appointments', {
          date: this.date,
          cep: this.cep
        }, {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.success = 'Consulta agendada!';
        this.address = '';
        this.cep = '';
        this.date = '';
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao agendar';
      }
    }
  }
};
</script>

<style scoped>
.appointment-container { max-width: 400px; margin: 40px auto; padding: 2em; border: 1px solid #ccc; border-radius: 8px; background : rgb(164, 194, 196); }
input { display: block; width: 100%; margin-bottom: 1em; padding: 0.5em; }
button { width: 100%; padding: 0.7em; background: #1976d2; color: #fff; border: none; border-radius: 4px; }
.error { color: red; margin-top: 1em; }
.success { color: green; margin-top: 1em; }
</style>
