	var MongoClient = require('mongodb').MongoClient;
 	var express = require('express');
	var app = express();

	var ObjectID = require('mongodb').ObjectID;
	var format = require('util').format;
	app.use(express.static('./'));

	var coll = null;

	app.get('/addUser', function(req, res){
	  
		var data={
			idUsr    : req.query.idName,
			nameUsr  : req.query.userName,
			phoneUsr : req.query.phoneUsr
		};

		coll.insert(data,function(err,result){
			if (err)
				throw err;
			res.send(result);
		});

	});

	app.get('/getUser',function(req,res){

		coll.find().toArray(function(err,result){
			if (err) throw err;
				res.send(JSON.stringify(result));
		});

	});

	app.get('/editUser/:idUsr',function(req,res){

		var find={};
		var editData={};

		if (req.params.idUsr)
			find.idUsr =req.params.idUsr ;

		if (req.query.nameShw)
			editData.nameUsr = req.query.nameShw;

		if (req.query.phoneShw)	
			editData.phoneUsr = req.query.phoneShw;

		coll.update(find,{'$set':editData},function(err,result){
			if (err) throw err;
			res.send(result);	

		});

	});

	// Connect to the db
	MongoClient.connect("mongodb://root:1234@kahana.mongohq.com:10020/mongo_ken", function(err, db) {
	  if(err) {
	    throw err;
	  }
	  else {
	  	coll=db.collection('uiTest');
	  	console.log("We are connected");
	  	app.listen(3000);
	  }
	  	
	});


