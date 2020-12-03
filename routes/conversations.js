const express = require('express');
const conversationsRouter = express.Router();
const conversationController = require('../controllers/conversationController');
const { authorizeDucky, duckyContext } = require('../middlewares/authorizeDucky');
//const authenticationController = require('../controllers/authenticationController');


//conversationsRouter.get('/', conversationController.list_conversations);

conversationsRouter.post('/', authorizeDucky, duckyContext, conversationController.create_conversation);
/* conversationsRouter.put('/convDescription', conversationController.update_convDescription);
conversationsRouter.put('/convSolution', conversationController.update_convSolution);
conversationsRouter.put('/convTags', conversationController.update_convTags);
conversationsRouter.put('/convLinks', conversationController.update_convLinks);
conversationsRouter.put('/convCodeSnippet', conversationController.update_convCodeSnippet); */
conversationsRouter.get('/:convId', conversationController.find_conversation_by_convId);
//conversationsRouter.delete('/:convId', authorizeDucky, conversationController.delete_conversation)


module.exports = conversationsRouter;


