const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/authMiddleware');


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);
router.get('/catalog', isAuthenticated,productController.getProducts);
const { isAuthenticated } = require('../middlewares/authMiddleware');


module.exports = router;
