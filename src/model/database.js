const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = Schema({

});

module.exports = mongoose.model('users'userSchema);
