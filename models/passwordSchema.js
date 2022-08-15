const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
	url: { type: String },
	username: { type: String },
	password: { type: String },
	image: { type: String },
});

const passwords = mongoose.model("passwordDb", modelSchema);

module.exports = passwords;
