const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middlewares/auth');

router.post('/', auth, appointmentController.create);
router.get('/', auth, appointmentController.list);

module.exports = router;
