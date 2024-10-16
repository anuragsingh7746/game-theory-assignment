const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username:{
    type:String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required: true
  },
  role: {
    type: String,
    enum: ['manager', 'user'],  // Restricting role to either 'manager' or 'user'
    required: true
  },
  center_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',  // Reference to the Center collection
    default: null  // center_id can be null for users who are not managers
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;