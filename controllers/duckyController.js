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
  const { user_name, user_email, ducky_name, password } = req.body
  try {
    let ducky = await Ducky.findOne( { user_email })
    if ( ducky ) return res.status(400).send('This ducky already exists')
    ducky = new Ducky({ user_name, user_email, ducky_name, password: await bcrypt.hash(password, 10) })

    await ducky.save()
    res.set('x-authorization-token', token).send({ _id: ducky._id, email: ducky.user_email})
  } catch(e) {
    console.error(e.message)
  }
}

exports.update_ducky = (req, res) => {
  const { old_name, new_name } = req.params
  Ducky.updateOne({ ducky_name: old_name }, { ducky_name: new_name })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

exports.delete_ducky = (req, res) => {
  const { id } = req.params
  Ducky.deleteOne({ _id: id })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}