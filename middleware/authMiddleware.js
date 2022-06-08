const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(403).send("Forbidden");
      } else {
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      console.log("I am running");
      if (err) {
        res.status(403).send("Forbidden");
      } else {
        let user = await User.findById(decodedToken.id);
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

// check if user is admin or not
const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.status(403).send("Forbidden");
      } else {
        console.log(decodedToken);
        if (decodedToken.isAdmin) {
          next();
        } else {
          res.status(403).send("Forbidden");
        }
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { requireAuth, checkUser, checkAdmin };
