const express=require('express');
const path=require('path');
const morgan=require('morgan');
const engine=require('ejs');
const mongoose=require('mongoose');
const app=express();

mongoose.connect('mongodb+srv://walter:3219329910@database1-wegwd.mongodb.net/test?retryWrites=true&w=majority')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

app.set('puerto',proccess.env.PORT || 8000);
app.set('views','view engine');
app.set('views',path.join(__dirname,'./views'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(require('./routes'));

app.use(express.static(path.join(__dirname,'./public')));

const server = app.listen(app.get('puerto'),()=>{
	console.log(`servidor ejecutandose en el puerto ${app.get('puerto')}`);
});
