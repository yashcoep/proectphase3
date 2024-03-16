const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);

router.get('/catalog', (req, res) => {
    res.render('catalog');
});


module.exports = router;
