const StockPick = require("../models/stockPick");
const User = require("../models/user");

const { errorHandler } = require("../helpers/dbErrorHandler");
const { sendSMS } = require("../apis/twilio");
const { sendStockPicks } = require("../apis/twilioMultiPack");

const formidable = require("formidable"); // another package monitor
const _ = require("lodash");
const fs = require("fs");

exports.stockById = (req, res, next, id) => {
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

exports.remove = (req, res) => {
  console.log(req.params.stockId);
  StockPick.deleteOne({ _id: req.params.stockId }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    console.log(result, "is deleted.");
    res.json(result);
  });
};

exports.create = (req, res) => {
  let numbers = [];
  //get subscriber numbers
  const query = User.find({ subscribes: "dailystock" }).select(
    "phoneNumber -_id"
  );

  query.exec((err, numbers) => {
    if (err || !numbers) {
      return res.status(400).json({
        error: "Users' Numbers not found.",
      });
    }
    // const { phoneNumber } = users;
    numbersInArray = numbers.map((num) => {
      console.log(num);
      return num["phoneNumber"];
    });
    console.log(numbersInArray);
  });

  let { name, description, ticker, buy, sell, date } = req.body;
  buy = parseInt(buy);
  sell = parseInt(sell);
  let stockPick = new StockPick({ name, description, ticker, buy, sell, date });

  stockPick.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    //send to phone subscription
    let msgEnglish = `\n Date: ${date} \n Company: ${ticker} \n Buy: ${buy} \n Sell ${sell}`;
    let msgMyanmar = `\n နေ့စွဲ- ${date} \n ရှယ်ယာသင်္ကေတ - ${ticker}  \n  ဝယ် -${buy} \n ရောင်: - ${sell} \n မှတ်ချက် - ${description}`;
    let message = msgMyanmar;

    sendStockPicks(message, numbersInArray); //call Twilio API
    res.json(result);
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
