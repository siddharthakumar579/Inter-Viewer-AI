const express = require('express')
const authrouter = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')



// Route for regsitering a new user
authrouter.post('/register', authController.registerUserController)




//Route to logIn an existing user
authrouter.post('/login', authController.loginUserController)


//Route to logout a user and blacklist its token
authrouter.get('/logout', authController.logOutUserController)



authrouter.get('/get-me', authMiddleware.authuser, authController.getMeController)



module.exports = authrouter;