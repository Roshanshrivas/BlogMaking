const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/noteapp')

const userSchema = mongoose.Schema({

  title: String,
  Description: String,

})

module.exports = mongoose.model('user', userSchema);