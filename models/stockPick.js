const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stockPickSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    ticker: {
      type: String,
    },
    buy: {
      type: String,
      default: 0,
    },
    sell: {
      type: String,
      default: 0,
    },
    created: {
      type: Date,
    },
    date: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockPick", stockPickSchema);
