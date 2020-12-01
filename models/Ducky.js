const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const duckySchema = new Schema({
  user_name: {type: String, min: 2, max: 50, required: true},
  user_email: {type: String, min: 3, max: 50, required: true},
  password: {type: String, min: 8, required: true},
  ducky_name: {type: String, min: 2, max: 50, required: true}
})

duckySchema.methods.createToken = function() {
  const payload = { _id: this._id, email: this.user_email }
  const secretKey = process.env.JWT_SECRET
  const token = jwt.sign(payload, secretKey, { expiresIn: "3h"})
  return token
}

const Ducky = mongoose.model('Ducky', duckySchema);

module.exports = Ducky;