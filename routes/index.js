const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);
router.get('/catalog', productController.getProducts);



module.exports = router;
