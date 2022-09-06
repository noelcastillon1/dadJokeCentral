const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

//This file has a user schema which outlines what will be saved in the data base everytime a new user is created.
//called in controllers/auth.js line 82
//There is some extra stuff underneath the schema that relates to password hashing to make add an extra layer of security when saving passwords to the database but to be honest I do not know how it works 


const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  liked: []
})


 
 UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})



UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('User', UserSchema)
