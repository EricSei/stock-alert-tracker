const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const articleSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Title", articleSchema);
