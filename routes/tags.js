const express = require('express');
const tagsRouter = express.Router();
const tagController = require('../controllers/tagController');
//const { authorizeDucky } = require('../middlewares/authorizeDucky');
//const authenticationController = require('../controllers/authenticationController');


tagsRouter.get('/', tagController.list_tags);
tagsRouter.get('/:tagName', tagController.find_tag);
tagsRouter.post('/:convId', tagController.create_tag);
tagsRouter.put('/', tagController.update_tag);
tagsRouter.delete('/:tagId', tagController.delete_tag) // I would need to delete deleted tag's tagIds from all the conversations where they are stored


module.exports = tagsRouter;
