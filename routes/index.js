const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const createUserController = require('../controllers/createUserController');


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);
router.get('/catalog', isAuthenticated,productController.getProducts);
router.get('/logout', authController.logout);

router.get('/create-user', (req, res) => {
    res.render('createUser');
});
router.post('/create-user',createUserController.createUser);


module.exports = router;
