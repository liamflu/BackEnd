<template>
  <div class="dashboard-container">
    <h2>Minhas Consultas</h2>
    <button @click="logout">Sair</button>
    <router-link to="/agendar">Agendar Consulta</router-link>
    <ul>
      <li v-for="a in appointments" :key="a._id">
        <b>{{ new Date(a.date).toLocaleString() }}</b> — {{ a.address }}
        <span v-if="a.weather"> | Clima: {{ a.weather }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      appointments: []
    };
  },
  async created() {
    const token = localStorage.getItem('token');
    if (!token) return this.$router.push('/login');
    try {
      const res = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.appointments = res.data;
    } catch {
      this.$router.push('/login');
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.dashboard-container { max-width: 600px; margin: 40px auto; padding: 2em; border: 1px solid #ccc; border-radius: 8px; background : rgb(167, 209, 233); }
ul { list-style: none; padding: 0; }
li { margin-bottom: 1em; }
button { float: right; margin-bottom: 1em; }
</style>
