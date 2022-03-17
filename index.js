#!/usr/bin/node

let http = require("http");
let mongo_client = require("mongodb").MongoClient;

let url = "mongodb://localhost/";

let db;
let fs = require("fs");

console.log("Iniciando Script mongo_http");

mongo_client.connect(url, function(error,conn){
	console.log("Dentro de Mongo");
	if (error){
		console.log("Esto no furula TwT");
		return;
	}
	db = conn.db("tffhd");
});

http.createServer(function(req, res) {
	res.writeHead(200);
	let col = "";

	if (req.url == "/") {
		fs.readFile("index.html",function(err, data){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.end(data);
		});
		return;
	}
	

	if (req.url == "/characters") {
		col = "characters";
	}
	else if (req.url == "/items") {
		col = "items";
	}
	else { return; }

	let col_data = db.collection(col).find();
	
	col_data.toArray(function(err, data) {
		let string = JSON.stringify(data);
		
		res.end(string);
	});

}).listen(1909);
