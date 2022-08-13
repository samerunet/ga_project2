const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
	url: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	image: { type: String, required: false },
});

const passwords = mongoose.model("passwordDB", modelSchema);

module.exports = passwords;
