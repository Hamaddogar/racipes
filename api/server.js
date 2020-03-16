var express = require('express');
var app     = express();
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
// var requestIp = require('request-ip');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var server  = require('http').createServer(app);
var port    = process.env.PORT || 4100;

if(typeof localStorage == "undefined" || localStorage === null){
	const LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}



mongoose.connect("mongodb+srv://Muhammad:Muhammad@cluster0-oset3.mongodb.net/test?retryWrites=true&w=majority/recipe");
var conn = mongoose.connection;
var mainSchema = mongoose.Schema({
	filename: String,
	destination: String,
	mimetype: String,
	position: Number
});

var recipeStepSchema = mongoose.Schema({
	filename: String,
	destination: String,
	mimetype: String,
	position: Number,
	main_video_id: String
});

var userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	user_type: String
});

var emailcaptureSchema = mongoose.Schema({
	email: String
})

var mainVideos = mongoose.model('mainvideos', mainSchema);
var stepVideos = mongoose.model('stepvideos', recipeStepSchema);
var users = mongoose.model('users', userSchema);
var emailCaptures = mongoose.model('emailCaptures', emailcaptureSchema);

conn.on("connected", function(){
	console.log("Connected Sucessfully!");
});

conn.on("disconnected", function(){
	console.log("Disconnected Sucessfully!");
});

conn.on("error", console.error.bind(console, "Error Detected!!!"));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//     next();
// });




app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
	destination: "../public/videos/recipe-main",
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
		  cb(null, file.filename+"-"+Date.now()+path.extname(file.originalname));
		});
	}
 });

var upload = multer({ dest: '../public/videos/recipe-main' });
var uploadstep = multer({ dest: '../public/videos/recipe-steps' });

app.post('/login', function(req, res) {
	console.log(req.body);

	var query = users.findOne({email: req.body.email, password: req.body.password}, function (err, doc) {
		if(doc != null){
			var obj = doc.toJSON();
			console.log(obj.user_type);
			if(obj.user_type == 'user'){
				const token = jwt.sign(JSON.stringify(doc), 'shhhhh');
				localStorage.setItem('usertoken', token);
				res.end(JSON.stringify({token: localStorage.getItem('usertoken'), info: obj}));
				res.end(JSON.stringify('hello'));
			}else{
				const token = jwt.sign(JSON.stringify(doc), 'shhhhh');
				localStorage.setItem('token', token);
				res.end(JSON.stringify({token: localStorage.getItem('token'), info: obj}));
			}
		}else{
			res.end(JSON.stringify({msg: 'incorrect email or password'}));
		}
		
	}); 
});

app.post('/guest', function(req, res, next) {
	console.log(req.body);
	const token = jwt.sign(JSON.stringify(req.body), 'shhhhh');
	//localStorage.setItem('token', token);
	res.end(JSON.stringify(token)); 
});

app.post('/recipestepupload',uploadstep.single('myImage'),function(req, res, next) {
	console.log(req.body);
	
	var pieces = req.file.mimetype.split("/");
	fs.rename(req.file.destination+'/'+req.file.filename, req.file.destination+'/'+req.file.filename+'.'+pieces[1], function(err) {
		if ( err ) console.log('ERROR: ' + err);
	});
	
	var record = new stepVideos({
		filename: req.file.filename, 
		destination: req.file.destination, 
		mimetype: req.file.mimetype, 
		position: req.body.position,
		main_video_id: req.body.mainvideoid
	});

	var query = stepVideos.findOne({position: req.body.position, main_video_id: req.body.mainvideoid}, function (err, doc) {
		if (err) throw err;
		if(doc != null){
			var bits = doc.mimetype.split("/");
			const path = doc.destination+'/'+doc.filename+'.'+bits[1];
			fs.unlink(path,function(err){
				if(err) throw err;
			});
			console.log('document found!');
			doc.filename = req.file.filename;
			doc.mimetype = req.file.mimetype;
			doc.save(function(err, docc){
				if(err) throw err;
				console.log(docc._id);
				res.end(JSON.stringify(docc._id));
			});
		}else{
			console.log('new record added');
			record.save(function(err, doci){
				if(err) throw err;
				console.log(doci);
				res.end(JSON.stringify(doci));
			})
		}
	});
});

app.post('/upload',upload.single('myImage'),async function(req, res, next) {
	console.log(req.body);
	console.log(req.file);
	//return;
	var pieces = req.file.mimetype.split("/");
	console.log(pieces);
	
	await fs.rename(req.file.destination+'/'+req.file.filename, req.file.destination+'/'+req.file.filename+'.'+pieces[1], function(err) {
		if ( err ) console.log('ERROR: ' + err);
	});
	var record = new mainVideos({
		filename: req.file.filename, 
		destination: req.file.destination, 
		mimetype: req.file.mimetype, 
		position: req.body.position
	});
	
	var query = mainVideos.findOne({position: req.body.position}, async function (err, doc) {
		if (err) throw err;
		console.log(doc);
		
		if(doc){
			var bits = doc.mimetype.split("/");
			const path = doc.destination+'/'+doc.filename+'.'+bits[1];
			fs.unlink(path,function(err){
				if(err) throw err;
			});
			console.log('document found!');
			doc.filename = req.file.filename;
			doc.mimetype = req.file.mimetype;
			doc.save(function(err, docc){
				if(err) throw err;
				console.log(docc._id);
				res.end(JSON.stringify(docc));
			});
		}else{
			console.log('new record added');
			record.save(function(err, doci){
				if(err) throw err;
				console.log(doci);
				res.end(JSON.stringify(doci));
			})
		}
	  });
	// var query = mainVideos.find({});

	// record.save(function(err, doc){
	// 	query.exec(function(err, doc){
	// 		if(err) throw err;
	// 		console.log(doc);
	// 		res.end(JSON.stringify(doc));
	// 	})
	// })




	//var record = new addMainVideo({filename: 'req.file.filename', destination: 'req.file.destination', mimetype: 'req.file.mimetype', position: 5});
	// conn.once('open', function(){
	// 	record.save(function(err,res){
	// 		if(err) throw err;
	// 		console.log(res);
	// 		conn.close();
	// 	})
	// })
});

app.get('/get_catalogue', function (req, res) {
	var query = mainVideos.find({}).sort({position: 1});
	query.exec(function(err, doc){
		if(err) throw err;
		res.end(JSON.stringify(doc));
	});
});

app.get('/get_main_single/:id', function (req, res) {
	var query = mainVideos.find({ _id: req.params.id }).sort({position: 1});
	query.exec(function(err, doc){
		if(err) throw err;
		res.end(JSON.stringify(doc));
	});
});

app.get('/get_mainvideos_greater_than_default', function(req, res) {
	var query = mainVideos.find({ position: { $gte: 13 } }).sort({position: 1});
	query.exec(function(err, doc){
		if(err) throw err;
		if (doc || Array.isArray(doc)){
			res.end(JSON.stringify(doc));
		}
	});
});

app.post('/remove_main_video', async function (req, res) {
	// console.log(req.body);
	// return;
	await mainVideos.findOne({ position: req.body.position }, function (err, doc) {
		if (doc || Array.isArray(doc)){
			var bits = doc.mimetype.split("/");
			const path = doc.destination+'/'+doc.filename+'.'+bits[1];
			console.log(path);
			fs.unlink(path,function(err){
				if(err) throw err;
			});
		}
	});
	//console.log(req.body);
	await mainVideos.findOneAndDelete({ position: req.body.position }, function(err,docs){
		if (!docs || !Array.isArray(docs) || docs.length === 0) 
		return console.log('no docs found');
		
		docs.forEach( item => {
			item.remove();
		});
	});

	var query = mainVideos.find({position: { $gte: 13 }}).sort({position: 1});
	query.exec(function(err, doc){
		if(err) throw err;
		//console.log(doc);
		doc.forEach(item => {
			//console.log(item);
		})
		res.end(JSON.stringify(doc));
	});
});

app.post('/removestep', async function (req, res) {
	// console.log(req.body);
	// return;
	await stepVideos.findOne({ position: req.body.position, main_video_id: req.body.mainvideoid }, function (err, doc) {
		if (doc || Array.isArray(doc)){
			var bits = doc.mimetype.split("/");
			const path = doc.destination+'/'+doc.filename+'.'+bits[1];
			console.log(path);
			fs.unlink(path,function(err){
				if(err) throw err;
			});
		}
	});
	//console.log(req.body);
	await stepVideos.findOneAndDelete({ position: req.body.position }, function(err,docs){
		if (!docs || !Array.isArray(docs) || docs.length === 0) 
		return console.log('no docs found');
		
		docs.forEach( item => {
			item.remove();
		});
	});

	var query = stepVideos.find({main_video_id: req.body.mainvideoid}).sort({position: 1});
	query.exec(function(err, doc){
		if(err) throw err;
		//console.log(doc);
		doc.forEach(item => {
			//console.log(item);
		})
		res.end(JSON.stringify(doc));
	});
});

app.get('/get_video_steps/:id', function (req, res){
	var mainvideoid = req.params.id;
	console.log(mainvideoid);
	var query = stepVideos.find({main_video_id: mainvideoid}).sort({position: 1});
	query.exec(function(err, docs){
		if(err) throw err;
		//console.log(doc);
		docs.forEach(item => {
			//console.log(item);
		})
		console.log(docs);
		res.end(JSON.stringify(docs));
	});
});

app.get('/get_catalogue_videos/:cid', function (req, res) {
	var catalogue_id = req.params.cid;
	rec = {
		    "steps":[
		        {
		            "id": 0,
		            "title": "How to cook biryani",
		            "path": "bday-cake.mp4"
		        },
		        {
		            "id": 1,
		            "title": "BBQ",
		            "path": "biryani.mp4"
		        },
		        {
		            "id": 2,
		            "title": "BBQ",
		            "path": "choco-cake.mp4"
		        },
		        {
		            "id": 3,
		            "title": "BBQ",
		            "path": "cookies.mp4"
		        },
		        {
		            "id": 4,
		            "title": "BBQ",
		            "path": "foodie.mp4"
		        },
		        {
		            "id": 5,
		            "title": "BBQ",
		            "path": "fries.mp4"
		        },
		        {
		            "id": 6,
		            "title": "BBQ",
		            "path": "ice-cream.mp4"
		        },
		        {
		            "id": 7,
		            "title": "BBQ",
		            "path": "macroni.mp4"
		        },
		        {
		            "id": 8,
		            "title": "BBQ",
		            "path": "noodles.mp4"
		        },
		        {
		            "id": 9,
		            "title": "BBQ",
		            "path": "rice.mp4"
		        },
		        {
		            "id": 10,
		            "title": "BBQ",
		            "path": "salad.mp4"
		        },
		        {
		            "id": 11,
		            "title": "BBQ",
		            "path": "wings.mp4"
		        },
		        {
		            "id": 12,
		            "title": "BBQ",
		            "path": "choco-cake.mp4"
		        },
		        {
		            "id": 13,
		            "title": "BBQ",
		            "path": "fries.mp4"
		        },
		        {
		            "id": 14,
		            "title": "BBQ",
		            "path": "cookies.mp4"
		        },
		    ]
		};
	//console.log(catalogue_id);
	res.end(JSON.stringify(rec));
});

app.post('/mainvideoadd', function (req, res) {
	//console.log(req);
	// return;
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
   		return res.status(200).send(req.file)
 	})
});

app.post('/signup', function (req, res) {
	console.log(req.body);
	var record = new users({
		username: req.body.username, 
		email: req.body.email, 
		password: req.body.password, 
		user_type: 'user'
	});
	record.save(function(err, doc){
		if(err) throw err;
		console.log(doc);
		res.end(JSON.stringify({username: doc.username, info: doc}));
	})
});

app.post('/emailcapture', function (req, res) {
	console.log(req.body);
	var record = new emailCaptures({ 
		email: req.body.email, 
	});
	record.save(function(err, doc){
		if(err) throw err;
		console.log(doc);
		res.end(JSON.stringify(doc));
	})
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});