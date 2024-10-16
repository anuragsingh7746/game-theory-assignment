const mongoose = require('mongoose');
const { Schema } = mongoose;

const sportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  default_duration_minutes: {
    type: Number,
    required: true
  }
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;