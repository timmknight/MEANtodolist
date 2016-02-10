var mongoose = require('mongoose'),
	random = require('mongoose-simple-random')
	Schema = mongoose.Schema;

var ItemSchema = new Schema({
	text: { type: String },
	complete: { type: Boolean, default: false },
	focus: { type: Boolean, default: false }
});
ItemSchema.plugin(random);
module.exports = mongoose.model('Item', ItemSchema);