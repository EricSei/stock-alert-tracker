const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stocksubscriptionSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      default: 0
    },
    userId: {
      type: ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockPick", stocksubscriptionSchema);
