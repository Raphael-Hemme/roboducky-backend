const mongoose = require('mongoose');
const Schema = mongoose.Schema
const conversationSchema = new Schema({
  conv_date: Date,
  conv_description: String,
  conv_solution: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "nameOfYourOtherModel" }],
  auto_keywords: [{ type: Schema.Types.ObjectId, ref: "nameOfYourOtherModel" }],
  links: {type: Array},
  code_snippet: String,
  mood: {type: Array},
})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation;