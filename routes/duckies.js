const express = require('express');
const duckiesRouter = express.Router();
const duckyController = require('../controllers/duckyController');
const authorizeDucky = require('../middlewares/authorizeDucky');


duckiesRouter.get('/', duckyController.list_duckies);
duckiesRouter.get('/:id', duckyController.find_ducky);
duckiesRouter.post('/', duckyController.create_ducky);
duckiesRouter.put('/', authorizeDucky, duckyController.update_ducky);
duckiesRouter.delete('/:id', authorizeDucky, duckyController.delete_ducky)


module.exports = duckiesRouter;
