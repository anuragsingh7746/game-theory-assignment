const mongoose = require('mongoose');
const { Schema } = mongoose;

const courtSchema = new Schema({
  center_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Center'  // Reference to the Center collection
  },
  sport_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Sport'  // Reference to the Sport collection
  },
  court_number: {
    type: Number,
    required: true
  }
});

const Court = mongoose.model('Court', courtSchema);

module.exports = Court;