const Conversation = require('../models/Conversation')
const Ducky = require('../models/Ducky')
const Tag = require('../models/Tag')


////////// Create conversation //////////
exports.create_conversation = async (req, res) => {
  const { convDescription, convSolution, convTags, convLinks, convCodeSnippet, convMood } = req.body
  const { _id } = req.ducky ////// Do I get it from the headers directly or from the decoded token? Is it fine to send the id plain in the headers? Then anybody who knows a ducky's Id, could create new conversations... Therefore probably A) authorization first which also gives the ducky id after decoding the token.
  let newConversation = new Conversation({
    duckyId: _id,
    convDescription,
    convSolution,
    convTags,
    convLinks,
    convCodeSnippet,
    convMood
  })

  try {
    // push all the tags into the tag create....
    await newConversation.save()
    console.log({duckyId: _id})
    console.log({newConversationId: newConversation._id})
    await Ducky.findByIdAndUpdate(_id, { $push: { conversations: newConversation._id } })
    res.status(200).json(newConversation)
  } catch (err) {
    console.error(err)
  }

}

////////// Find conversation by conversation id //////////
exports.find_conversation_by_convId = (req, res) => {
  const { convId } = req.params
  Conversation.findById(convId)//.populate('duckyId')
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

////////// Retrieve all conversations from this ducky //////////
exports.find_conversation_by_duckyId = async (req, res) => {
  const { _id } = req.ducky
  try {
    let duckyMemory = await Conversation.find({ duckyId: _id }).exec();
    res.status(200).json(duckyMemory)
  } catch (err) {
    console.error(err)
  }
}

////////// Retrieve conversations from this ducky with specific tag(s) //////////
exports.find_conversation_by_tag = async (req, res) => {
  const { tagName } = req.body
  console.log('tagName: ', tagName)
  const searchTag = await Tag.findOne({ tagName: tagName }).exec();
  console.log({searchTag})
  try {
    let duckyMemory = await Conversation.find({ convTags: { $all: [searchTag._id] } }).exec();
    console.log({duckyMemory})
    res.status(200).json(duckyMemory)
  } catch (err) {
    console.error(err)
  }
}


////////// Update a convDescription by id //////////
exports.update_convDescription = (req, res) => {
  const { convId, new_description } = req.body  // Is that correct?
  Conversation.updateOne({ _id: convId}, {convDescription: new_description })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
} 

////////// Update a convSolution by id //////////
exports.update_convSolution = (req, res) => {
  const { convId, new_solution } = req.body
  Conversation.updateOne({ _id: convId}, {convTags: new_tags })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
} 

////////// Update a convTags by id //////////
exports.update_convTags = (req, res) => {
  const { convId, new_tags } = req.body
  Conversation.updateOne({ _id: convId}, {convTags: new_tags })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

////////// Update a convTags by id //////////
exports.update_convLinks = (req, res) => {
  const { convId, new_links } = req.body
  Conversation.updateOne({ _id: convId}, {convLinks: new_links })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

////////// Update a convCodeSnippet by id //////////
exports.update_convCodeSnippet = (req, res) => {
  const { convId, new_codeSnippet } = req.body
  Conversation.updateOne({ _id: convId}, {convCodeSnippet: new_codeSnippet })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
}

////////// Delete an entire conversation by id //////////    --- This one is working but I think anybody who has an account could delete anybody's conversation.
/* exports.delete_conversation = async (req, res) => {
  const { convId } = req.params;
  const { _id } = req.ducky;
  try { 
    await Conversation.deleteOne({ _id: convId })
    res.status(200).send('Conversation deleted.')
  } catch (err) {
    console.error(err.message)
  }
} */

////////// Delete an entire conversation by id //////////    --- Here not even the author of a conversation is able to delete it -> access denied.
exports.delete_conversation = async (req, res) => {
  const { convId } = req.params;
  const duckyId = req.ducky._id;
  console.log(duckyId.toString())

  const conversationToDelete = await Conversation.findOne({ _id: convId })
  let convToDelId= conversationToDelete.duckyId
  
  console.log(convToDelId.toString()) 
  try { 
    if (convToDelId.toString() === duckyId.toString()) {
      await Conversation.deleteOne({ _id: convId })
      res.status(200).send('Conversation deleted.')
    } else {
      res.status(401).send('Access denied!') // Both duckyIds are identical and still the condition block is run. Why?
    }
  } catch (err) {
    console.error(err.message)
  }
}


