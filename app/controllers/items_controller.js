var express = require('express');

var Item = require('../models/item');

function listAll(res) {
	Item.find(function(err, items){
		if (err) res.send(err);
		// console.log(items);
		for(var i = 0; i < items.length; i++){
			items[i].focus = true;
			items[i].save(function(err){
				if (err) res.send(err)
			});
		}

		// items.save(function(err) {
		// if (err) res.send(err);
		console.log(items);
		res.send(items);
	// });

	})
}

exports.list = function(req, res){
	listAll(res);
};

exports.findOne = function(req, res){
	Item.findOne({_id: req.params._id}, function(err, item){
					if (err) res.send(err);

		// res.render('item', { item: item });
		res.send(item);
	})
};


exports.complete = function(req, res){
	Item.findById({_id: req.params._id}, function(err, item){
			if (err) res.send(err);
			if(!item.complete){
				item.complete = true;
			} else {
				item.complete = false;
			};
			item.save(function(err){
				if (err) res.send(err);
				listAll(res);
			});			
	})
};

exports.edit = function(req, res){
	// console.log(req);
	Item.findOne({_id: req.params._id}, function(err, item){
					if (err) res.send(err);
					// console.log(req.params._id);

		// res.rend,er('index', { layout: 'partials/_edit', items: item, current_item: req.params._id });
		res.send(item);
	})
};

exports.create = function(req, res) {
	var item = new Item();	
	// console.log(req);	
	// console.log(item);
	// console.log(req.body);
	item.text = req.body.text;
//	console.log(item);
	item.save(function(err) {
		if (err) res.send(err);
		listAll(res);
	});
};

exports.update = function(req, res) {
	Item.findById({ _id: req.params._id },function(err, item){
		if (err) res.send(err);
		// console.log('This is itmectrl update');
		// console.log(req.body);
		// console.log(item);	
			item.text = req.body.text;
			item.save(function(err){
				if (err) res.send(err);
				listAll(res);
			});						
	})
};

exports.destroy = function(req, res) {
	Item.remove({_id: req.params._id}, function(err, item){
		if (err) res.send(err);
		// res.redirect('/');
				listAll(res);
	});
};

function focusListTrue(res) {
	Item.findRandom({ focus: true, complete: false }, {}, { limit: 2 }, function(err, items){
		if (err) res.send(err);
		console.log(items);
		res.send(items);
	});
};

exports.reFocus = function(req, res){
	Items.find({ focus: false, complete: false}, function(err, items){
		if (err) res.send(err);
		items.focus = true;
	})
};

exports.focusList = function(req, res){
	focusListTrue(res);
};

exports.changeFocus = function(req, res){
	Item.findOne({_id: req.params._id}, function(err, item){
		if (err) res.send(err);
		item.focus = false;
		item.save(function(err){
			if (err) res.send(err);
			focusListTrue(res);
		});
	})
};
// exports.todoByID = function (req, res, next, id) {

//   // if (!mongoose.Types.ObjectId.isValid(id)) {
//   //   return res.status(400).send({
//   //     message: 'ToDo is invalid'
//   //   });
//   // }

//   Item.findById(id).exec(function (err, todo) {
//     if (err) {
//       return next(err);
//     } else if (!todo) {
//       return res.status(404).send({
//         message: 'No article with that identifier has been found'
//       });
//     }
//     req.todo = todo;
//     next();
//   });
// };
// var r = require('../config/routes');
// ItemController.route('/')
// 		.get(function(req, res) {
// 			Item.find(function(err, items){
// 				if (err) res.send(err);

// 				res.render('index', { items: items });
// 			})
// 		})


// module.exports = function(app, express){

// 	var ItemController = express.Router();

// 	ItemController.route('/')
// 		.get(function(req, res) {
// 			Item.find(function(err, items){
// 				if (err) res.send(err);

// 				res.render('index', { items: items });
// 			})
// 		})


// 		exports.list = function(req, res){
// Item.find(function(err, todos) {
//     if(err) {
//       return res.status(400).send({
//         message: getErrorMessage(err)
//       });
//     }
//     else {
//       res.json(todos);
//     }
//   });
// };

// 		.post(function(req, res) {
// 			var item = new Item();	
// 			// console.log(req.body);	
// 			console.log(item);

// 			item.text = req.body.item;
// 			console.log(item);
// 			item.save(function(err) {
// 				if (err) res.send(err);

// 				res.redirect('/');
// 			});
// 		});

// 	ItemController.route('/:_id')
// 		.delete(function(req, res) {
// 			Item.remove({_id: req.params._id}, function(err, items){
// 				if (err) res.send(err);

// 				res.redirect('/');
// 				// res.redirect('/');
// 			})
// 		})
// 		return ItemController;
// }

