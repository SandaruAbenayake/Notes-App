const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags:{type:[String],default:[]},
  isPinned:{type:Boolean, default:false},
  userId:{type:String, ref: "user",required:true},
  createdOn: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("Note",notSchema);