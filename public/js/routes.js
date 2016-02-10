// var express = require('express');
// var apiRouter = express.Router();

// var itemController = require('../app/controllers/item.js');

// apiRouter.route('/')
// .get(function(req, res) {
// 	itemController.index
// });


// apiRouter.route('/b')
// .get(function(req, res) {
// 	res.render('index', {title: 'This is the b page!'});
// });

// module.exports = apiRouter;
// var mongoose = require('mongoose'),
var itemC = require('../../app/controllers/items_controller');
  // Item = mongoose.model('Item');
module.exports = function(app) {
  app.route('/api/')
    .get(itemC.list)
    .post(itemC.create);

    app.route('/api/refocus')
    .get(itemC.reFocus);
  // app.route('/api/:_id')
  //   .put(todo.update)
  	// .get(itemC.findOne)
    // .post(itemC.update);
    // .post()
	app.route('/api/update/:_id')
		.post(itemC.update)

  app.route('/api/complete/:_id')
    .post(itemC.complete)

	app.route('/api/edit/:_id')
		.get(itemC.edit)

	app.route('/api/destroy/:_id')
		.post(itemC.destroy)

  app.route('/api/focus')
    .get(itemC.focusList)
  
  app.route('/api/focus/:_id')
    .post(itemC.changeFocus)
  // app.param('_id', itemC.todoByID);    
};