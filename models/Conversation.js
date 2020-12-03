const mongoose = require('mongoose');
const Schema = mongoose.Schema
const conversationSchema = new Schema({
  duckyId: { type: Schema.Types.ObjectId, ref: "Ducky" },
  convDate: Date,
  convDescription: String,
  convSolution: String,
  convTags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  convAutoKeywords: { type: Array},
  convLinks: {type: Array},
  convCodeSnippet: {type: Array},
  convMood: {type: Array},
})


const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation;