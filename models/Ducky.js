const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const duckySchema = new Schema({
  userName: {type: String, min: 2, max: 50, required: true},
  userEmail: {type: String, min: 3, max: 50, required: true},
  password: {type: String, min: 4, required: true},
  duckyName: {type: String, min: 2, max: 50, required: true}
})

duckySchema.methods.createToken = function() {
  const payload = { _id: this._id, name: this.userName }
  const secretKey = process.env.JWT_SECRET
  const token = jwt.sign(payload, secretKey, { expiresIn: "3h"})
  return token
}

const Ducky = mongoose.model('Ducky', duckySchema);

module.exports = Ducky;