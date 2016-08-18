/**
 * Created by skarahoda on 6.08.2016.
 */
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
	start: {type: Date, default: Date.now},
	end: {type: Date, default: Date.now},
	points: [{
		latitude: Number,
		longitude: Number,
		timeStamp: {type: Date, default: Date.now}
	}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Workout', userSchema);