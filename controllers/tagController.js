const Ducky = require('../models/Ducky');
const bcrypt = require('bcrypt');

exports.list_tags = (req, res) => {
    Tag.find()
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
}

exports.find_tag = (req, res) => {
  const { tagName } = req.params
  Tag.findOne(tagName).populate('conversationId')
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

exports.create_tag = async (req, res) => {
  const { tagName } = req.body
  try {
    let newTag = await Tag.findOne( { tagName })
    if ( newTag ) return res.status(400).send('This tag already exists')
    newTag = new Tag({ tagName })
    await ducky.save() // Can I do that here with await or does it not make sense in this context?
  } catch(e) {
    console.error(e.message)
  }
}

exports.update_tag = (req, res) => {
  const { oldName, newName } = req.params
  Tag.updateOne({ tagName: oldName }, { tagName: newName })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

exports.delete_tag = (req, res) => {
  const { tagId } = req.params
  console.log(tagId)
  Tag.deleteOne({ _id: tagId })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}