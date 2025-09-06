const Appointment = require('../models/Appointment');
const User = require('../models/User');
const fetch = require('node-fetch');

exports.create = async (req, res) => {
  try {
    const { date, cep } = req.body;
    if (!date || !cep) return res.status(400).json({ message: 'Data e CEP são obrigatórios' });
    // Verifica se já existe agendamento para o horário
    const exists = await Appointment.findOne({ date });
    if (exists) return res.status(400).json({ message: 'Horário já agendado' });
    // Consulta endereço pelo CEP
    const viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r => r.json());
    if (viaCep.erro) return res.status(400).json({ message: 'CEP inválido' });
    const address = `${viaCep.logradouro}, ${viaCep.bairro}, ${viaCep.localidade} - ${viaCep.uf}`;
    // Consulta previsão do tempo
    const dateObj = new Date(date);
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${viaCep.lat||-23.55}&lon=${viaCep.lon||-46.63}&appid=${process.env.OPENWEATHER_API_KEY}&lang=pt_br&units=metric`).then(r => r.json());
    let weather = '';
    if (weatherRes.list) {
      const forecast = weatherRes.list.find(f => f.dt_txt.startsWith(dateObj.toISOString().slice(0, 10)));
      if (forecast) weather = forecast.weather[0].description;
    }
    const appointment = new Appointment({
      user: req.user.id,
      date,
      address,
      cep,
      weather
    });
    await appointment.save();
    res.status(201).json({ message: 'Consulta agendada', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao agendar', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const filter = req.user.role === 'secretario' ? {} : { user: req.user.id };
    const appointments = await Appointment.find(filter).populate('user', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar', error: err.message });
  }
};
