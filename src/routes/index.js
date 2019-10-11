const express=require('express');
const router = express.Router();
const User=require('../model/database');
const Profile=require('../model/database2');
const Comentary=require('../model/database3');

router.get('/',(req,res,next)=>{
	res.render('index');
});
router.get('/profile',(req,res,next)=>{
	res.render('profile');
});
router.post('/comentary',async(req,res,next)=>{
	const comentary = new Comentary(req.body);
	await comentary.save();
	console.log(comentary)
	res.redirect('/perfil');
});
router.get('/perfil',async(req,res,next)=>{
	const profiles = await Profile.find();
	const comentarys = await Comentary.find();
	res.render('perfil',
		{profiles}
	);
});
router.post('/profile',async(req,res,next)=>{
	const profile = new Profile(req.body);
	await profile.save();
	console.log(profile);
	res.redirect('/perfil');
});
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',async(req,res,next)=>{
	const user = new User(req.body);
	await user.save();
	console.log(user);
	res.redirect('/profile');
});

module.exports = router;
