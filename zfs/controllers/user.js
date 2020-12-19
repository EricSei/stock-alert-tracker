const User = require("../models/user");

exports.users = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "Users not found.",
      });
    }

    res.json(users);
  });
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { name, phoneNumber, password } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }
    if (phoneNumber) {
      if (phoneNumber.length <= 10) {
        return res.status(400).json({
          error: "Phone Number should be at least 10 characters long",
        });
      } else {
        user.phoneNumber = phoneNumber;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

//update user.subscribes['']

exports.createSubscribes = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { subscribe } = req.body;
  // console.log(user._id, subscribe)
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    switch (subscribe) {
      case "dailystock":
        user.subscribes.set(0, "dailystock");
        break;
      case "dailystock-monthly":
        user.subscribes.set(1, "dailystock-monthly");
        break;
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      console.log(updatedUser.subscribes);
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

exports.deleteSubscribe = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { unSubscribe } = req.body;
  console.log("unSubscribe", unSubscribe);
  // console.log(user._id, subscribe)
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    switch (unSubscribe) {
      case "dailystock":
        user.subscribes.set(0, "");
        break;
      case "dailystock-monthly":
        user.subscribes.set(1, "");
        break;
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      console.log(updatedUser.subscribes);
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

//get phoneNumber who subscribe to dailystock
exports.phoneNumbersOfDailyStockSubscribers = (req, res) => {
  const query = User.find({ subscribes: "dailystock" }).select(
    "phoneNumber -_id"
  );

  query.exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "Users not found.",
      });
    }
    console.log(users);
    // const { phoneNumber } = users;
    res.json(users);
  });
};
