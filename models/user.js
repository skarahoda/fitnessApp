/**
 * Created by skarahoda on 6.08.2016.
 */
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

function username(name) {
	return name || this.facebook.name || this.google.name;
}
// define the schema for our user model
var userSchema = mongoose.Schema({
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	name: {type: String, get: username}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);