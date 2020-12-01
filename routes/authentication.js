const express = require('express');
const authenticationRouter = express.Router();
const authenticationController = require('../controllers/authenticationController')
// const { authorizeUser, userContext } = require('../middleware/auth');
// const jwt = require('jsonwebtoken');

authenticationRouter.post('/login', authenticationController.login)

module.exports = authenticationRouter;
