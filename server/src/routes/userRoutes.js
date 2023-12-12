const express = require('express');
const userControllers = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.get('/get-loggedin-user', authMiddleware, userControllers.getLoggedinUser);
router.get('/get-user-by-id/:id', authMiddleware, userControllers.getUserById);
router.get('/getUserByEmail/:email', authMiddleware, userControllers.getUserByEmail);

module.exports = router;