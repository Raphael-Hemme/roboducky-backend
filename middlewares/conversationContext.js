const jwt = require('jsonwebtoken');
const Ducky = require('../models/Ducky');
const Conversation = require('../models/Conversation');
const Tag = require('../models/Tag');



const conversationContext = async (req, res, next) => {
//  const ducky = Ducky.findOne({ _id: req.data._id });
//  const conversation = await Conversation.findById(req.body.conversationId).exec();
//  console.log({ducky})
//  if (!conversation) return res.status(404).send("This ducky has not hatched yet.")
  const conversation = {
    duckyId: req.ducky._id || undefined,
//    convDate,
    convDescription: req.body.convDescription,
    convSolution: req.body.convSolution || "",
    convTags: req.body.convTags || [],
//    convAutoKeywords: req.body.convAutoKeywords,
//    convLinks: req.body.convLinks,
//    convCodeSnippet: req.body.convCodeSnippet,
    convMood: req.body.convMood || [],
  }
  console.log({conversation})
  req.conversation = conversation
  next()
}

module.exports = conversationContext;