const Conversation = require('../models/Conversations')

exports.create_conversation = (req, res) => {
  const { conversation_description, solution_description, tags, links, code_snippet } = req.body
  Conversation.create({conversation_description, solution_description, tags, links, code_snippet})
    .then(data => res.json(data))
    .catch(err => console.error(err))
}
