const Ducky = require('../models/Ducky');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { userName, password } = req.body

  let ducky = await Ducky.findOne({ userName })
  console.log({ducky})

  if (!ducky) return res.status(400).send('Invalid Credentials')

  const match = await bcrypt.compare(password, ducky.password)
  if (!match) return res.status(400).send('Invalid Credentials')

  const token = ducky.createToken()
  res.set('x-authorization-token', token).send("Login successful!")
}