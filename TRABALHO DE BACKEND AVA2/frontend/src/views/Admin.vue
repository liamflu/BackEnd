<template>
  <div class="admin-container">
    <h2>Painel Administrativo</h2>
    <button @click="logout">Sair</button>
    <div v-if="dashboard">
      <p><b>Total de Usuários:</b> {{ dashboard.totalUsers }}</p>
      <p><b>Total de Consultas:</b> {{ dashboard.totalAppointments }}</p>
      <h3>Últimos Agendamentos</h3>
      <ul>
        <li v-for="a in dashboard.lastAppointments" :key="a._id">
          {{ new Date(a.date).toLocaleString() }} — {{ a.user.name }} ({{ a.user.email }})
        </li>
      </ul>
    </div>
    <router-link to="/dashboard">Voltar</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      dashboard: null
    };
  },
  async created() {
    const token = localStorage.getItem('token');
    if (!token) return this.$router.push('/login');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.dashboard = res.data;
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
.admin-container { max-width: 600px; margin: 40px auto; padding: 2em; border: 1px solid #ccc; border-radius: 8px; }
ul { list-style: none; padding: 0; }
li { margin-bottom: 1em; }
button { float: right; margin-bottom: 1em; }
</style>
