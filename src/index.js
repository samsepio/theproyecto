const express=require('express');
const path=require('path');
const multer=require('multer');
const uuid=require('uuid/v4');
const {format}=require('timeago.js');
const morgan=require('morgan');
const engine=require('ejs');
const mongoose=require('mongoose');
const app=express();
const Comentary = require('./model/database3');

mongoose.connect('mongodb+srv://walter:3219329910@database1-wegwd.mongodb.net/test?retryWrites=true&w=majority')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

app.set('puerto',process.env.PORT || 8000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads'),
	filename:(req,file,cb,filename) => {
		cb(null, uuid() + path.extname(file.originalname));
	}
});
app.use(multer({
	storage
}).single('image'));
/*
app.use(async(req,res,next) => {
	const comentarys = await Comentary.find();
	app.locals.comentarys = (comentarys);
	next();
*/
app.use(require('./routes'));

app.use(express.static(path.join(__dirname,'./public')));

const server = app.listen(app.get('puerto'),()=>{
	console.log(`servidor ejecutandose en el puerto ${app.get('puerto')}`);
});
