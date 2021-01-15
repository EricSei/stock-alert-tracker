const Market = require("../models/market");

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.marketById = (req, res, next, id) => {
  Market.findById(id).exec((err, market) => {
    if (err || !market) {
      return res.status(400).json({
        error: "Market not found.",
      });
    }
    req.market = market;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.market);
};

exports.create = (req, res) => {
  const market = Market(req.body);
  market.save((err, data) => {
    if (err) {
      res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.update = (req, res) => {
  const market = Market(req.body);
  market.save((err, data) => {
    if (err) {
      res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.remove = (req, res) => {
  console.log(req.params.marketId, "is deleted.");
  Market.deleteOne({ _id: req.params.marketId }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    console.log(result, "is deleted.");
    res.json(result);
  });
};

exports.list = (req, res) => {
  Market.find({})
    .sort({ $natural: -1 })
    .limit(5)
    .exec((err, markets) => {
      if (err) {
        return res.status(400).json({
          error: "markets Not Found",
        });
      }
      res.send(markets);
    });
};
