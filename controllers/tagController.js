const Ducky = require('../models/Ducky');
const Tag = require('../models/Tag');
const Conversation = require('../models/Conversation');
//const bcrypt = require('bcrypt');

exports.list_tags = async (req, res) => {
  try {
    let tagList = await Tag.find()
    res.json(tagList)
  } catch (err) {
    console.error(err.message)
  }
}

exports.find_tag = (req, res) => {
  const { tagName } = req.params
  Tag.findOne(tagName).populate('conversationId')
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

exports.create_tag = async (req, res) => {
  const { tagName } = req.body
  const { convId } = req.params //change to rtrieve convId from req.conversation by including another middleware
  try {
    let newTag = await Tag.findOne( { tagName })
    if ( newTag && newTag.conversationId.includes(convId) ) {
      return res.send('This conversation is already tagged with this tag.')
    } else if ( newTag ) {
      await Tag.findByIdAndUpdate(newTag._id, { $push: { conversationId: convId } })
      await Conversation.findByIdAndUpdate(convId, { $push: { convTags: newTag._id } })
      return res.send('This tag existed already but it was assigned to this conversation')
    } else {
      newTag = new Tag({ tagName, conversationId: convId })
      await newTag.save()
      await Conversation.findByIdAndUpdate(convId, { $push: { convTags: newTag._id } })
      console.log('tag id pushed to conversation tag-array')
      res.status(200).send('Tag created') 
    }
  } catch(e) {
    console.error(e.message)
    res.status(500)
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
    .then(res.status(200).send('Tag deleted'))
    .catch(err => console.error(err.message))
}