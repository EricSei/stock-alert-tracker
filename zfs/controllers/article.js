const StockPick = require("../models/stockPick");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { sendSMS } = require("../apis/twilio");
const formidable = require("formidable"); // another package monitor
const _ = require("lodash");
const fs = require("fs");

exports.articleById = (req, res, next, id) => {
  StockPick.findById(id).exec((err, stock) => {
    if (err || !stock) {
      return res.status(400).json({
        error: "Stock not found.",
      });
    }
    req.stock = stock;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    const { name, description, ticker, buy, sell, date, userId } = fields;

    //check all fields
    if (!name || !description || !ticker || !buy || !sell || !date || !userId) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    //send to phone subscription
    let message = `
    Date: ${date}
    Company: ${ticker}
    Buy: ${buy}
    Sell ${sell}`;

    let msg2 =
      "\n ရှယ်ယာသင်္ကေတ -UBER  \n  ဝယ် -31.26-30.30 \n ရောင်: -35. (သို့) ရေရှည်ထားနိုင်မလာ:?";

    sendSMS(message);

    let stockPick = new StockPick(fields);

    if (files.photo) {
      //console.log(files.photo);
      // 1KB = 1000, 1MB = 1000,000
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image size should be less than 1 mb in size.",
        });
      }

      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    stockPick.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.list = (req, res) => {
  StockPick.find({})
    .sort({ $natural: -1 })
    .limit(5)
    .exec((err, stocks) => {
      if (err) {
        return res.status(400).json({
          error: "StockPicks Not Found",
        });
      }
      res.send(stocks);
    });
};
