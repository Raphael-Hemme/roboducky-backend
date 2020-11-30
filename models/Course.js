const mongoose = require('mongoose');
const Schema = mongoose.Schema
const conversationSchema = new Schema({
  conv_date: Date,
  conv_description: String,
  conv_solution: String,
  tags: Array,
  auto_keywords: Array,
  links: Array,
  code_snippet: String,
  mood: Array
})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation;