const mongoose = require('mongoose');
const Schema = mongoose.Schema
const conversationSchema = new Schema({
  convDate: Date,
  convDescription: String,
  convSolution: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  autoKeywords: { type: Array},
  links: {type: Array},
  codeSnippet: String,
  mood: {type: Array},
})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation;