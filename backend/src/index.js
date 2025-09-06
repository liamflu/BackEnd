require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => console.error('Erro ao conectar no MongoDB:', err));
