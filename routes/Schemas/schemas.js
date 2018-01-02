const mongoose = require('mongoose')
const Schema = mongoose.Schema



const UserSchema = new Schema({
  username : {
    type : String,
    unique : true
  },
  password : String,
  token : {
    type : String,
    unique : true
  }
})



module.exports = {
  User : mongoose.model('User', UserSchema)
}
