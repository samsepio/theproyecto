const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = Schema({
	name:{type: String},
	last:{type: String},
	interest:{type: String},
	religion:{type: String},
	women:{type: String},
	movie:{type: String}
});

module.exports = mongoose.model('profiles',profileSchema);
