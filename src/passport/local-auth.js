const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/database');

passport.serializeUser((user, done) => {
	done(null,user.id)
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
  	done(null, user);
});

passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
  	passReqToCallback: true
}, async (req, email, password, done) => {
  	const user = await User.findOne({'email': email})
  	if(user) {
    		return done(null, false, req.flash('signupMessage', 'El Email ya a sido tomado'));
  	} else {
    		const newUser = new User();
    		newUser.email = email;
    		newUser.password = newUser.encryptPassword(password);
    		await newUser.save();
    		done(null, newUser);
	}
}));
passport.use('local-signin',new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},async(req,email,password,done) => {
	const user = await User.findOne({'email': email});
	if(!user){
		return done(null,false,req.flash('signinMessage','Email Incorrecto'));
	}
	//si user.comparepassword no coincide con la contraseña mand¿ame un mensaje con el nombre signinMessage esta comparepassword lo habiamos echo en la base de datos y pcon password el pasamos la contraseña que tiene que comparar con lo que esta en la base de datos
	if(!user.comparePassword(password)) {
		return done(null,false,req.flash('signinMessage','la contraseña es incorrecta'));
	}
	return done(null,user)
}));

