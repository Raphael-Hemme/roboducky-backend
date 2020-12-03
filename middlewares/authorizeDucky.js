const jwt = require('jsonwebtoken');
const Ducky = require('../models/Ducky');

const authorizeDucky = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send("Access denied")
  try {
    req.data = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(403).send("Invalid token!");
  }
};

const duckyContext = (req, res, next) => {
  const ducky = Ducky.findOne({ _id: _id });
  if (!ducky) return res.status(404).send("This ducky has not hatched yet.")
  const { password, ...duckyWithoutPassword } = ducky
  req.ducky = duckyWithoutPassword
  next()
}

module.exports = { authorizeDucky, duckyContext };