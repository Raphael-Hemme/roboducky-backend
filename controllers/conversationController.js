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
//    convTags, -> try to find one and use id
//    convLinks,
//    convCodeSnippet,
    convMood: [convMood]
  })

  try {
    // push all the tags into the tag create....
    await newConversation.save()
    console.log({duckyId: _id})
    console.log({newConversationId: newConversation._id})
    await Ducky.findByIdAndUpdate(_id, { $push: { conversations: newConversation._id } });
  // new tag part... remove stuff between these comments if it breaks
  (async (convId) => {
    const tagsPromise = convTags.map(async (tag) => await Tag.findOne( { tagName: tag }))
    const resolvedTags = await Promise.all(tagsPromise)

    resolvedTags.forEach(async (tag, i) => {
        if (tag) {
          await Tag.findByIdAndUpdate(tag._id, { $push: { conversationId: convId } }, { new: true })
          await Conversation.findByIdAndUpdate(convId, { $push: { convTags: tag._id } }, { new: true })
        } else {
          newTag = new Tag({ tagName: convTags[i], conversationId: convId })
          await newTag.save()
          await Conversation.findByIdAndUpdate(convId, { $push: { convTags: newTag._id } })
        }
    })
  })(newConversation._id)
  // new tag part... remove stuff between these comments if it breaks
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
  const duckyId = req.ducky._id.toString()
  try {
    if ( !duckyId ) {
      res.status(404).send('Your ducky has not hatched yet.')
    } else {
      let duckyMemory = await Conversation.find({ duckyId: duckyId }).exec();
      console.log(`User ${duckyId} requested all his previous conversations. Conversations have been sent.`)
      res.status(200).json(duckyMemory)
    }
  } catch (err) {
    console.error(err)
  }
}

////////// Retrieve conversations from this ducky with specific tag(s) //////////

// This works. But it sends ALL results with the respective tags. So also the results of other duckies.
// And it pushes arrays into an array. And does not send results only when all tags are present. 
// -> Rework the implementation later. Start from the results of the obvoe find_conversation_by_duckyId method.

exports.find_conversation_by_tag = async (req, res) => {
  // const { searchTags } = req.body
  const tags = req.query.tags
  console.log(tags)
  const duckyId = req.ducky._id.toString()
  try {
    if ( !duckyId ) {
      res.status(404).send('Your ducky has not hatched yet.')
    } else {
      let searchResult;
      (async () => {
        const tagsPromise = tags.map(async (tag) => await Tag.findOne( { tagName: tag }))
        const resolvedTags = await Promise.all(tagsPromise)
        const tagNameToId = resolvedTags.map(el => el._id) //{"$oid":"5fd0a9305a55859ea1022d1e"} - {'$oid:'+el._id}
        console.log(tagNameToId)
        searchResult = await Conversation.find({ convTags: { $all: tagNameToId } })
        res.status(200).send(searchResult)
      })()
    }
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
  const duckyId = req.ducky._id.toString();
//  console.log(duckyId.toString())

  const conversationToDelete = await Conversation.findOne({ _id: convId })
  let convToDelId= conversationToDelete.duckyId.toString()

//  console.log(convToDelId.toString()) 
  try {
    if ( !convId ) {
      res.status(500).send('Your ducky does not remember such a conversation.')
    } else if ( convToDelId !== duckyId ) {
      console.log(`A user with id: ${duckyId} has tried to delete a conversation created by another user with the id: ${convToDelId}. Access has been denied.`) 
      res.status(401).send('Your ducky does not remember such a conversation.')
    } else {
      await Conversation.deleteOne({ _id: convId })
      console.log(`The user with id: ${duckyId} has deleted a conversation. Access has been granted.`)
      res.status(200).send('Conversation deleted.')
    }
  } catch (err) {
    console.error(err.message)
  }
}


