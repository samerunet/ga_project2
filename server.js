//___________________
//Dependencies
//___________________
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();

const passwordDb = require("./models/passwordDb.js"); // import data to server
const schema = require("./models/passwordSchema.js"); // import Schema to server
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000

// schema.create(passwordDb, (err, data) => {
// 	console.log("Added password data successfully");
// });

app.get("/", (req, res) => {
	schema.find({}, (err, data) => {
		res.render("index.ejs", { schema: data });
	});
});

app.get("/dashboard", (req, res) => {
	schema.find({}, (err, data) => {
		res.render("dashboard.ejs", { schema: data });
	});
});
// app.get("/dashboard", (req, res) => {
// 	res.render("dashboard.ejs");
// });

// app.delete("/cost/:id", (req, res) => {
// 	dailyExpense.findByIdAndRemove(req.params.id, (err, data) => {
// 		res.redirect("/cost");
// 	});
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));
