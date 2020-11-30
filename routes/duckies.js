var express = require('express');
var duckiesRouter = express.Router();
const duckyController = require('../controllers/duckyController');
const authorizeDucky = require('../middleware/authorizeDucky');


duckiesRouter.get('/', authorizeDucky, DuckyController.list_ducky);
duckiesRouter.get('/:id', duckyController.find_ducky);
duckiesRouter.post('/', duckyController.create_ducky);
duckiesRouter.put('/', duckyController.update_ducky);
duckiesRouter.delete('/:id', authorizeDucky, DuckyController.delete_ducky)


module.exports = duckiesRouter;
