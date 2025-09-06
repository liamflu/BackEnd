const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const lastAppointments = await Appointment.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email');
    res.json({ totalUsers, totalAppointments, lastAppointments });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados', error: err.message });
  }
};
