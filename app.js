var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db;

if(process.env.ENV == "Test")
    db = mongoose.connect("mongodb://localhost/bookAPI_test");
else
    db = mongoose.connect("mongodb://localhost/bookAPI");

var Book = require("./models/bookModel");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var port = process.env.PORT || 3000;

var bookRouter = require("./Routes/bookRoutes")(Book);

app.use("/api/books",bookRouter);
//app.use("/api/authors",authorRouter);

app.get("/", function(req,res){
    res.send("heldddddo lobas");
});

app.listen(port, function(){
    console.log("running on port = " + port);
});

module.exports = app;