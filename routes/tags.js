const express = require('express');
const tagsRouter = express.Router();
const tagController = require('../controllers/duckyController');
const { authorizeDucky } = require('../middlewares/authorizeDucky');
//const authenticationController = require('../controllers/authenticationController');


tagsRouter.get('/', tagController.list_tags);
tagsRouter.get('/:tagName', tagController.find_tag);
tagsRouter.post('/', tagController.create_tag);
//tagsRouter.put('/', authorizeDucky, tagController.update_tag);
//tagsRouter.delete('/:tagId', authorizeDucky, tagController.delete_tag)


module.exports = tagsRouter;
