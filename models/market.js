const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const marketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Market", marketSchema);
