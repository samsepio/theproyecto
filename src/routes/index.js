const express=require('express');
const router = express.Router();
const User=require('../model/database');
const passport=require('passport');
const Profile=require('../model/database2');
const Comentary=require('../model/database3');

router.get('/',(req,res,next)=>{
	res.render('index');
});
router.get('/profile',(req,res,next)=>{
	res.render('profile');
});
router.get('/comentary',async(req,res,next)=>{
	const comentarys = await Comentary.find();
	res.render('comentary',{
		comentarys
	});
});
router.get('/delete/:id',async(req,res,next)=>{
	let {id} = req.params;
	await Comentary.deleteOne({_id: id});
	res.redirect('/perfil');
});
router.get('/like/:id',async(req,res,next)=>{
	const comentarys = await Comentary.findById(req.params.id);
	comentarys.status = !comentarys.status;
	await comentarys.save();
	res.redirect('/perfil');
});
router.get('/dislike/:id',async(req,res,next)=>{
	const comentarys = await Comentary.findById(req.params.id);
	comentarys.status = !comentarys.status;
	await comentarys.save();
	res.redirect('/perfil');
});
router.get('/edit/:id',async(req,res,next)=>{
	const comentarys = await Comentary.findById(req.params.id);
	res.render('edit',{
		comentarys
	});
});
router.post('/edit/:id',async(req,res,next)=>{
	let {id} = req.params;
	await Comentary.update({_id: id},req.body);
	res.redirect('/perfil');
});
router.post('/comentary',async(req,res,next)=>{
	const comentary = new Comentary(req.body);
	await comentary.save();
	console.log(comentary)
	res.redirect('/comentary');
});
router.get('/perfil',async(req,res,next)=>{
	const profiles = await Profile.find();
	const comentarys = await Comentary.find();
	res.render('perfil',
		{profiles}
	);
});
router.get('/friends',(req,res,next)=>{
	res.render('friends');
});
router.get('/profiles',async(req,res,next)=>{
	const profiles = await Profile.find();
	res.render('profiles',{
		profiles
	});
});
router.post('/profile',async(req,res,next)=>{
	const profile = new Profile();
	profile.name = req.body.name;
	profile.last = req.body.last;
	profile.interest = req.body.interest;
	profile.religion = req.body.religion;
	profile.women = req.body.women;
	profile.movie = req.body.movie;
	profile.path = '/img/uploads/' + req.file.filename;
	profile.originalname = req.file.originalname;
	profile.size = req.file.size;
	await profile.save();
	console.log(profile);
	res.redirect('/perfil');
});
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',passport.authenticate('local-signup',{
	successRedirect: '/profile',
	failureRedirect: '/signup',
	passReqToCallback: true	
}));
router.get('/signin',(req,res,next)=>{
	res.render('signin');
});
router.post('/signin',passport.authenticate('local-signin',{
	successRedirect: '/perfil',
	failureRedirect: '/signin',
	passReqToCallback: true
}));

module.exports = router;
