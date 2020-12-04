const express = require('express');
const conversationsRouter = express.Router();
const conversationController = require('../controllers/conversationController');
const { authorizeDucky, duckyContext } = require('../middlewares/authorizeDucky');
//const authenticationController = require('../controllers/authenticationController');


//conversationsRouter.get('/', conversationController.list_conversations);

///////// Create whole new conversation ////////////
conversationsRouter.post('/', authorizeDucky, duckyContext, conversationController.create_conversation);

///////// Update conversation fields ////////////
conversationsRouter.put('/convDescription', conversationController.update_convDescription);
conversationsRouter.put('/convSolution', conversationController.update_convSolution);
conversationsRouter.put('/convTags', conversationController.update_convTags);
conversationsRouter.put('/convLinks', conversationController.update_convLinks);
conversationsRouter.put('/convCodeSnippet', conversationController.update_convCodeSnippet);

///////// Get conversations ////////////
conversationsRouter.get('/convId/:convId', conversationController.find_conversation_by_convId);
conversationsRouter.get('/', authorizeDucky, duckyContext, conversationController.find_conversation_by_duckyId);
conversationsRouter.get('/tagsearch', conversationController.find_conversation_by_tag);

///////// Delete an individual conversation ////////////
conversationsRouter.delete('/delete/:convId', authorizeDucky, duckyContext, conversationController.delete_conversation)


module.exports = conversationsRouter;

