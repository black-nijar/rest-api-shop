const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?\@(([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?)((\.)([a-zA-Z]+))$/
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema);