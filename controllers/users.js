const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BAD_REQUEST,
  DEFAULT_ERROR,
  NOT_FOUND,
  DUPLICATE,
  UNAUTHORIZED,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address",
        });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid ID passed.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then(({ newName, newAvatar, newEmail }) => {
      res.send({ newName, newAvatar, newEmail });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: err.message,
        });
      } else if (err.code === 11000) {
        console.error("Duplicate key error. Document already exists!");
        res.status(DUPLICATE).send({
          message: "Email already exists in our system.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        res.status(UNAUTHORIZED).send({
          message: "Incorrect email address or password.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

module.exports = { getUser, getUsers, createUser, login };
