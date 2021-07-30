const db = require("../models");
const User = db.user;

module.exports = (req, res, next) => {
  //Email exists
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        status:400,
        message: "Email already in use!",
      });
      return;
    } 

    next();
  });
};

