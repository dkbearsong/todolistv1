//jshint esversion:6

// Required for setting up express and body parsers
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// Assigns express to an app constant and body parser to the app constant
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs'); //Sets the view engine to ejs
const items = ['item1', 'item2', 'item3'];
const workItems = [];

// Assigns port to listen to when fired up
app.listen(3000, function() {
  console.log("The server has been started on port 3000");
});

// What to send when a GET request is made on the port from a client
app.get("/", function(req, res) {
  day = date.getDate();
  res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about")
});
