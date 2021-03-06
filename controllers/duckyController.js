const Ducky = require('../models/Ducky');
const bcrypt = require('bcrypt');

exports.list_duckies = (req, res) => {
  console.log(req.duckyPayload)
    Ducky.find()
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
}

exports.find_ducky = (req, res) => {
  const { id } =req.params
  Ducky.findById(id).populate('course')
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

exports.create_ducky = async (req, res) => {
  const { userName, userEmail, duckyName, password } = req.body
//  console.log(userName, userEmail, duckyName, password)
  try {
    let ducky = await Ducky.findOne( { userName })
    if ( ducky ) return res.status(400).send('This ducky already exists')
    ducky = new Ducky({ userName, userEmail, duckyName, password: await bcrypt.hash(password, 10) })
    await ducky.save()
    const token = ducky.createToken()
    console.log('New token created')
    res.set('x-authorization-token', token).send("Signup successful!")
  } catch(e) {
    console.error(e.message)
  }
}

exports.update_ducky = (req, res) => {
  const { oldName, newName } = req.params
  Ducky.updateOne({ duckyName: oldName }, { duckyName: newName })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

exports.delete_ducky = (req, res) => {
  const { id } = req.params
  console.log(id)
  Ducky.deleteOne({ _id: id })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}