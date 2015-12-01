var express = require('express');//查找路径？
var mongojs = require('mongojs');
var db=mongojs('contactapp',['contactapp']);//前边一个是数据库db，后边一个是collections
var bodyParser = require('body-parser');
var app = express();


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
	console.log("I received a Get request");

	db.contactapp.find(function(err,docs){
		if(err) console.log(err);
		console.log(docs);
		res.json(docs);	
	});

});

app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactapp.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactapp.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
});

app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactapp.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
})

app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactapp.findAndModify({query:{_id: mongojs.ObjectId(id)},
	update: {$set: {name: req.body.name,email:req.body.email,number:req.body.number}},
	new: true},function(err,doc){
		res.json(doc);
	});
})

app.listen(3000);

console.log("server running at port 3000");