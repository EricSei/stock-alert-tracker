const Article = require("../models/article");

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.articleById = (req, res, next, id) => {
  Article.findById(id).exec((err, article) => {
    if (err || !article) {
      return res.status(400).json({
        error: "Article not found.",
      });
    }
    req.article = article;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.article);
};

exports.create = (req, res) => {
  console.log(req.body);
  const article = Article(req.body);
  article.save((err, data) => {
    if (err) {
      res.status(400).json({
        // err: errorHandler(err),
        error: "error in article occured",
      });
    }
    res.json({ data });
  });
};

exports.update = (req, res) => {
  const article = Article(req.body);
  article.save((err, data) => {
    if (err) {
      res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.remove = (req, res) => {
  console.log(req.params.articleId, "is deleted.");
  Article.deleteOne({ _id: req.params.articleId }, (err, result) => {
    if (err) {
      return res.status(400).json({
        // error: errorHandler(err),
        error: errorHandler(err),
      });
    }
    console.log(result, "is deleted.");
    res.json(result);
  });
};

exports.list = (req, res) => {
  Article.find({})
    .sort({ $natural: -1 })
    .limit(5)
    .exec((err, articles) => {
      if (err) {
        return res.status(400).json({
          error: "Articles Not Found",
        });
      }
      res.send(articles);
    });
};
