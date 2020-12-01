const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tagSchema = new Schema({
  tag_name: String,
  conversation_id: [{ type: Schema.Types.ObjectId, ref: "Conversation" }]
});

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag;