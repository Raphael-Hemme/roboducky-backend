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

const duckyContext = async (req, res, next) => {
//  const ducky = Ducky.findOne({ _id: req.data._id });
  const ducky = await Ducky.findById(req.data._id).exec();
//  console.log({ducky})
  if (!ducky) return res.status(404).send("This ducky has not hatched yet.")
//const { password, ...duckyWithoutPassword } = ducky
// I addid this one to make it a bit safer and not per accident send the PW into the FE.
// On testing it with Postman, it worked, biut if trouble arises, delete the declaration of duckyWithoutWassword
// and assign req.ducky to ducky instead of duckyWithoutPassword
  const duckyWithoutPassword = {
    _id: ducky._id,
    userName: ducky.userName,
    userEmail: ducky.userEmail,
    duckyName: ducky.duckyName,
  }
  console.log({duckyWithoutPassword})
  req.ducky = duckyWithoutPassword
  next()
}

module.exports = { authorizeDucky, duckyContext };