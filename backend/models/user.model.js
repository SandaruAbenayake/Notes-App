const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  createdOn: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("User",usersSchema)