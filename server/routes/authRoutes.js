const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  isEmailUnique,
} = require('../controllers/authController');

router.get('/check-email', isEmailUnique);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
