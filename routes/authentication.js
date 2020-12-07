const express = require('express');
const authenticationRouter = express.Router();
const { authorizeDucky, duckyContext } = require('../middlewares/authorizeDucky.js');

const authenticationController = require('../controllers/authenticationController')
// const { authorizeUser, userContext } = require('../middlewares/auth');
// const jwt = require('jsonwebtoken');

authenticationRouter.post('/login', authenticationController.login)

authenticationRouter.get('/secret', authorizeDucky, (req, res) => {
  res.send(req.data)
});

authenticationRouter.get('/me', [authorizeDucky, duckyContext], (req, res) => {
  console.log(req.ducky)
  res.send(req.ducky)
})

module.exports = authenticationRouter;
