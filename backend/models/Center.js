const mongoose = require('mongoose');
const { Schema } = mongoose;

const centerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  sports: [
    {
      sport_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
      },
      name: {
        type: String,
        required: true
      },
      courts: [
        {
          court_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true
          },
          court_number: {
            type: Number,
            required: false // Optional as court_number may not be provided
          }
        }
      ]
    }
  ]
});

const Center = mongoose.model('Center', centerSchema);

module.exports = Center;